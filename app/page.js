"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    index: "/01",
    year: "2025",
    title: "Face Recognition System",
    summary: "Developed a real-time face recognition system using a custom CNN model with live camera detection and labeled dataset training.",
    outcome: "Real-time vision pipeline",
    stack: ["Python", "CNN", "OpenCV", "Computer Vision"],
    notes: ["Custom CNN model", "Live camera detection", "Dataset-driven training"],
  },
  {
    index: "/02",
    year: "2025",
    title: "AI-Based Network Anomaly Detection System",
    summary: "Developed a machine learning model to detect anomalous patterns in network traffic for early identification of security threats.",
    outcome: "Threat pattern detection",
    stack: ["Python", "Machine Learning", "Cybersecurity", "Network Analysis"],
    notes: ["Anomaly detection", "Threat-focused workflow", "Network traffic analysis"],
  },
  {
    index: "/03",
    year: "2024",
    title: "Student Performance Analytics using Python",
    summary: "Performed exploratory data analysis using Pandas and visualization techniques to identify the key factors influencing student outcomes.",
    outcome: "Data-driven academic insight",
    stack: ["Python", "Pandas", "NumPy", "Data Visualization"],
    notes: ["EDA workflow", "Insight generation", "Student performance trends"],
  },
  {
    index: "/04",
    year: "2024",
    title: "Network Scanner and Port Analysis Tool",
    summary: "Built a Python-based tool to identify active devices and analyze open ports, demonstrating networking and cybersecurity fundamentals.",
    outcome: "Security reconnaissance workflow",
    stack: ["Python", "Networking", "Cybersecurity", "Security Tools"],
    notes: ["Active device scanning", "Open port analysis", "Networking fundamentals"],
  },
];

const skillGroups = [
  {
    title: "Languages",
    summary: "Core programming languages I use to build applications, automation, and problem-solving workflows.",
    accent: "teal",
    focus: "Programming foundation",
    items: ["Java", "Python", "JavaScript"],
  },
  {
    title: "Web Development",
    summary: "Tools and frameworks I use to build responsive, backend-connected web experiences.",
    accent: "amber",
    focus: "Full-stack execution",
    items: ["HTML", "CSS", "Django", "REST APIs"],
  },
  {
    title: "AI and ML",
    summary: "Machine learning foundations focused on models, vision pipelines, and practical AI systems.",
    accent: "violet",
    focus: "Model building and vision",
    items: ["Machine Learning", "Deep Learning (CNN)", "Computer Vision"],
  },
  {
    title: "Data Analytics",
    summary: "Data exploration and visualization workflow for extracting useful patterns and insights.",
    accent: "blue",
    focus: "Insight extraction",
    items: ["Pandas", "NumPy", "Data Visualization"],
  },
  {
    title: "Cybersecurity",
    summary: "Security-focused fundamentals around networking, analysis, and threat-oriented tooling.",
    accent: "rose",
    focus: "Network and threat analysis",
    items: ["Networking", "Security Tools", "Threat Analysis"],
  },
  {
    title: "Tools and Tech",
    summary: "Supporting platforms and environments I rely on while learning, building, and shipping work.",
    accent: "emerald",
    focus: "Workflow acceleration",
    items: ["GitHub", "Google Colab", "Spyder", "Cloud Computing", "IoT"],
  },
];

const contactLinks = [
  {
    label: "Email",
    href: "mailto:biswoprakashdas625@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/BiswoPrakashDas",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/biswo-prakash-das-778996235",
  },
];

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const premiumHover = {
  y: -8,
  transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
};

const serifFontStyle = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
};

const panelAccentMap = {
  teal: {
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.22),transparent_62%)]",
    line: "bg-teal-500/75",
    chip: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
  },
  amber: {
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_62%)]",
    line: "bg-amber-500/80",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  violet: {
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.22),transparent_62%)]",
    line: "bg-violet-500/80",
    chip: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  blue: {
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_62%)]",
    line: "bg-blue-500/80",
    chip: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
  rose: {
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.22),transparent_62%)]",
    line: "bg-rose-500/80",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  emerald: {
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_62%)]",
    line: "bg-emerald-500/80",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
};

const projectAccentCycle = ["teal", "violet", "amber", "blue"];

const projectHighlights = ["4 selected builds", "AI + data + security", "Hands-on academic work"];

const skillHighlights = ["6 capability groups", "Built from shipped work", "Learning depth with execution"];

const initialContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const renderContactIcon = (label) => {
  if (label === "Email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
        <path d="M3 6.75h18v10.5H3z" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    );
  }

  if (label === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.37-1.33-1.73-1.33-1.73-1.09-.73.08-.72.08-.72 1.2.09 1.83 1.22 1.83 1.22 1.08 1.8 2.82 1.28 3.5.98.11-.77.42-1.28.76-1.58-2.67-.3-5.48-1.31-5.48-5.85 0-1.29.47-2.34 1.22-3.16-.12-.3-.53-1.52.12-3.16 0 0 1-.31 3.3 1.2a11.7 11.7 0 0 1 6 0c2.3-1.51 3.3-1.2 3.3-1.2.65 1.64.24 2.86.12 3.16.76.82 1.22 1.87 1.22 3.16 0 4.55-2.82 5.54-5.5 5.84.43.37.81 1.08.81 2.2v3.27c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3c0-2.6-1.39-3.81-3.25-3.81-1.5 0-2.17.82-2.54 1.4v-1.2H9.5c.04.8 0 8.91 0 8.91h3.2v-4.98c0-.27.02-.54.1-.73.21-.54.7-1.1 1.52-1.1 1.08 0 1.5.82 1.5 2.02v4.8h3.18ZM6.1 8.28a1.86 1.86 0 1 0 0-3.72 1.86 1.86 0 0 0 0 3.72Zm1.6 10.22V9.6H4.5v8.9h3.2Z" />
    </svg>
  );
};

