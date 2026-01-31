"use client";

import { motion } from "framer-motion";
import { FaTerminal } from "react-icons/fa";
import { useHackerMode } from "@/contexts/HackerModeContext";

export function HackerModeToggle() {
  const { hackerMode, toggleHackerMode } = useHackerMode();

  return (
    <motion.button
      onClick={toggleHackerMode}
      className="fixed top-6 right-6 z-40 flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/80 px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-sm transition hover:bg-cyan-400/10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <FaTerminal className="text-sm" />
      <span>{hackerMode ? "HACKER MODE: ON" : "HACKER MODE: OFF"}</span>
      <div className={`h-2 w-2 rounded-full ${hackerMode ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" : "bg-slate-400"} animate-pulse`} />
    </motion.button>
  );
}
