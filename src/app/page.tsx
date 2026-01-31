"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaDownload } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useCallback, useState, lazy, Suspense } from "react";
import Image from "next/image";
import { use3DTilt } from "@/hooks/use3DTilt";
import { useHackerMode } from "@/contexts/HackerModeContext";
import { SkillNetwork } from "@/components/SkillNetwork";
import { VoicePaymentFlow } from "@/components/VoicePaymentFlow";

// Lazy load heavy components
const CryptoDemo = lazy(() => import("@/components/CryptoDemo").then(mod => ({ default: mod.CryptoDemo })));
const InteractiveArchitecture = lazy(() => import("@/components/InteractiveArchitecture").then(mod => ({ default: mod.InteractiveArchitecture })));

const sectionVariant = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  },
};

const slowSectionVariant = {
  hiddenLeft: { opacity: 0, x: -60 },
  hiddenRight: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const
    }
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
  const [showResumeModal, setShowResumeModal] = useState(false);
  const { hackerMode } = useHackerMode();
  
  // TiltCard component for 3D tilt effect
  const TiltCard = ({ children }: { children: React.ReactNode }) => {
    const tiltProps = use3DTilt();
    return (
      <div {...tiltProps}>
        {children}
      </div>
    );
  };
  
  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, []);

  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  const handlePreviewResume = () => {
    setShowResumeModal(true);
  };

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 pb-24 pt-28 md:pt-32">
      {/* HERO */}
      <section className="section-padding relative flex flex-col gap-10 md:flex-row md:items-center">
        {/* Radial gradient glow behind hero */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-radial-gradient from-cyan-400/20 via-purple-500/10 to-transparent blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-radial-gradient from-purple-400/15 to-transparent blur-2xl" />
        </div>
        <div className="flex-1 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs font-mono uppercase tracking-[0.16em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]" />
            Secure. Fast. Experimental. Crypto Native.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
              From AES-256 pipelines to zero-downtime APIs, I design systems
              that feel instant but stay uncompromisingly secure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
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
              onClick={(e) => {
                e.preventDefault();
                handleDownloadResume();
              }}
              className="btn-neon flex items-center gap-2 rounded-full border border-purple-500/70 bg-purple-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-purple-100 transition hover:border-purple-400 hover:bg-purple-500/20"
            >
              <FaDownload className="text-sm" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={handlePreviewResume}
              className="btn-neon flex items-center gap-2 rounded-full border border-cyan-500/70 bg-cyan-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-400 hover:bg-cyan-500/20"
            >
              <span>Preview Resume</span>
            </button>
          </motion.div>
        </div>

        {/* Profile Picture */}
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
            className="relative h-52 w-52 sm:h-64 sm:w-64"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 shadow-[0_0_40px_rgba(129,140,248,0.9)] animate-pulse">
              <div className="relative h-full w-full rounded-full bg-slate-900 p-1">
                <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-cyan-300/60 shadow-[0_0_30px_rgba(34,211,238,0.7)]">
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 208px, 256px"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* Glowing effect */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />
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
        className="section-padding relative space-y-7"
      >
        {/* Radial gradient glow behind projects */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-radial-gradient from-purple-400/15 via-cyan-500/10 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-radial-gradient from-cyan-400/12 to-transparent blur-2xl" />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
              Flagship System
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300/85">
              <span className="font-semibold text-cyan-200">
                Cryptography Encoder
              </span>{" "}
              — a layered encryption service combining AES-256 streaming with
              RSA key exchange to ship secure, low-latency APIs.
            </p>
          </div>
          <div className="mt-3 flex gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-300/80">
            <span className="tag-pill px-3 py-1">Crypto Native</span>
            <span className="tag-pill px-3 py-1">Zero Trust</span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* Cryptography Encoder card with interactive demo */}
          <motion.article
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="glass-card group relative overflow-hidden p-5 md:p-6"
          >
            <TiltCard>
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

                {/* Interactive Crypto Demo */}
                {hackerMode && (
                  <Suspense fallback={
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-600/50 text-center">
                      <p className="text-xs text-slate-400">Loading crypto demo...</p>
                    </div>
                  }>
                    <CryptoDemo />
                  </Suspense>
                )}

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
            </TiltCard>
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
        variants={slowSectionVariant}
        initial="hiddenRight"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding relative space-y-6"
      >
        {/* Radial gradient glow behind architecture */}
        <div className="absolute inset-0 -z-10 opacity-15">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[400px] bg-radial-gradient from-emerald-400/12 via-cyan-500/8 to-transparent blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-radial-gradient from-blue-400/10 to-transparent blur-2xl" />
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
            System Architecture
          </h2>
          <p className="max-w-md text-xs text-slate-300/85 md:text-sm">
            {hackerMode 
              ? "Interactive pipeline simulation - click nodes to explore the flow"
              : "Every request passes through a hardened pipeline — validated, encrypted, and key-exchanged before a single byte leaves the server."
            }
          </p>
        </div>

        {hackerMode ? (
          <Suspense fallback={
            <div className="p-8 bg-slate-800/30 rounded-lg border border-slate-600/50 text-center">
              <p className="text-sm text-slate-400">Loading interactive architecture...</p>
            </div>
          }>
            <InteractiveArchitecture />
          </Suspense>
        ) : (
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
        )}
      </motion.section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        variants={slowSectionVariant}
        initial="hiddenLeft"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding relative space-y-4"
      >
        {/* Radial gradient glow behind skills */}
        <div className="absolute inset-0 -z-10 opacity-12">
          <div className="absolute top-1/3 right-1/3 w-[600px] h-[300px] bg-radial-gradient from-purple-400/10 via-pink-500/8 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-radial-gradient from-cyan-400/8 to-transparent blur-2xl" />
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="neon-heading text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
            Skills Network
          </h2>
          <p className="max-w-md text-xs text-slate-300/85 md:text-sm">
            Interactive visualization of my technical stack and how these technologies connect in real-world applications.
          </p>
        </div>

        <SkillNetwork />
      </motion.section>

      {/* HACKATHON */}
      <motion.section
        id="hackathons"
        variants={slowSectionVariant}
        initial="hiddenRight"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding relative space-y-4"
      >
        {/* Radial gradient glow behind hackathons */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-1/4 left-1/2 w-[500px] h-[350px] bg-radial-gradient from-pink-400/10 via-purple-500/8 to-transparent blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[300px] bg-radial-gradient from-emerald-400/8 to-transparent blur-2xl" />
        </div>
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
                name: "Voice Payment Prototype",
                desc: "Voice-activated payment system with real-time speech processing and secure transaction handling.",
                hasFlow: true,
              },
              {
                name: "On-Chain Analytics Dash",
                desc: "Real-time wallet risk scoring with streaming traces and anomaly spikes.",
                hasFlow: false,
              },
              {
                name: "Secure Chat Infra",
                desc: "E2E encrypted chat backend with rotating keys and offline delivery.",
                hasFlow: false,
              },
              {
                name: "Latency Wars",
                desc: "API gateway that races multiple providers and returns the fastest secure response.",
                hasFlow: false,
              },
            ].map((hack, idx) => (
              <motion.article
                key={hack.name}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className={`glass-card-soft min-w-[240px] max-w-xs flex-1 border border-purple-400/50 px-4 py-4 ${
                  hack.hasFlow ? 'md:min-w-[400px] md:max-w-md' : ''
                }`}
              >
                <h3 className="mb-1 text-sm font-semibold text-slate-50">
                  {hack.name}
                </h3>
                <p className="text-[11px] text-slate-300/90 mb-3">{hack.desc}</p>
                
                {/* Voice Payment Flow Visualization */}
                {hack.hasFlow && (
                  <div className="mt-4 space-y-3">
                    <div className="text-xs font-mono uppercase tracking-[0.16em] text-purple-300">
                      System Flow
                    </div>
                    <VoicePaymentFlow />
                  </div>
                )}
                
                <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
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
        variants={slowSectionVariant}
        initial="hiddenLeft"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="section-padding relative space-y-4"
      >
        {/* Radial gradient glow behind certifications */}
        <div className="absolute inset-0 -z-10 opacity-8">
          <div className="absolute top-1/2 left-1/4 w-[450px] h-[350px] bg-radial-gradient from-blue-400/8 via-cyan-500/6 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-radial-gradient from-purple-400/6 to-transparent blur-2xl" />
        </div>
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

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowResumeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl border border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.6)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
              <h3 className="text-lg font-semibold text-cyan-200">Resume Preview</h3>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-2 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-slate-700/50 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Resume Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="bg-white rounded-lg p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <FaDownload className="text-6xl text-slate-400 mx-auto" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-700 mb-2">Resume PDF</h4>
                  <p className="text-slate-600 mb-6">Click the button below to download the full resume</p>
                  <button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <FaDownload />
                    Download Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between p-4 border-t border-slate-700/50 bg-slate-800/50">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleDownloadResume}
                className="btn-neon flex items-center gap-2 rounded-full border border-purple-500/70 bg-purple-500/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-purple-100 transition hover:border-purple-400 hover:bg-purple-500/20"
              >
                <FaDownload className="text-sm" />
                <span>Download Resume</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
