"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis] = useState<Lenis | null>(() => {
    if (typeof window === "undefined") return null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return null;

    return new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
  });

  useEffect(() => {
    if (!lenis) return;

    // ─── KEY FIX ────────────────────────────────────────────────────────────
    // Drive Lenis from GSAP's ticker so both share the exact same rAF frame.
    // This eliminates the dual-loop desync that caused jitter and race conditions.
    gsap.registerPlugin(ScrollTrigger);

    const onFrame = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker time is in seconds; Lenis expects ms
    };
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from skipping frames under load

    // Notify ScrollTrigger whenever Lenis physically moves the scroll position.
    // Without this, ScrollTrigger never knows the scroll changed (Lenis suppresses
    // native scroll events) and the pinned hero section breaks.
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onFrame);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