function PortfolioShell({ scrollToSection, theme, toggleTheme, contentReady = true, isPreview = false }) {
  const sectionId = (id) => (isPreview ? `preview-${id}` : id);
  const handleScroll = (id) => {
    if (!isPreview) {
      scrollToSection(id);
    }
  };
  const textReveal = {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [contactStatus, setContactStatus] = useState({ type: "idle", message: "" });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const formInputClasses =
    "w-full rounded-[1.25rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_76%,transparent)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/80 focus:border-[var(--foreground)] focus:bg-[color-mix(in_srgb,var(--surface-strong)_82%,transparent)]";

  const handleContactInputChange = (event) => {
    const { name, value } = event.target;

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (contactStatus.type !== "idle") {
      setContactStatus({ type: "idle", message: "" });
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (isPreview || isSubmittingContact) {
      return;
    }

    setIsSubmittingContact(true);
    setContactStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      setContactForm(initialContactForm);
      setContactStatus({
        type: "success",
        message: result.message || "Your message has been sent successfully.",
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send your message right now.",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,_var(--hero-glow),_transparent_62%)] opacity-90"></div>

      <nav className="fixed inset-x-0 top-4 z-50 px-3 md:px-6">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-[var(--border-strong)]/30 bg-transparent px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm md:px-6">
          <button
            type="button"
            onClick={() => handleScroll("top")}
            className="shrink-0 text-sm font-semibold tracking-[0.22em] transition hover:opacity-70"
          >
            BISWO
          </button>

          <div className="flex items-center gap-2 md:gap-3">
            <button type="button" onClick={() => handleScroll("about")} className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition duration-300 hover:border-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--surface)_68%,transparent)] hover:-translate-y-0.5 md:px-4 md:py-2 md:text-xs md:tracking-[0.18em]">
              About
            </button>
            <button type="button" onClick={() => handleScroll("work")} className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition duration-300 hover:border-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--surface)_68%,transparent)] hover:-translate-y-0.5 md:px-4 md:py-2 md:text-xs md:tracking-[0.18em]">
              Work
            </button>
            <button type="button" onClick={() => handleScroll("skills")} className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition duration-300 hover:border-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--surface)_68%,transparent)] hover:-translate-y-0.5 md:px-4 md:py-2 md:text-xs md:tracking-[0.18em]">
              Skills
            </button>
            <button type="button" onClick={() => handleScroll("contact")} className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition duration-300 hover:border-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--surface)_68%,transparent)] hover:-translate-y-0.5 md:px-4 md:py-2 md:text-xs md:tracking-[0.18em]">
              Contact
            </button>
            <button
              type="button"
              onClick={isPreview ? undefined : toggleTheme}
              suppressHydrationWarning
              className="relative inline-flex h-8 w-[4.5rem] shrink-0 items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-1 shadow-[0_6px_18px_rgba(0,0,0,0.06)] transition hover:border-[var(--foreground)] hover:bg-[var(--surface-strong)]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className="flex w-full items-center justify-between px-2 text-xs leading-none text-[var(--muted)]">
                <span aria-hidden="true">☀️</span>
                <span aria-hidden="true">🌙</span>
              </span>
              <span
                aria-hidden="true"
                className={`absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--foreground)] text-xs text-[var(--background)] shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition-all duration-300 ${
                  theme === "dark" ? "left-1" : "left-[calc(100%-1.75rem)]"
                }`}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <section id={sectionId("top")} className="mx-auto max-w-6xl border-b border-[var(--border)] px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <motion.div
            initial={false}
            animate={contentReady ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 26 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={false}
              animate={contentReady ? "visible" : "hidden"}
              variants={textReveal}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
              className="mb-6 text-xs uppercase tracking-[0.34em] text-[var(--muted)]"
            >
              B.Tech CSE Student • ML and Web Developer
            </motion.p>
            <motion.h1
              initial={false}
              animate={contentReady ? "visible" : "hidden"}
              variants={textReveal}
              transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-7xl lg:text-[5.7rem]"
              style={serifFontStyle}
            >
              Building intelligent products with clean interfaces and practical impact.
            </motion.h1>
            <motion.div
              initial={false}
              animate={contentReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 1.05, delay: 0.38, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 h-px w-28 origin-left bg-[var(--foreground)]"
            />
            <motion.p
              initial={false}
              animate={contentReady ? "visible" : "hidden"}
              variants={textReveal}
              transition={{ duration: 0.72, delay: 0.34, ease: "easeOut" }}
              className="mt-8 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg"
            >
              I&apos;m Biswo Prakash Das, a B.Tech Computer Science and Engineering student with exposure to AI, web
              development, and cybersecurity. I&apos;m looking for internship opportunities where I can solve real
              problems, explore emerging technologies, and build impactful solutions.
            </motion.p>

            <motion.div
              initial={false}
              animate={contentReady ? "visible" : "hidden"}
              variants={textReveal}
              transition={{ duration: 0.72, delay: 0.48, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => handleScroll("work")}
                className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition hover:translate-y-[-1px] hover:opacity-92"
              >
                View Projects
              </button>
              <button
                type="button"
                onClick={() => handleScroll("contact")}
                className="rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-medium transition hover:border-[var(--foreground)] hover:bg-[var(--surface)]"
              >
                Let&apos;s Connect
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            id={sectionId("about")}
            initial={false}
            animate={contentReady ? "visible" : "hidden"}
            variants={textReveal}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="group relative overflow-hidden rounded-[2rem] border border-[var(--border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_88%,transparent),color-mix(in_srgb,var(--background)_78%,transparent))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.14)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.2)] md:p-7">
              <div className="pointer-events-none absolute inset-x-10 top-8 h-24 rounded-full bg-[color-mix(in_srgb,var(--hero-glow)_50%,transparent)] blur-3xl" />
              <div className="relative flex justify-center border-b border-[var(--border)] pb-6">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--border)]/60" />
                <div className="relative h-[18.5rem] w-[18.5rem] rounded-full border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.18)] md:h-[21rem] md:w-[21rem]">
                  <div className="absolute inset-5 rounded-full border border-[var(--border)] opacity-70" />
                  <div className="absolute inset-8 rounded-full bg-[color-mix(in_srgb,var(--hero-glow)_24%,transparent)] blur-2xl" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[var(--surface-soft)]">
                    <Image
                      src="/profile.png"
                      alt="Portrait of Biswo Prakash Das"
                      fill
                      className="object-cover object-[center_12%] transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 28vw"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 border-b border-[var(--border)] pb-5">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={item.label}
                    title={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--muted)] transition hover:-translate-y-1 hover:border-[var(--foreground)] hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
                  >
                    {renderContactIcon(item.label)}
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">About Me</p>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    Adaptive and fast-learning B.Tech CSE student with hands-on work across machine learning, Django-based
                    web development, data analytics, and cybersecurity-focused projects.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
                  <div className="flex flex-wrap gap-2">
                    {["B.Tech CSE", "Internships", "AI/ML", "Cybersecurity"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-48 -translate-x-1/2 translate-y-3 rounded-[1.25rem] border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--background)_94%,transparent)] p-2 opacity-0 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 peer-hover:translate-y-0 peer-hover:opacity-100 peer-focus-visible:translate-y-0 peer-focus-visible:opacity-100">
                      <div className="mb-2 flex items-center justify-between px-2">
                        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--muted)]">Resume Preview</p>
                        <span className="rounded-full border border-[var(--border)] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                          PDF
                        </span>
                      </div>
                      <div className="overflow-hidden rounded-[0.9rem] border border-[var(--border)] bg-white">
                        <iframe
                          src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH"
                          title="Resume preview"
                          className="h-60 w-full scale-[1.01]"
                        />
                      </div>
                    </div>

                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="peer inline-flex items-center gap-3 rounded-full border border-[var(--foreground)] bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] px-5 py-3 text-sm font-medium shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    >
                      <span>My Resume</span>
                      <span className="text-base leading-none">↗</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                <span>Bhubaneswar, Odisha</span>
                <span>B.Tech 2023–2027</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id={sectionId("work")} className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <motion.div
          {...sectionReveal}
          className="mb-12 grid gap-8 border-b border-[var(--border)] pb-8 lg:grid-cols-[0.64fr_0.36fr] lg:items-end"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--muted)]">Projects</p>
            <h2
              className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl"
              style={serifFontStyle}
            >
              Technical builds shaped by machine learning, data work, and security thinking.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              A compact set of projects that reflect how I approach problem solving: practical implementation, clean
              execution, and a strong focus on useful outcomes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {projectHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => {
            const accent = panelAccentMap[projectAccentCycle[index % projectAccentCycle.length]];

            return (
              <motion.article
                key={project.title}
                {...sectionReveal}
                whileHover={premiumHover}
                transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
                className="group/project relative overflow-hidden rounded-[2.2rem] border border-[var(--border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_90%,transparent),color-mix(in_srgb,var(--background)_76%,transparent))] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.08)] transition-[border-color,box-shadow] duration-500 hover:border-[var(--foreground)]/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.13)] md:p-8"
              >
                <div className={`pointer-events-none absolute inset-0 opacity-80 ${accent.glow}`} />
                <div className="pointer-events-none absolute inset-x-20 top-0 h-28 rounded-full bg-[color-mix(in_srgb,var(--surface-strong)_68%,transparent)] blur-3xl" />
                <div className="pointer-events-none absolute inset-y-0 -left-20 w-40 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition duration-700 group-hover/project:left-[105%] group-hover/project:opacity-100" />

                <div className="relative grid gap-8 md:grid-cols-[0.18fr_0.82fr]">
                  <div className="flex flex-col justify-between gap-6 rounded-[1.6rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-soft)_68%,transparent)] p-5 transition duration-500 group-hover/project:bg-[color-mix(in_srgb,var(--surface)_84%,transparent)]">
                    <div>
                      <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Edition</p>
                      <div className="space-y-3 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                        <span className="block">{project.index}</span>
                        <span className="block">{project.year}</span>
                      </div>
                    </div>
                    <div className="h-px w-full bg-[var(--border)]" />
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Project Weight</p>
                      <p className="text-lg font-medium tracking-[-0.03em] text-[var(--foreground)]">High-impact build</p>
                    </div>
                    <div className="space-y-2 border-t border-[var(--border)] pt-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Stack Size</p>
                      <p className="text-2xl font-semibold tracking-[-0.04em]">{project.stack.length}</p>
                    </div>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
                    <div className="rounded-[1.9rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-soft)_64%,transparent)] p-6 transition duration-500 group-hover/project:bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] md:p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${accent.chip}`}
                        >
                          Featured Build
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                          Applied Problem Solving
                        </span>
                        <div className="ml-auto text-right">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">Core Outcome</p>
                          <p className="mt-1 text-xs tracking-[0.06em] text-[var(--foreground)]">{project.outcome}</p>
                        </div>
                      </div>

                      <h3
                        className="mt-5 max-w-2xl text-[2rem] font-semibold leading-[1] tracking-[-0.05em] md:text-[2.5rem]"
                        style={serifFontStyle}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-[var(--muted)]">{project.summary}</p>

                      <div className="mt-7 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                          {project.notes.length} design and build priorities
                        </p>
                        <div className={`h-px w-20 rounded-full ${accent.line}`} />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[1.9rem] border border-[var(--border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_84%,transparent),color-mix(in_srgb,var(--background)_72%,transparent))] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.09)] transition duration-500 group-hover/project:shadow-[0_28px_70px_rgba(0,0,0,0.12)]">
                      <div className={`pointer-events-none absolute inset-0 opacity-90 ${accent.glow}`} />
                      <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[color-mix(in_srgb,var(--surface-strong)_60%,transparent)] blur-3xl" />

                      <div className="relative flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
                        <span className="block">{project.index}</span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Project Notes</p>
                          <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--muted)]">
                            Focus areas that shaped how the build was approached and delivered.
                          </p>
                        </div>
                        <span
                          className={`inline-flex shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${accent.chip}`}
                        >
                          {project.notes.length} focus points
                        </span>
                      </div>

                      <div className="relative mt-5 space-y-3">
                        {project.notes.map((note, noteIndex) => (
                          <div
                            key={note}
                            className="group/note relative overflow-hidden rounded-[1.35rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-soft)_74%,transparent)] px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:bg-[color-mix(in_srgb,var(--surface-strong)_72%,transparent)]"
                          >
                            <div className={`absolute inset-y-0 left-0 w-1 ${accent.line}`} />
                            <div className="pointer-events-none absolute inset-y-0 -left-10 w-16 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition duration-500 group-hover/note:left-[105%] group-hover/note:opacity-100" />
                            <div className="flex items-start gap-3 pl-3">
                              <span className={`mt-0.5 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.22em] ${accent.chip}`}>
                                0{noteIndex + 1}
                              </span>
                              <p className="text-sm leading-7 text-[var(--foreground)] transition duration-300 group-hover/note:translate-x-0.5">
                                {note}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id={sectionId("skills")} className="mx-auto max-w-6xl border-t border-[var(--border)] px-6 py-20 md:px-8 md:py-28">
        <motion.div
          {...sectionReveal}
          className="mb-12 grid gap-8 border-b border-[var(--border)] pb-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--muted)]">Skills</p>
            <h2
              className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl"
              style={serifFontStyle}
            >
              A working toolkit across software, analytics, intelligence, and implementation.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              My skill set is organized around real delivery work, so each category reflects tools I have used in
              projects rather than a generic list of technologies.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {skillHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              {...sectionReveal}
              whileHover={premiumHover}
              transition={{ ...sectionReveal.transition, delay: index * 0.04 }}
              className="group/skill relative overflow-hidden rounded-[2rem] border border-[var(--border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_88%,transparent),color-mix(in_srgb,var(--background)_74%,transparent))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] transition-[border-color,box-shadow] duration-500 hover:border-[var(--foreground)]/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.13)] md:min-h-[20rem]"
            >
              <div className={`pointer-events-none absolute inset-0 opacity-95 ${panelAccentMap[group.accent].glow}`} />
              <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-[color-mix(in_srgb,var(--surface-strong)_66%,transparent)] blur-3xl transition duration-500 group-hover:scale-125" />
              <div className="pointer-events-none absolute inset-y-0 -left-20 w-40 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition duration-700 group-hover/skill:left-[110%] group-hover/skill:opacity-100" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${panelAccentMap[group.accent].line}`} />
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{group.title}</p>
                  </div>
                  <h3
                    className="max-w-xs text-[1.65rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--foreground)]"
                    style={serifFontStyle}
                  >
                    {group.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--muted)]">{group.summary}</p>
                </div>

                <span
                  className={`rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${panelAccentMap[group.accent].chip}`}
                >
                  {group.items.length} tools
                </span>
              </div>

              <div className="relative mt-6 h-px w-full overflow-hidden rounded-full bg-[var(--border)]">
                <div className={`h-full w-24 rounded-full ${panelAccentMap[group.accent].line}`} />
              </div>

              <div className="relative mt-6 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.15em] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] ${panelAccentMap[group.accent].chip}`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="relative mt-6 border-t border-[var(--border)] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Application</p>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">Current Focus</p>
                    <p className="mt-1 text-[11px] tracking-[0.06em] text-[var(--foreground)]">{group.focus}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Used across portfolio projects, coursework, and hands-on experimentation to build depth through
                  practical implementation.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id={sectionId("contact")} className="mx-auto max-w-6xl border-t border-[var(--border)] px-6 pb-12 pt-20 md:px-8 md:pb-16 md:pt-24">
        <motion.div {...sectionReveal} className="grid gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--muted)]">Contact</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl" style={serifFontStyle}>
              Interested in building something useful, intelligent, and well designed.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
              If you&apos;re working on a project, internship, or collaboration that sits around machine learning,
              computer vision, or product interfaces, I&apos;d be glad to talk.
            </p>

            <div className="mt-8 rounded-[2rem] border border-[var(--border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_88%,transparent),color-mix(in_srgb,var(--background)_78%,transparent))] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
              <div className="flex flex-wrap items-center gap-3">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={item.label}
                    title={item.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] transition hover:-translate-y-1 hover:border-[var(--foreground)] hover:bg-[var(--surface)]"
                  >
                    {renderContactIcon(item.label)}
                  </a>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-soft)_76%,transparent)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Response Time</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">Usually within 24 to 48 hours.</p>
                </div>
                <div className="rounded-[1.35rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-soft)_76%,transparent)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Best For</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                    Internship opportunities, collaborations, and technical discussions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-[var(--border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--background)_78%,transparent))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.12)] md:p-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_color-mix(in_srgb,var(--hero-glow)_55%,transparent),_transparent_58%)] opacity-90" />
            <div className="pointer-events-none absolute inset-x-12 top-0 h-24 rounded-full bg-[color-mix(in_srgb,var(--surface-strong)_66%,transparent)] blur-3xl" />

            <div className="relative flex items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Send A Message</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                  The form is backed by a real API route with validation, rate limiting, and message storage.
                </p>
              </div>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Secure
              </span>
            </div>

            <form onSubmit={handleContactSubmit} className="relative mt-6 space-y-5">
              <input
                type="text"
                name="company"
                value={contactForm.company}
                onChange={handleContactInputChange}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactInputChange}
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Your name"
                    className={formInputClasses}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    required
                    maxLength={120}
                    autoComplete="email"
                    placeholder="your@email.com"
                    className={formInputClasses}
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactInputChange}
                  required
                  minLength={3}
                  maxLength={120}
                  placeholder="What would you like to discuss?"
                  className={formInputClasses}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">Message</span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  required
                  minLength={20}
                  maxLength={2000}
                  rows={6}
                  placeholder="Tell me a little about the opportunity, project, or collaboration."
                  className={`${formInputClasses} min-h-40 resize-y`}
                />
              </label>

              <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-h-6 text-sm">
                  {contactStatus.type !== "idle" ? (
                    <p
                      className={contactStatus.type === "success" ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}
                    >
                      {contactStatus.message}
                    </p>
                  ) : (
                    <p className="text-[var(--muted)]">Your message is validated on the server before it is stored.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-1 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingContact ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs uppercase tracking-[0.2em] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <span>Biswo Prakash Das</span>
          <span>Bhubaneswar, Odisha</span>
          <span>AI, Web Development, Cybersecurity</span>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return localStorage.getItem("theme") ?? "dark";
  });
  const [showIntro, setShowIntro] = useState(true);

  const applyTheme = (nextTheme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 2300);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <motion.div
        initial={false}
        animate={showIntro ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, pointerEvents: "auto" },
          hidden: { opacity: 0, pointerEvents: "none", transitionEnd: { display: "none" } },
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] overflow-hidden bg-[var(--background)]"
      >
        <motion.div
          initial={false}
          animate={
            showIntro
              ? { scale: 1, opacity: 1 }
              : { scale: 1.18, opacity: 0, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }
          }
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_var(--hero-glow),_transparent_42%),linear-gradient(180deg,color-mix(in_srgb,var(--background)_84%,black_16%),var(--background))]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            showIntro
              ? { opacity: [0, 0.14, 0.05, 0] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.15, times: [0, 0.18, 0.48, 1], ease: "easeOut" }}
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0))]"
        />
        <motion.div
          initial={false}
          animate={showIntro ? { y: 0 } : { y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 h-1/2 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_94%,black_6%)]"
        />
        <motion.div
          initial={false}
          animate={showIntro ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[color-mix(in_srgb,var(--background)_96%,black_4%)]"
        />

        <div className="relative flex h-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={showIntro ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div
              className="flex items-center justify-center gap-1 overflow-hidden text-center text-5xl font-semibold tracking-[0.18em] md:text-7xl"
              style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif' }}
            >
              {["B", "I", "S", "W", "O"].map((letter, index) => (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, y: 48 }}
                  animate={showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: -48 }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 text-lg italic tracking-[0.12em] text-[var(--foreground)]/80 md:text-2xl"
              style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif' }}
            >
              Prakash Das
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="mt-4 text-xs uppercase tracking-[0.42em] text-[var(--muted)]"
            >
              Machine Learning • Product Interfaces • Cybersecurity
            </motion.p>
            <motion.div
              initial={{ scaleX: 0, opacity: 0.4 }}
              animate={showIntro ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0, originX: 1 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="mx-auto mt-6 h-px w-40 origin-left bg-[var(--foreground)]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)]/60"
            />
          </motion.div>
        </div>
      </motion.div>

      <PortfolioShell
        scrollToSection={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
        contentReady={!showIntro}
      />
    </main>
  );
}
