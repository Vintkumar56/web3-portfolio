"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useCallback } from "react";

const sectionVariant = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, []);

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 pb-24 pt-28 md:pt-32">
      {/* HERO */}
      <section className="section-padding flex flex-col gap-10 md:flex-row md:items-center">
        <div className="flex-1 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs font-mono uppercase tracking-[0.16em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]" />
            Secure. Fast. Experimental. Crypto Native.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <h1
              className="glitch-once neon-heading text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl"
              data-text="AI & Secure Systems Developer"
            >
              AI &amp; Secure Systems Developer
            </h1>
            <p className="neon-sub max-w-xl text-balance text-sm text-slate-300/90 md:text-base">
              Building encrypted, scalable and high performance backend systems.
              From AES-256 pipelines to zero-downtime APIs, I design systems that
              feel instant but stay uncompromisingly secure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="flex flex-wrap gap-3 pt-1"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="btn-neon neon-border-soft flex items-center gap-2 rounded-full bg-cyan-400/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-400/20"
            >
              <span>View Projects</span>
              <HiArrowNarrowRight className="text-sm" />
            </button>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-neon flex items-center gap-2 rounded-full border border-slate-500/70 bg-slate-900/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:border-cyan-300/80 hover:bg-slate-900/90"
            >
              <FaGithub className="text-sm" />
              <span>GitHub</span>
            </a>

            <a
              href="/resume.pdf"
              className="btn-neon flex items-center gap-2 rounded-full border border-purple-500/70 bg-purple-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-purple-100 transition hover:border-purple-400 hover:bg-purple-500/20"
            >
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Profile visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-4 flex flex-1 items-center justify-center md:mt-0"
        >
          <motion.div
            animate={{
              y: [0, -14, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="profile-glow relative h-52 w-52 overflow-hidden rounded-[2.5rem] border border-cyan-300/60 bg-gradient-to-br from-purple-600/30 via-slate-900 to-cyan-500/40 shadow-[0_0_40px_rgba(129,140,248,0.9)] sm:h-64 sm:w-64"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(244,244,245,0.9),transparent_55%),radial-gradient(circle_at_80%_120%,rgba(34,211,238,0.9),transparent_55%)] mix-blend-screen opacity-80" />
            <div className="relative z-10 flex h-full flex-col justify-between p-4 text-xs text-slate-100/90">
              <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-200/80">
                <span className="rounded-full border border-slate-100/30 bg-slate-900/50 px-2 py-1">
                  Node · Go · Rust
                </span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[9px] text-emerald-200">
                  AES-256 · RSA
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-300/80">Active Session</p>
                <p className="font-mono text-[11px] text-cyan-200">
                  &gt; encrypt --pipeline prod --latency &lt; 40ms
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        variants={sectionVariant}
        initial="hiddenLeft"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding space-y-7"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
              Flagship System
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300/85">
              <span className="font-semibold text-cyan-200">Cryptography Encoder</span>{" "}
              — a layered encryption service combining AES-256 streaming with RSA key
              exchange to ship secure, low-latency APIs.
            </p>
          </div>
          <div className="mt-3 flex gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-300/80">
            <span className="tag-pill px-3 py-1">Crypto Native</span>
            <span className="tag-pill px-3 py-1">Zero Trust</span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* Cryptography Encoder card */}
          <motion.article
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="glass-card group relative overflow-hidden p-5 md:p-6"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition group-hover:opacity-100">
              <div className="absolute -inset-40 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,0.0),rgba(34,211,238,0.5),rgba(168,85,247,0.6),rgba(34,211,238,0.0))]" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-50 md:text-lg">
                  Cryptography Encoder
                </h3>
                <span className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-emerald-100">
                  AES-256 · RSA
                </span>
              </div>

              <p className="text-xs text-slate-300/90 md:text-sm">
                Streaming encryption gateway that wraps client payloads in AES-256,
                handles RSA key exchange, and returns verifiably secure responses
                under 60ms p95.
              </p>

              {/* Architecture flow */}
              <div className="mt-1 rounded-xl border border-cyan-400/40 bg-slate-900/60 p-3 text-[11px] text-cyan-100/90 shadow-[0_0_25px_rgba(34,211,238,0.55)]">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/90">
                  Architecture Flow
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    "Client",
                    "AES-256 Layer",
                    "RSA Key Exchange",
                    "API Node",
                    "Secure Response",
                  ].map((step, i, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-cyan-300/40 bg-slate-950/70 px-2 py-1 text-[10px]">
                        {step}
                      </span>
                      {i < arr.length - 1 && (
                        <HiArrowNarrowRight className="text-xs text-cyan-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack + actions */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {[
                    "Node.js",
                    "TypeScript",
                    "AES-256 GCM",
                    "RSA-2048",
                    "Redis",
                    "PostgreSQL",
                  ].map((tag) => (
                    <span key={tag} className="tag-pill px-3 py-1 text-cyan-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 text-[11px]">
                  <a
                    href="#"
                    className="btn-neon neon-border flex items-center gap-1 rounded-full bg-cyan-500/15 px-3.5 py-1.5 font-semibold uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-500/25"
                  >
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/"
                    className="btn-neon flex items-center gap-1 rounded-full border border-slate-500/70 bg-slate-950/60 px-3.5 py-1.5 font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:border-cyan-300/80 hover:bg-slate-950/90"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Other projects */}
          <motion.div
            variants={fadeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            {[
              {
                title: "Expense Tracker",
                description:
                  "Streaming ledger with anomaly alerts, envelope budgeting, and exportable audit trails.",
                stack: ["Next.js", "Prisma", "PostgreSQL"],
              },
              {
                title: "Text → Handwriting Converter",
                description:
                  "Vector-based handwriting engine that renders text into consistent, human-looking strokes.",
                stack: ["Node.js", "Canvas", "tRPC"],
              },
              {
                title: "Community Quester",
                description:
                  "Gamified quest engine for dev communities with on-chain-style progress and rewards.",
                stack: ["Next.js", "Supabase", "Framer Motion"],
              },
            ].map((project, idx) => (
              <motion.article
                key={project.title}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 * idx,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="glass-card-soft group relative overflow-hidden p-4"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/15" />
                </div>
                <div className="relative z-10 space-y-2">
                  <h3 className="text-sm font-semibold text-slate-50">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300/90">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-slate-600/80 bg-slate-900/80 px-2 py-1 text-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* SYSTEM ARCHITECTURE */}
      <motion.section
        id="architecture"
        variants={sectionVariant}
        initial="hiddenRight"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding space-y-6"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
            System Architecture
          </h2>
          <p className="max-w-md text-xs text-slate-300/85 md:text-sm">
            Every request passes through a hardened pipeline — validated, encrypted,
            and key-exchanged before a single byte leaves the server.
          </p>
        </div>

        <motion.div className="glass-card-soft relative overflow-hidden p-4 md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_90%_120%,rgba(244,63,94,0.2),transparent_55%)] opacity-70" />
          <motion.div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-100">
            {[
              "User Input",
              "Validation",
              "Encryption Layer",
              "Key Exchange",
              "Secure Output",
            ].map((step, index, arr) => (
              <motion.div
                key={step}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.06 * index, duration: 0.5 }}
              >
                <div className="neon-border-soft flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
                  <span>{step}</span>
                </div>
                {index < arr.length - 1 && (
                  <motion.div
                    className="h-px w-7 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_14px_rgba(129,140,248,0.9)]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        variants={sectionVariant}
        initial="hiddenLeft"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding space-y-4"
      >
        <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
          Skills
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            "Node.js APIs",
            "Go Microservices",
            "Distributed Systems",
            "AES / RSA / TLS",
            "PostgreSQL Performance",
            "Redis Caching",
            "Kafka / Queues",
            "Observability",
            "Zero Downtime Deploys",
          ].map((skill) => (
            <motion.span
              key={skill}
              whileHover={{
                scale: 1.08,
                boxShadow:
                  "0 0 0 1px rgba(56,189,248,0.6),0 0 25px rgba(34,211,238,0.9)",
              }}
              className="tag-pill px-3.5 py-1.5 text-[11px] font-medium text-cyan-100"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* HACKATHON */}
      <motion.section
        id="hackathons"
        variants={sectionVariant}
        initial="hiddenRight"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
            Hackathons
          </h2>
          <span className="rounded-full border border-purple-400/60 bg-purple-500/20 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-purple-100">
            High Energy Builds
          </span>
        </div>

        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-1">
          <div className="flex min-w-max gap-4">
            {[
              {
                name: "On-Chain Analytics Dash",
                desc: "Real-time wallet risk scoring with streaming traces and anomaly spikes.",
              },
              {
                name: "Secure Chat Infra",
                desc: "E2E encrypted chat backend with rotating keys and offline delivery.",
              },
              {
                name: "Latency Wars",
                desc: "API gateway that races multiple providers and returns the fastest secure response.",
              },
            ].map((hack, idx) => (
              <motion.article
                key={hack.name}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="glass-card-soft min-w-[240px] max-w-xs flex-1 border border-purple-400/50 px-4 py-4"
              >
                <h3 className="mb-1 text-sm font-semibold text-slate-50">
                  {hack.name}
                </h3>
                <p className="text-[11px] text-slate-300/90">{hack.desc}</p>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
                  Track #{idx + 1}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CERTIFICATIONS */}
      <motion.section
        id="certifications"
        variants={sectionVariant}
        initial="hiddenLeft"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding space-y-4"
      >
        <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
          Certifications
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Cloud Architect",
              org: "Major Cloud Provider",
            },
            {
              title: "Security Engineering",
              org: "Industry Certification",
            },
            {
              title: "Distributed Systems",
              org: "Advanced Track",
            },
          ].map((cert) => (
            <motion.article
              key={cert.title}
              whileHover={{ scale: 1.04 }}
              className="glass-card-soft flex flex-col justify-between rounded-2xl border border-cyan-300/45 p-4 text-xs text-slate-200 shadow-[0_0_24px_rgba(34,211,238,0.55)]"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300">
                  Certified
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-50">
                  {cert.title}
                </h3>
              </div>
              <p className="mt-4 text-[11px] text-slate-400">{cert.org}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="section-padding mt-4 flex flex-col gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] text-slate-400">
          Designed to feel like a live terminal into my brain — secure, high
          throughput, and always experimenting.
        </p>
        <div className="flex gap-4 text-lg">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 transition hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.9)]"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 transition hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.9)]"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="text-slate-300 transition hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.9)]"
          >
            <FaEnvelope />
          </a>
        </div>
      </footer>
    </main>
  );
}

