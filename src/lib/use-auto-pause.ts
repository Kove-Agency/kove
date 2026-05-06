"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Returns `true` when the observed element is offscreen OR the tab is hidden.
 * Use this to pause expensive animations / setIntervals when the user can't see them.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const paused = useAutoPause(ref);
 * useEffect(() => {
 *   if (paused) return;
 *   const t = setInterval(tick, 1000);
 *   return () => clearInterval(t);
 * }, [paused]);
 */
export function useAutoPause(ref: RefObject<HTMLElement | null>): boolean {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isOffscreen = false;
    let isHidden =
      typeof document !== "undefined" ? document.hidden : false;

    const update = () => setPaused(isOffscreen || isHidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        isOffscreen = !entry.isIntersecting;
        update();
      },
      { threshold: 0, rootMargin: "100px" },
    );
    io.observe(el);

    const onVis = () => {
      isHidden = document.hidden;
      update();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ref]);

  return paused;
}
