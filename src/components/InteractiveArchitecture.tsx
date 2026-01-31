"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface ArchitectureNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "input" | "process" | "output";
  active: boolean;
}

export function InteractiveArchitecture() {
  const [nodes, setNodes] = useState<ArchitectureNode[]>([
    { id: "1", label: "User Input", x: 10, y: 50, type: "input", active: false },
    { id: "2", label: "Validation", x: 25, y: 50, type: "process", active: false },
    { id: "3", label: "Encryption Layer", x: 40, y: 50, type: "process", active: false },
    { id: "4", label: "Key Exchange", x: 55, y: 50, type: "process", active: false },
    { id: "5", label: "API Node", x: 70, y: 50, type: "process", active: false },
    { id: "6", label: "Secure Output", x: 85, y: 50, type: "output", active: false },
  ]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [dataFlow, setDataFlow] = useState<string>("");

  const runSimulation = useCallback(async () => {
    setIsAnimating(true);
    setDataFlow("");

    // Animate through each node
    for (let i = 0; i < nodes.length; i++) {
      setNodes(prev => prev.map((node, index) => 
        index === i ? { ...node, active: true } : node
      ));
      
      setDataFlow(`Processing: ${nodes[i].label}`);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNodes(prev => prev.map((node, index) => 
        index === i ? { ...node, active: false } : node
      ));
    }

    setDataFlow("Pipeline Complete ✓");
    setIsAnimating(false);
  }, [nodes]);

  const resetSimulation = useCallback(() => {
    setNodes(prev => prev.map(node => ({ ...node, active: false })));
    setDataFlow("");
  }, []);

  const handleNodeClick = useCallback((nodeId: string) => {
    if (isAnimating) return;
    
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, active: !node.active } : node
    ));
  }, [isAnimating]);

  return (
    <div className="glass-card-soft p-6 space-y-6">
      <h3 className="text-lg font-semibold text-cyan-200 mb-4">Interactive Architecture Flow</h3>
      
      {/* Architecture Diagram */}
      <div className="relative h-32 bg-slate-900/50 rounded-lg border border-cyan-400/30 overflow-hidden">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.map((node, index) => {
            if (index === nodes.length - 1) return null;
            const nextNode = nodes[index + 1];
            return (
              <motion.line
                key={`line-${node.id}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nextNode.x}%`}
                y2={`${nextNode.y}%`}
                stroke="rgba(34, 211, 238, 0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
                animate={{
                  strokeDashoffset: node.active ? [10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: node.active ? Infinity : 0,
                }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.button
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-lg border text-xs font-mono transition-all ${
              node.active
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-cyan-400/50"
            }`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            onClick={() => handleNodeClick(node.id)}
            disabled={isAnimating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: node.active ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.6,
              repeat: node.active ? Infinity : 0,
            }}
          >
            {node.label}
          </motion.button>
        ))}
      </div>

      {/* Data Flow Status */}
      <div className="p-3 bg-slate-800/50 border border-slate-600/50 rounded-lg">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400 mb-1">
          Data Flow Status
        </p>
        <p className="text-sm font-mono text-cyan-200">
          {dataFlow || "Ready to simulate"}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        <button
          onClick={runSimulation}
          disabled={isAnimating}
          className="flex-1 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-200 font-mono text-sm hover:bg-cyan-500/30 transition disabled:opacity-50"
        >
          {isAnimating ? "Simulating..." : "Run Pipeline"}
        </button>
        <button
          onClick={resetSimulation}
          disabled={isAnimating}
          className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 font-mono text-sm hover:bg-slate-700/70 transition disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border border-slate-600 bg-slate-800/50" />
          <span className="text-slate-400">Inactive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border border-cyan-400 bg-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <span className="text-slate-400">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">Click nodes to toggle</span>
        </div>
      </div>
    </div>
  );
}
