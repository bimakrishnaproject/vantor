"use client";

import { useRef, type ReactNode } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "./StatCard.module.css";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  endValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
}

export default function StatCard({
  value,
  label,
  icon,
  endValue,
  prefix = "",
  suffix = "",
  decimals = 0,
  delay = 0,
}: StatCardProps) {
  const valueRef = useRef<HTMLSpanElement>(null);

  const { displayValue } = useCountUp(valueRef, endValue ?? 0, {
    prefix,
    suffix,
    decimals,
    duration: 2.5,
  });

  const shown = endValue !== undefined ? displayValue : value;

  return (
    <div
      className={`${styles.card} card-3d glass-panel`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <div className={styles.stadiumLight} aria-hidden="true" />
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.valueContainer}>
        <span ref={valueRef} className={`${styles.value} animate-digital`} data-value={value}>
          {shown}
        </span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

