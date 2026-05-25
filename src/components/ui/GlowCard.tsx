"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import styles from "./GlowCard.module.css";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlowCard({
  children,
  className = "",
  glowColor,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMouseGlow(ref);

  const style = glowColor
    ? ({ "--glow-color": glowColor } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} className={`${styles.card} ${className}`} style={style}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
