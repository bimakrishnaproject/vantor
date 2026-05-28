"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MetricRow.module.css";

export interface Metric {
  label: string;
  value: string;
  maxValue: number;
  subtext?: string;
}

interface MetricRowProps {
  metrics: Metric[];
}

function percentFromValue(value: string, maxValue: number): number {
  const numeric = parseFloat(value.replace(/[^0-9.-]/g, ""));
  if (Number.isNaN(numeric) || maxValue <= 0) return 0;
  return Math.max(0, Math.min(100, (Math.abs(numeric) / maxValue) * 100));
}

export default function MetricRow({ metrics }: MetricRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.list}>
      {metrics.map((m) => (
        <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <div className={styles.row}>
            <span className={styles.label}>{m.label}</span>
            <div className={styles.track}>
              <div
                className={styles.fill}
                style={{
                  width: active ? `${percentFromValue(m.value, m.maxValue)}%` : 0,
                }}
              />
            </div>
            <span className={styles.value}>{m.value}</span>
          </div>
          {m.subtext && (
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem', maxWidth: '85%' }}>
              {m.subtext}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
