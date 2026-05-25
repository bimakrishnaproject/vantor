"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Tracks the cursor relative to the referenced element and writes its position
 * into the --mouse-x / --mouse-y custom properties (throttled to ~60fps).
 * Returns whether the cursor is currently over the element.
 */
export function useMouseGlow(ref: RefObject<HTMLElement | null>) {
  const [isHovering, setIsHovering] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (frame.current !== null) return; // throttle to one update per frame
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        frame.current = null;
      });
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [ref]);

  return { isHovering };
}
