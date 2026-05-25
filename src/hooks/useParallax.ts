"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createParallax } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Applies a scroll-linked (scrub) parallax movement to the referenced element.
 * Respects prefers-reduced-motion.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed = 0.2
) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      createParallax(el, speed);
    },
    { scope: ref, dependencies: [speed] }
  );
}
