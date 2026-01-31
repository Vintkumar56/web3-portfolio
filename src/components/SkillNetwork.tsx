"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";

interface Skill {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  category: "language" | "framework" | "database" | "tool";
}

interface Connection {
  from: string;
  to: string;
  strength: number; // 0.3 to 1
}

const skills: Skill[] = [
  {
    id: "python",
    name: "Python",
    description: "Building ML models and data processing pipelines",
    x: 20,
    y: 30,
    category: "language"
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Full-stack web development and real-time applications",
    x: 80,
    y: 30,
    category: "language"
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "Scalable backend APIs and microservices architecture",
    x: 50,
    y: 20,
    category: "framework"
  },
  {
    id: "express",
    name: "Express",
    description: "RESTful API development and middleware design",
    x: 35,
    y: 50,
    category: "framework"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "NoSQL database design and aggregation pipelines",
    x: 65,
    y: 50,
    category: "database"
  },
  {
    id: "mysql",
    name: "MySQL",
    description: "Relational database design and query optimization",
    x: 20,
    y: 70,
    category: "database"
  },
  {
    id: "restapis",
    name: "REST APIs",
    description: "Designing scalable API architectures and documentation",
    x: 80,
    y: 70,
    category: "framework"
  },
  {
    id: "git",
    name: "Git",
    description: "Version control and collaborative development workflows",
    x: 50,
    y: 85,
    category: "tool"
  }
];

const connections: Connection[] = [
  { from: "nodejs", to: "express", strength: 0.9 },
  { from: "express", to: "restapis", strength: 0.8 },
  { from: "mongodb", to: "nodejs", strength: 0.7 },
  { from: "mysql", to: "nodejs", strength: 0.6 },
  { from: "javascript", to: "nodejs", strength: 0.9 },
  { from: "python", to: "nodejs", strength: 0.5 },
  { from: "git", to: "nodejs", strength: 0.4 },
  { from: "git", to: "express", strength: 0.3 },
  { from: "git", to: "restapis", strength: 0.3 },
  { from: "restapis", to: "mongodb", strength: 0.6 },
  { from: "restapis", to: "mysql", strength: 0.5 }
];

export function SkillNetwork() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  useEffect(() => {
    setMounted(true);
  }, []);

  const connectedSkills = useMemo(() => {
    if (!hoveredSkill) return new Set<string>();
    
    const connected = new Set<string>([hoveredSkill]);
    connections.forEach(conn => {
      if (conn.from === hoveredSkill) connected.add(conn.to);
      if (conn.to === hoveredSkill) connected.add(conn.from);
    });
    
    return connected;
  }, [hoveredSkill]);

  const getNodeOpacity = (skillId: string) => {
    if (!hoveredSkill) return 1;
    return connectedSkills.has(skillId) ? 1 : 0.3;
  };

  const getConnectionOpacity = (conn: Connection) => {
    if (!hoveredSkill) return conn.strength;
    return (conn.from === hoveredSkill || conn.to === hoveredSkill) ? 1 : 0.1;
  };

  const getCategoryColor = (category: Skill["category"]) => {
    switch (category) {
      case "language": return "from-cyan-400 to-blue-500";
      case "framework": return "from-purple-400 to-pink-500";
      case "database": return "from-emerald-400 to-green-500";
      case "tool": return "from-orange-400 to-red-500";
      default: return "from-gray-400 to-gray-500";
    }
  };

  if (!mounted) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-cyan-400 text-sm">Loading skill network...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-slate-900/30 rounded-2xl border border-cyan-400/30 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/20 to-cyan-900/30" />
      
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {connections.map((conn, index) => {
          const fromSkill = skills.find(s => s.id === conn.from);
          const toSkill = skills.find(s => s.id === conn.to);
          if (!fromSkill || !toSkill) return null;

          const opacity = getConnectionOpacity(conn);
          const isHighlighted = hoveredSkill && (conn.from === hoveredSkill || conn.to === hoveredSkill);

          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={fromSkill.x}
              y1={fromSkill.y}
              x2={toSkill.x}
              y2={toSkill.y}
              stroke="url(#lineGradient)"
              strokeWidth={isHighlighted ? "0.8" : "0.5"}
              opacity={opacity}
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          );
        })}
        
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Skill nodes */}
      {skills.map((skill, index) => {
        const isHovered = hoveredSkill === skill.id;
        const isConnected = connectedSkills.has(skill.id);
        
        return (
          <motion.div
            key={skill.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${skill.x}%`,
              top: `${skill.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: getNodeOpacity(skill.id),
              y: isHovered ? -2 : 0
            }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              y: { duration: 0.2 }
            }}
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setHoveredSkill(skill.id)}
            onHoverEnd={() => setHoveredSkill(null)}
          >
            {/* Node */}
            <div className={`
              relative w-16 h-16 md:w-20 md:h-20 rounded-full 
              bg-gradient-to-br ${getCategoryColor(skill.category)}
              border-2 border-white/20
              shadow-lg flex items-center justify-center
              ${isHovered ? 'shadow-[0_0_30px_rgba(168,85,247,0.8)]' : 'shadow-[0_0_15px_rgba(34,211,238,0.4)]'}
              transition-all duration-300
            `}>
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
              <span className="text-white text-xs md:text-sm font-bold text-center px-1">
                {skill.name}
              </span>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-48 p-3 mt-2 glass-card-soft rounded-lg border border-cyan-400/40"
                  style={{
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <p className="text-xs text-cyan-200 font-semibold mb-1">
                    {skill.name}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Legend for mobile */}
      {isMobile && (
        <div className="absolute bottom-4 left-4 right-4 p-3 glass-card-soft rounded-lg border border-cyan-400/30">
          <p className="text-xs text-cyan-200 font-semibold mb-2">Categories</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
              <span className="text-slate-300">Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-500" />
              <span className="text-slate-300">Frameworks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-green-500" />
              <span className="text-slate-300">Databases</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
              <span className="text-slate-300">Tools</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
