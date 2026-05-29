"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  isLowEndDevice,
  isTouchDevice,
  prefersReducedMotion,
} from "@/lib/animations";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lenis] = useState<Lenis | null>(() => {
    if (typeof window === "undefined") return null;
    if (prefersReducedMotion() || isTouchDevice() || isLowEndDevice()) return null;

    return new Lenis({
      lerp: 0.085,
      duration: 0.75,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.72,
      touchMultiplier: 0.9,
      autoResize: true,
    });
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname, lenis]);

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
    gsap.ticker.lagSmoothing(500, 33);

    // Notify ScrollTrigger whenever Lenis physically moves the scroll position.
    // Without this, ScrollTrigger never knows the scroll changed (Lenis suppresses
    // native scroll events) and the pinned hero section breaks.
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.config({
      ignoreMobileResize: true,
      syncInterval: 250,
    });

    const recoverScrollState = () => {
      if (document.visibilityState === "hidden") return;

      gsap.ticker.wake();
      lenis.resize();
      lenis.raf(performance.now());
      ScrollTrigger.refresh(true);
      ScrollTrigger.update();
    };

    document.addEventListener("visibilitychange", recoverScrollState);
    window.addEventListener("focus", recoverScrollState);
    window.addEventListener("pageshow", recoverScrollState);

    return () => {
      gsap.ticker.remove(onFrame);
      lenis.off("scroll", ScrollTrigger.update);
      document.removeEventListener("visibilitychange", recoverScrollState);
      window.removeEventListener("focus", recoverScrollState);
      window.removeEventListener("pageshow", recoverScrollState);
      lenis.destroy();
    };
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
