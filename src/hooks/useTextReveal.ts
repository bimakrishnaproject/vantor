"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createTextReveal, type TextRevealOptions } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Splits the referenced element's text into word spans and reveals them on scroll.
 * Restores the original text content on cleanup.
 */
export function useTextReveal(
  ref: RefObject<HTMLElement | null>,
  options: TextRevealOptions = {}
) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const { restore } = createTextReveal(el, options);
      return () => restore();
    },
    {
      scope: ref,
      dependencies: [options.stagger, options.delay, options.ease, options.start],
    }
  );
}
