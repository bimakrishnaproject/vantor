"use client";

import { useState, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface CountUpOptions {
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  separator?: string;
  startValue?: number;
}

function format(value: number, decimals: number, separator: string): string {
  const fixed = value.toFixed(decimals);
  const [intPart, fracPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return fracPart ? `${withSep}.${fracPart}` : withSep;
}

/**
 * Animates a number from startValue to endValue once the element scrolls into view.
 * Returns the formatted displayValue and whether it is currently animating.
 */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  endValue: number,
  options: CountUpOptions = {}
) {
  const {
    duration = 2,
    suffix = "",
    prefix = "",
    decimals = 0,
    separator = ",",
    startValue = 0,
  } = options;

  const initial = `${prefix}${format(startValue, decimals, separator)}${suffix}`;
  const final = `${prefix}${format(endValue, decimals, separator)}${suffix}`;

  const [displayValue, setDisplayValue] = useState(initial);
  const [isAnimating, setIsAnimating] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        setDisplayValue(final);
        return;
      }

      const proxy = { value: startValue };
      gsap.to(proxy, {
        value: endValue,
        duration,
        ease: "power2.out",
        onStart: () => setIsAnimating(true),
        onUpdate: () => {
          setDisplayValue(
            `${prefix}${format(proxy.value, decimals, separator)}${suffix}`
          );
        },
        onComplete: () => {
          setDisplayValue(final);
          setIsAnimating(false);
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [endValue] }
  );

  return { displayValue, isAnimating };
}
