"use client";

type Particle = {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
};

// Deterministic pseudo-random layout so React Compiler is happy
const PARTICLES: Particle[] = Array.from({ length: 55 }).map((_, i) => {
  const left = `${(i * 17) % 100}%`;
  const top = `${(i * 29) % 100}%`;
  const delay = `${(i * 0.37) % 9}s`;
  const duration = `${10 + ((i * 1.13) % 7)}s`;
  return { id: i, left, top, delay, duration };
});

export function ParticleField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

