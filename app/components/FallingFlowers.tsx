"use client";
import { motion } from "framer-motion";

const FLOWERS = Array.from({ length: 9 }, (_, i) => {
  const left = Math.round((i * 137.5) % 100);
  const size = 12 + (i % 3) * 4;
  const duration = 10 + (i % 5) * 2.5;
  const delay = (i * 1.7) % duration;
  const sway = 18 + (i % 3) * 12;
  const spin = (i % 2 === 0 ? 1 : -1) * (180 + (i % 4) * 90);
  return { id: i, left, size, duration, delay, sway, spin };
});

function Jasmine({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <g>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="16"
            cy="9"
            rx="5"
            ry="8"
            fill="#fffdf8"
            stroke="#e8ddc8"
            strokeWidth="0.5"
            transform={`rotate(${angle} 16 16)`}
            opacity="0.92"
          />
        ))}
        <circle cx="16" cy="16" r="3" fill="#c9a876" />
      </g>
    </svg>
  );
}

export default function FallingFlowers() {
  return (
    <div
      className="fixed inset-0 mx-auto overflow-hidden pointer-events-none z-[60] w-full md:max-w-[430px]"
      style={{ height: "100svh" }}
      aria-hidden="true"
    >
      {FLOWERS.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ left: `${f.left}%`, top: "-10vh" }}
          animate={{
            y: ["0vh", "30vh", "60vh", "90vh", "120vh"],
            x: [0, f.sway, -f.sway, f.sway * 0.6, 0],
            rotate: [0, f.spin * 0.25, f.spin * 0.5, f.spin * 0.75, f.spin],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <Jasmine size={f.size} />
        </motion.div>
      ))}
    </div>
  );
}
