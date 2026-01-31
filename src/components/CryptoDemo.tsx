"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaLock, FaUnlock, FaKey, FaShieldAlt } from "react-icons/fa";

interface CryptoStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: "pending" | "processing" | "complete";
}

export function CryptoDemo() {
  const [input, setInput] = useState("Secure message");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [steps, setSteps] = useState<CryptoStep[]>([
    { id: "1", label: "Generate Key", icon: <FaKey />, status: "pending" },
    { id: "2", label: "Encrypt Data", icon: <FaLock />, status: "pending" },
    { id: "3", label: "Secure Transmission", icon: <FaShieldAlt />, status: "pending" },
    { id: "4", label: "Decrypt Data", icon: <FaUnlock />, status: "pending" },
  ]);

  // Simple XOR cipher simulation (frontend only)
  const xorCipher = useCallback((text: string, key: string): string => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result); // Base64 encode for visual effect
  }, []);

  const xorDecipher = useCallback((encoded: string, key: string): string => {
    try {
      const text = atob(encoded); // Base64 decode
      let result = "";
      for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(
          text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      return result;
    } catch {
      return "Decryption failed";
    }
  }, []);

  const runEncryption = useCallback(async () => {
    setIsProcessing(true);
    setEncrypted("");
    setDecrypted("");

    const key = "CRYPTO_KEY_2024";

    // Step 1: Generate Key
    setSteps(prev => prev.map((step, i) => 
      i === 0 ? { ...step, status: "processing" } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 800));
    setSteps(prev => prev.map((step, i) => 
      i === 0 ? { ...step, status: "complete" } : step
    ));

    // Step 2: Encrypt
    setSteps(prev => prev.map((step, i) => 
      i === 1 ? { ...step, status: "processing" } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const encryptedData = xorCipher(input, key);
    setEncrypted(encryptedData);
    setSteps(prev => prev.map((step, i) => 
      i === 1 ? { ...step, status: "complete" } : step
    ));

    // Step 3: Transmission
    setSteps(prev => prev.map((step, i) => 
      i === 2 ? { ...step, status: "processing" } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 600));
    setSteps(prev => prev.map((step, i) => 
      i === 2 ? { ...step, status: "complete" } : step
    ));

    // Step 4: Decrypt
    setSteps(prev => prev.map((step, i) => 
      i === 3 ? { ...step, status: "processing" } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 800));
    const decryptedData = xorDecipher(encryptedData, key);
    setDecrypted(decryptedData);
    setSteps(prev => prev.map((step, i) => 
      i === 3 ? { ...step, status: "complete" } : step
    ));

    setIsProcessing(false);
  }, [input, xorCipher, xorDecipher]);

  const resetDemo = useCallback(() => {
    setInput("Secure message");
    setEncrypted("");
    setDecrypted("");
    setSteps(prev => prev.map(step => ({ ...step, status: "pending" })));
  }, []);

  return (
    <div className="glass-card-soft p-6 space-y-6">
      <h3 className="text-lg font-semibold text-cyan-200 mb-4">Interactive Crypto Demo</h3>
      
      {/* Input Section */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-[0.16em] text-slate-300">
          Input Message
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-slate-200 font-mono text-sm focus:outline-none focus:border-cyan-400/60 transition"
          placeholder="Enter message to encrypt..."
          disabled={isProcessing}
        />
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={`p-3 rounded-lg border text-center transition-all ${
              step.status === "complete"
                ? "border-emerald-400/50 bg-emerald-400/10"
                : step.status === "processing"
                ? "border-cyan-400/50 bg-cyan-400/10"
                : "border-slate-600/50 bg-slate-800/30"
            }`}
            animate={{
              scale: step.status === "processing" ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 0.6,
              repeat: step.status === "processing" ? Infinity : 0,
            }}
          >
            <div className="flex justify-center mb-2 text-lg">
              {step.icon}
            </div>
            <p className="text-xs font-mono text-slate-300">{step.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={runEncryption}
          disabled={isProcessing || !input.trim()}
          className="flex-1 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-200 font-mono text-sm hover:bg-cyan-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Encrypt & Decrypt"}
        </button>
        <button
          onClick={resetDemo}
          disabled={isProcessing}
          className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 font-mono text-sm hover:bg-slate-700/70 transition disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {/* Results */}
      {(encrypted || decrypted) && (
        <div className="space-y-3">
          {encrypted && (
            <div className="p-3 bg-slate-800/50 border border-purple-400/30 rounded-lg">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-purple-300 mb-1">
                Encrypted (Base64)
              </p>
              <p className="text-sm font-mono text-slate-200 break-all">{encrypted}</p>
            </div>
          )}
          
          {decrypted && (
            <div className="p-3 bg-slate-800/50 border border-emerald-400/30 rounded-lg">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-emerald-300 mb-1">
                Decrypted
              </p>
              <p className="text-sm font-mono text-slate-200">{decrypted}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
