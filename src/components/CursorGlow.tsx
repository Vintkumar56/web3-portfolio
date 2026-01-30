"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const smoothX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - 130);
      y.set(event.clientY - 130);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      className="cursor-glow"
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    />
  );
}

