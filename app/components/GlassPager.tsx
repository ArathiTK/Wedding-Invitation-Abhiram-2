"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 22, mass: 1 };
const GESTURE_IDLE_MS = 100;
const TOUCH_END_RELEASE_MS = 60;
const TOUCH_THRESHOLD = 8;
const DESKTOP_BREAKPOINT = 768;
const MOBILE_COLUMN_WIDTH = 430;
const INVITATION_INDEX = 2;

/**
 * All five sections as full-screen "pages" driven entirely by JS instead of native
 * scrolling: any scroll action (a wheel tick or swipe, however long it lasts) snaps
 * straight to the next/previous page with a springy (elastic) transition in either
 * direction — never a partial, mid-drag view of a section.
 *
 * The green background is rendered once here, tracking Invitation's own page position
 * (via `top`, not a transform — see below) while pages 0–2 (Save-the-Date/Story/
 * Invitation) are in motion, so it slides in together with Invitation's frosted glass.
 * Once the pager reaches Invitation (index >= INVITATION_INDEX) it stops moving —
 * "locks" fixed to the viewport — for Events/RSVP too, and only starts sliding again
 * if the user scrolls back before Invitation.
 *
 * Animated via `top` (a plain pixel value) rather than a `transform`: a `transform` on
 * an ancestor of a `position: fixed` element silently makes that ancestor the
 * containing block instead of the true viewport, which would break "stays fixed" once
 * settled. The pages themselves use `y` (transform), which is fine since they're
 * `position: absolute`, not `fixed`.
 *
 * A single physical gesture (e.g. a long trackpad fling) fires many wheel events in a
 * row; only the first one of a gesture steps the page — the lock is released only
 * once wheel/touch events stop arriving (not after a fixed timer), so one continuous
 * scroll never cascades through multiple sections automatically. `touchend` is a
 * clear physical signal a gesture ended, so it releases the lock faster than waiting
 * on the generic idle timer, so a new swipe right after lifting the finger isn't
 * swallowed.
 */
export default function GlassPager({ pages }: { pages: React.ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const lockedRef = useRef(false);
  const idleTimerRef = useRef<number | undefined>(undefined);
  const touchYRef = useRef<number | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth >= DESKTOP_BREAKPOINT ? MOBILE_COLUMN_WIDTH : window.innerWidth,
        height: window.innerHeight,
      });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function releaseLockAfter(ms: number) {
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => {
      lockedRef.current = false;
    }, ms);
  }

  function step(dir: 1 | -1) {
    releaseLockAfter(GESTURE_IDLE_MS);
    if (lockedRef.current) return;

    const current = indexRef.current;
    const next = Math.max(0, Math.min(pages.length - 1, current + dir));
    if (next !== current) {
      lockedRef.current = true;
      setIndex(next);
    }
  }

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      step(e.deltaY > 0 ? 1 : -1);
    }

    function onTouchStart(e: TouchEvent) {
      touchYRef.current = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (touchYRef.current == null) return;
      const dy = touchYRef.current - e.touches[0].clientY;
      const dir = dy > 0 ? 1 : -1;
      // Let a downward pull at the very first page fall through to the browser's
      // native pull-to-refresh instead of hijacking it — there's nowhere to step
      // back to anyway.
      if (indexRef.current === 0 && dir === -1) return;
      if (Math.abs(dy) < TOUCH_THRESHOLD) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      step(dir);
      touchYRef.current = e.touches[0].clientY;
    }

    function onTouchEnd() {
      touchYRef.current = null;
      releaseLockAfter(TOUCH_END_RELEASE_MS);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!size) return null;

  const bgTrackIndex = Math.min(index, INVITATION_INDEX);
  const bgTop = (INVITATION_INDEX - bgTrackIndex) * size.height;

  return (
    <div
      className="fixed overflow-hidden"
      style={{ top: 0, left: "50%", transform: "translateX(-50%)", width: size.width, height: size.height, zIndex: 0 }}
    >
      <motion.div
        aria-hidden
        animate={{ top: bgTop }}
        transition={SPRING}
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          width: size.width,
          height: size.height,
          backgroundImage: "url('/assets/BG%20jasmine.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#414b3b",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      {pages.map((page, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ y: `${(i - index) * 100}%` }}
          transition={SPRING}
        >
          {page}
        </motion.div>
      ))}
    </div>
  );
}
