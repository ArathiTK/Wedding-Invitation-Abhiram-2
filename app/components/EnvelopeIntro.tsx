"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onOpen: () => void;
  onTap?: () => void;
  onVideoEnd?: () => void;
}

const VIDEO = "/assets/bg%20video%203%20-%20evelope.mp4";

type State = "idle" | "playing" | "done";

export default function EnvelopeIntro({ onOpen, onTap, onVideoEnd }: Props) {
  const [state, setState] = useState<State>("idle");
  const stateRef = useRef<State>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const endedRef = useRef(false);

  function setStateSynced(s: State) {
    stateRef.current = s;
    setState(s);
  }

  // Preload video so first frame shows immediately and tap response is instant
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    // Seek to frame 0 so a poster frame renders on all devices
    v.currentTime = 0;
  }, []);

  function handleEnd() {
    if (endedRef.current) return;
    endedRef.current = true;
    videoRef.current?.pause();
    onVideoEnd?.();
    setStateSynced("done");
    onOpen();
  }

  function handleTap() {
    if (stateRef.current !== "idle") return;
    setStateSynced("playing");
    const v = videoRef.current;
    if (v) {
      try { v.playbackRate = 1.4; } catch {}
      v.play().catch(() => handleEnd()); // if play fails, proceed to open anyway
    }
    // Fire the background-audio unlock in the SAME tap gesture/click handler as the
    // video play() call above — iOS/Safari only allow audio.play() to succeed when it
    // runs synchronously inside a real user gesture, so this must not be deferred
    // (e.g. to onVideoEnd) or audio will silently fail to start on mobile.
    onTap?.();
  }

  return (
    <motion.div
      onClick={handleTap}
      className="fixed inset-0 z-50 overflow-hidden mx-auto w-full md:max-w-[430px]"
      style={{ height: "100svh", backgroundColor: "#181e13", cursor: state === "idle" ? "pointer" : "default" }}
      animate={{ opacity: state === "done" ? 0 : 1 }}
      transition={{ duration: 0 }}
    >
      <video
        ref={videoRef}
        src={VIDEO}
        muted
        playsInline
        preload="auto"
        // Highest fetch priority: this is the only asset the user sees before interacting,
        // so it must win the network race against the (deferred) section videos below.
        // @ts-expect-error -- fetchPriority is valid HTML but not yet in React's video typings
        fetchPriority="high"
        onEnded={handleEnd}
        onError={handleEnd}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (
            stateRef.current === "playing" &&
            v &&
            isFinite(v.duration) &&
            v.duration > 0 &&
            v.currentTime >= v.duration - 1
          ) handleEnd();
        }}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        suppressHydrationWarning
      />

      {/* TAP TO OPEN */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: state === "idle" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.p
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.85rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#1f1710",
          }}
        >
          Tap to open
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
