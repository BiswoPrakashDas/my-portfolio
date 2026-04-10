import { randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const submissionsDirectory = path.join(process.cwd(), "data");
const submissionsFile = path.join(submissionsDirectory, "contact-submissions.jsonl");
const rateLimitStore = globalThis.__contactRateLimitStore ?? new Map();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

function normalizeText(value) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function normalizeMessage(value) {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";
}

function getClientAddress(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const attempts = (rateLimitStore.get(key) || []).filter((value) => value > windowStart);

  if (attempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, attempts);
    return true;
  }

  attempts.push(now);
  rateLimitStore.set(key, attempts);
  return false;
}

function validateSubmission({ name, email, subject, message }) {
  if (name.length < 2 || name.length > 80) {
    return "Please enter a valid name.";
  }

  if (!EMAIL_REGEX.test(email) || email.length > 120) {
    return "Please enter a valid email address.";
  }

  if (subject.length < 3 || subject.length > 120) {
    return "Please enter a subject between 3 and 120 characters.";
  }

  if (message.length < 20 || message.length > 2000) {
    return "Please enter a message between 20 and 2000 characters.";
  }

  return null;
}

async function persistSubmission(submission) {
  await mkdir(submissionsDirectory, { recursive: true });
  await appendFile(submissionsFile, `${JSON.stringify(submission)}\n`, "utf8");
}

async function forwardWithResend(submission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return { delivered: false, mode: "storage" };
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: submission.email,
      subject: `Portfolio contact: ${submission.subject}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Subject: ${submission.subject}`,
        "",
        submission.message,
        "",
        `Submitted at: ${submission.createdAt}`,
        `Source IP: ${submission.ip}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email forwarding failed: ${errorText}`);
  }

  return { delivered: true, mode: "email" };
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (normalizeText(payload.company)) {
    return NextResponse.json({ message: "Message received." }, { status: 200 });
  }

  const submission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: normalizeText(payload.name),
    email: normalizeText(payload.email).toLowerCase(),
    subject: normalizeText(payload.subject),
    message: normalizeMessage(payload.message),
    ip: getClientAddress(request),
    userAgent: request.headers.get("user-agent") || "unknown",
  };

  const validationError = validateSubmission(submission);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const rateLimitKey = `${submission.ip}:${submission.email}`;

  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { error: "Too many messages from this source. Please try again in a little while." },
      { status: 429 },
    );
  }

  try {
    await persistSubmission(submission);

    try {
      const delivery = await forwardWithResend(submission);

      if (delivery.delivered) {
        return NextResponse.json(
          { message: "Thanks — your message was sent successfully and forwarded to email." },
          { status: 200 },
        );
      }
    } catch (error) {
      console.error("Contact form email forwarding failed:", error);
    }

    return NextResponse.json(
      { message: "Thanks — your message was received successfully and stored." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "Something went wrong while saving your message. Please try again." },
      { status: 500 },
    );
  }
}
