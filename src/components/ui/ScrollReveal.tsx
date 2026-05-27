"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
        y: 40,
        rotationX: 10,
        duration: 0.8,
        stagger: stagger,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: trigger,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
      return;
    }

    let vars: gsap.TweenVars = {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay
    };

    if (animation === "3d-float") {
      vars = { ...vars, rotationX: 15, y: 80, transformPerspective: 1000, transformOrigin: "bottom center" };
    } else if (animation === "scale-up") {
      vars = { ...vars, scale: 0.95 };
    }

    gsap.from(trigger, {
      ...vars,
      scrollTrigger: {
        trigger: trigger,
        start: "top 85%",
        toggleActions: "play none none reverse", 
      }
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={{ width: "100%" }}>
      {children}
    </div>
  );
}
