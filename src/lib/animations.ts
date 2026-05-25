import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ===== GSAP DEFAULTS ===== */
export const GSAP_DEFAULTS = {
  ease: "power3.out",
  duration: 1,
  stagger: 0.1,
} as const;

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 85%",
  end: "bottom 20%",
  toggleActions: "play none none none",
} as const;

/* ===== PRESETS ===== */
export const FADE_UP: gsap.TweenVars = {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: "power3.out",
};
export const FADE_DOWN: gsap.TweenVars = {
  opacity: 0,
  y: -40,
  duration: 0.8,
  ease: "power3.out",
};
export const FADE_LEFT: gsap.TweenVars = {
  opacity: 0,
  x: -60,
  duration: 0.8,
  ease: "power3.out",
};
export const FADE_RIGHT: gsap.TweenVars = {
  opacity: 0,
  x: 60,
  duration: 0.8,
  ease: "power3.out",
};
export const SCALE_IN: gsap.TweenVars = {
  opacity: 0,
  scale: 0.9,
  duration: 0.8,
  ease: "power3.out",
};
export const TEXT_REVEAL: gsap.TweenVars = {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.03,
  ease: "power2.out",
};
export const PARALLAX_SLOW: gsap.TweenVars = { yPercent: -10, ease: "none" };
export const PARALLAX_MEDIUM: gsap.TweenVars = { yPercent: -20, ease: "none" };
export const PARALLAX_FAST: gsap.TweenVars = { yPercent: -30, ease: "none" };

export const PRESETS = {
  FADE_UP,
  FADE_DOWN,
  FADE_LEFT,
  FADE_RIGHT,
  SCALE_IN,
  TEXT_REVEAL,
  PARALLAX_SLOW,
  PARALLAX_MEDIUM,
  PARALLAX_FAST,
} as const;

/* ===== HELPERS ===== */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ===== UTILITY FUNCTIONS ===== */

type GsapTarget = gsap.DOMTarget;

/**
 * Returns a GSAP timeline bound to a ScrollTrigger on the given trigger element.
 */
export function createScrollTimeline(
  trigger: GsapTarget,
  options: ScrollTrigger.Vars = {}
): gsap.core.Timeline {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      ...SCROLL_TRIGGER_DEFAULTS,
      ...options,
    },
  });
}

/**
 * Animates an element's text from 0 to endValue, with optional suffix.
 */
export function createCountUpAnimation(
  element: Element,
  endValue: number,
  duration = 2,
  suffix = ""
): gsap.core.Tween {
  const proxy = { value: 0 };
  return gsap.to(proxy, {
    value: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = `${Math.round(proxy.value).toLocaleString()}${suffix}`;
    },
  });
}

export interface TextRevealOptions {
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

/**
 * Splits an element's text into word spans and reveals them word-by-word on scroll.
 * Returns a restore() function that puts the original text back.
 */
export function createTextReveal(
  element: HTMLElement,
  options: TextRevealOptions = {}
): { tween: gsap.core.Tween | null; restore: () => void } {
  const { stagger = 0.03, delay = 0, ease = "power2.out", start = "top 85%" } =
    options;
  const original = element.textContent ?? "";
  const words = original.split(" ");

  element.textContent = "";
  const spans = words.map((word, i) => {
    const span = document.createElement("span");
    span.textContent = i < words.length - 1 ? `${word} ` : word;
    span.style.display = "inline-block";
    span.style.whiteSpace = "pre"; // preserve trailing space; inline-block would strip it otherwise
    span.style.willChange = "transform, opacity";
    element.appendChild(span);
    return span;
  });

  const restore = () => {
    element.textContent = original;
  };

  if (prefersReducedMotion()) {
    return { tween: null, restore };
  }

  const tween = gsap.from(spans, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease,
    stagger,
    delay,
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none none",
    },
  });

  return { tween, restore };
}

/**
 * Applies a scroll-linked parallax movement to an element.
 */
export function createParallax(
  element: GsapTarget,
  speed = 0.2
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;
  const shift = Math.min(0.5, Math.max(0.1, speed)) * 100;

  return gsap.fromTo(
    element,
    { yPercent: -shift / 2 },
    {
      yPercent: shift / 2,
      ease: "none",
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

/**
 * Staggered fade-in entrance for a set of elements on scroll.
 */
export function createStaggeredEntrance(
  elements: GsapTarget,
  fromVars: gsap.TweenVars = FADE_UP,
  stagger = 0.1
): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1 });
    return null;
  }

  const firstEl = gsap.utils.toArray<Element>(elements)[0];

  return gsap.from(elements, {
    ...fromVars,
    stagger,
    scrollTrigger: {
      trigger: firstEl,
      ...SCROLL_TRIGGER_DEFAULTS,
    },
  });
}
