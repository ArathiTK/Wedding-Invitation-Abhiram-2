"use client";
import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-11-06T12:10:00+05:30");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): { time: TimeLeft; isPast: boolean } {
  const diff = WEDDING_DATE.getTime() - Date.now();
  const isPast = diff <= 0;
  const abs = Math.abs(diff);
  return {
    isPast,
    time: {
      days: Math.floor(abs / (1000 * 60 * 60 * 24)),
      hours: Math.floor((abs / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((abs / (1000 * 60)) % 60),
      seconds: Math.floor((abs / 1000) % 60),
    },
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const [state, setState] = useState<{ time: TimeLeft; isPast: boolean } | null>(null);

  useEffect(() => {
    setState(getTimeLeft());
    const id = setInterval(() => setState(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!state) return null;
  const { time, isPast } = state;

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {isPast && (
        <span
          className="text-xs tracking-widest uppercase text-white/80"
          style={{ fontFamily: "var(--font-seasons)" }}
        >
          Wedded Since
        </span>
      )}
      <div className="flex gap-4 justify-center flex-wrap">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center min-w-[60px]">
            <span
              className="text-3xl font-light text-white tabular-nums leading-none"
              style={{ fontFamily: "var(--font-seasons)" }}
            >
              {pad(value)}
            </span>
            <span className="text-xs tracking-widest uppercase text-white/70 mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
