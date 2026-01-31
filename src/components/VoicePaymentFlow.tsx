"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const flowSteps: FlowStep[] = [
  {
    id: "voice",
    title: "Voice Input",
    description: "Converts speech to text via speech recognition API with real-time audio processing",
    icon: "🎤"
  },
  {
    id: "processing",
    title: "Processing",
    description: "Validates and formats payment request with NLP intent extraction",
    icon: "⚙️"
  },
  {
    id: "gateway",
    title: "Payment Gateway",
    description: "Sends secure encrypted request to payment API with fraud detection",
    icon: "💳"
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Returns transaction status with voice feedback and receipt generation",
    icon: "✅"
  }
];

// Reusable FlowStep component
function FlowStep({ 
  step, 
  isHovered, 
  onHover, 
  index 
}: { 
  step: FlowStep; 
  isHovered: boolean; 
  onHover: (hovered: boolean) => void; 
  index: number;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
    >
      {/* Node */}
      <motion.div
        className={`
          glass-card-soft p-4 rounded-xl border transition-all duration-300 cursor-pointer
          ${isHovered 
            ? 'border-cyan-400/60 shadow-[0_0_30px_rgba(34,211,238,0.8)] scale-105' 
            : 'border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl">{step.icon}</div>
          <h3 className="text-sm font-semibold text-cyan-200 text-center">
            {step.title}
          </h3>
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-64 p-3 mt-2 glass-card rounded-lg border border-cyan-400/40"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <p className="text-xs text-cyan-200 font-semibold mb-1">
              {step.title}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Animated Arrow component
function AnimatedArrow({ 
  isActive, 
  delay 
}: { 
  isActive: boolean; 
  delay: number;
}) {
  return (
    <div className="relative flex items-center justify-center">
      <svg 
        width="60" 
        height="20" 
        viewBox="0 0 60 20" 
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Arrow line */}
        <motion.line
          x1="5" y1="10" x2="45" y2="10"
          stroke="url(#arrowGradient)"
          strokeWidth="2"
          opacity={isActive ? 1 : 0.3}
          filter="url(#glow)"
        />
        
        {/* Arrow head */}
        <motion.polygon
          points="45,5 55,10 45,15"
          fill="url(#arrowGradient)"
          opacity={isActive ? 1 : 0.3}
          filter="url(#glow)"
        />
        
        {/* Animated dot */}
        <motion.circle
          cx="5" cy="10" r="3"
          fill="#22d3ee"
          filter="url(#glow)"
          animate={{
            cx: [5, 45],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />
        
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export function VoicePaymentFlow() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeArrow, setActiveArrow] = useState(0);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  useEffect(() => {
    setMounted(true);
    
    // Cycle through arrows
    const interval = setInterval(() => {
      setActiveArrow((prev) => (prev + 1) % flowSteps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="text-cyan-400 text-sm">Loading payment flow...</div>
      </div>
    );
  }

  if (isMobile) {
    // Mobile: Vertical layout
    return (
      <div className="relative w-full space-y-4">
        {flowSteps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <FlowStep
              step={step}
              isHovered={hoveredStep === step.id}
              onHover={(hovered) => setHoveredStep(hovered ? step.id : null)}
              index={index}
            />
            
            {index < flowSteps.length - 1 && (
              <div className="my-2">
                <AnimatedArrow isActive={activeArrow === index} delay={index * 0.3} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Desktop: Horizontal layout
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between gap-4">
        {flowSteps.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            <FlowStep
              step={step}
              isHovered={hoveredStep === step.id}
              onHover={(hovered) => setHoveredStep(hovered ? step.id : null)}
              index={index}
            />
          </div>
        ))}
      </div>
      
      {/* Arrows overlay */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between pointer-events-none">
        {flowSteps.map((_, index) => (
          index < flowSteps.length - 1 && (
            <div 
              key={`arrow-${index}`} 
              className="absolute"
              style={{
                left: `${(index + 0.5) * (100 / flowSteps.length)}%`,
                transform: 'translateX(-50%)'
              }}
            >
              <AnimatedArrow isActive={activeArrow === index} delay={index * 0.3} />
            </div>
          )
        ))}
      </div>
    </div>
  );
}
