"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SCROLL_TRIGGER_DEFAULTS, prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Animates the referenced element into view using gsap.from() driven by ScrollTrigger.
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  animationVars: gsap.TweenVars,
  scrollTriggerOptions: ScrollTrigger.Vars = {}
) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      gsap.from(el, {
        ...animationVars,
        scrollTrigger: {
          trigger: el,
          ...SCROLL_TRIGGER_DEFAULTS,
          ...scrollTriggerOptions,
        },
      });
    },
    { scope: ref, dependencies: [] }
  );
}
