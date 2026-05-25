"use client";

import { useRef, type ElementType } from "react";
import { useTextReveal } from "@/hooks/useTextReveal";

interface TextRevealProps {
  children: string;
  tag?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}

export default function TextReveal({
  children,
  tag = "p",
  className = "",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  useTextReveal(ref, { delay });
  const Tag = tag as ElementType;

  return (
    <Tag ref={ref} className={className} data-text-reveal>
      {children}
    </Tag>
  );
}
