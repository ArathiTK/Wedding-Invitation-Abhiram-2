"use client";
import { useEffect, useRef } from "react";

export default function VideoBgSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // load() only once — buffers the video without discarding progress on retry
    v.load();
    v.playbackRate = 0.5;

    // Signal section 1 that section 2 is buffered and ready
    v.addEventListener("canplay", () => {
      document.dispatchEvent(new CustomEvent("section2ready"));
    }, { once: true });

    const tryPlay = () => { v.playbackRate = 0.5; return v.play().catch(() => {}); };

    // Play immediately; keep retrying on every gesture until it succeeds
    tryPlay();
    const onGesture = () => {
      v.play().then(() => {
        // Successfully playing — remove listeners
        document.removeEventListener("touchstart", onGesture);
        document.removeEventListener("click", onGesture);
      }).catch(() => {});
    };
    document.addEventListener("touchstart", onGesture);
    document.addEventListener("click", onGesture);

    // Re-attempt whenever section scrolls back into view
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) tryPlay(); },
      { threshold: 0.1 }
    );
    observer.observe(v);

    // Pause/resume on tab switch
    const handleVisibility = () => {
      if (document.hidden) v.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("touchstart", onGesture);
      document.removeEventListener("click", onGesture);
    };
  }, []);

  return (
    <section id="our-story" className="relative h-[100svh] overflow-hidden flex flex-col justify-start px-8 pt-[12vh]">
      <video
        ref={videoRef}
        src="/assets/walking%20video%203.mp4"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        onCanPlay={e => { (e.target as HTMLVideoElement).playbackRate = 0.5; }}
        suppressHydrationWarning
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 25, 15, 0.1)" }} />

      <div className="relative z-10 w-full mx-auto text-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#000000" className="mx-auto mb-[clamp(1rem,4vh,2rem)]">
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
        </svg>
        <p className="text-black leading-relaxed mb-[clamp(1.5rem,5vh,3rem)]"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.15rem, 4vw, 1.35rem)", fontStyle: "italic" }}>
          Two separate paths, moving at their own pace, quietly led us to each other. Through a million tiny moments of laughter, comfort, and shared dreams, our individual journeys seamlessly became one beautiful love story.
        </p>
      </div>
    </section>
  );
}
