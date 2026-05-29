"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { shouldReduceScrollEffects } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "3d-float" | "scale-up" | "stagger-children";
  delay?: number;
  stagger?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  animation = "3d-float", 
  delay = 0,
  stagger = 0.1,
  className = ""
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const reduceScrollEffects = shouldReduceScrollEffects();
    
    // For reducing motion, just show the content immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    const trigger = ref.current;
    
    if (animation === "stagger-children") {
      const childrenElements = trigger.children;
      gsap.from(childrenElements, {
        opacity: 0,
        y: reduceScrollEffects ? 18 : 32,
        duration: reduceScrollEffects ? 0.45 : 0.7,
        stagger: Math.min(stagger, reduceScrollEffects ? 0.035 : 0.07),
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: trigger,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        }
      });
      return;
    }

    let vars: gsap.TweenVars = {
      opacity: 0,
      y: reduceScrollEffects ? 18 : 40,
      duration: reduceScrollEffects ? 0.45 : 0.75,
      ease: "power2.out",
      delay
    };

    if (animation === "3d-float") {
      vars = { ...vars, y: reduceScrollEffects ? 20 : 48, transformOrigin: "bottom center" };
    } else if (animation === "scale-up") {
      vars = { ...vars, scale: reduceScrollEffects ? 0.98 : 0.96 };
    }

    gsap.from(trigger, {
      ...vars,
      scrollTrigger: {
        trigger: trigger,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      }
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={{ width: "100%" }}>
      {children}
    </div>
  );
}
