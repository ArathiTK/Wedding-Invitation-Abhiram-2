"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeIntro from "./EnvelopeIntro";
import FallingFlowers from "./FallingFlowers";
import { IntroContext } from "@/app/context/IntroContext";

const TRACK = "/assets/audio/bgm-bansuri-tarana.mp3";
const TARGET_VOLUME = 0.35;
const FADE_DURATION = 4000;

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadingRef = useRef(false);
  const frameRef = useRef<number>(0);

  function fadeIn() {
    const audio = audioRef.current;
    if (!audio || fadingRef.current) return;
    fadingRef.current = true;
    const start = performance.now();
    function tick(now: number) {
      if (!audio) return;
      const progress = Math.min((now - start) / FADE_DURATION, 1);
      audio.volume = progress * TARGET_VOLUME;
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
  }

  // Step 1 — unlock audio inside the tap gesture (iOS requires this)
  function handleTap() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.play().catch(() => {});
  }

  // Step 2 — intro video ended; start fading music in
  function handleVideoEnd() {
    setStarted(true);
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      // Already playing (gesture unlock worked) — just fade up
      fadeIn();
    } else {
      // iOS paused audio when the video started; retry on next touch/click
      const retry = (e: Event) => {
        e.stopPropagation();
        audio.play().then(fadeIn).catch(() => {});
      };
      document.addEventListener("touchstart", retry, { once: true, capture: true });
      document.addEventListener("click", retry, { once: true, capture: true });

      // Also try immediately — works on Android Chrome / desktop even outside gesture
      audio.play().then(fadeIn).catch(() => {});
    }
  }

  // Pause/resume on tab visibility change
  useEffect(() => {
    if (!started) return;
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [started]);

  // Lock scroll until envelope opened
  useEffect(() => {
    if (opened) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.style.overflow = "";
      return;
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [opened]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <IntroContext.Provider value={{ opened }}>
      <div className="relative">
        <audio ref={audioRef} src={TRACK} loop preload="auto" aria-hidden="true" />
        <AnimatePresence>
          {!opened && (
            <EnvelopeIntro
              onOpen={() => setOpened(true)}
              onTap={handleTap}
              onVideoEnd={handleVideoEnd}
            />
          )}
        </AnimatePresence>
        {started && <FallingFlowers />}
        {children}
      </div>
    </IntroContext.Provider>
  );
}
