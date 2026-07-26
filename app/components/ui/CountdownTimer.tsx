"use client";
import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-11-06T12:10:00+05:30");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
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
  );
}
