"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CaseStudyCard.module.css";

export interface CaseStudyMetric {
  label: string;
  value: string;
}

interface CaseStudyCardProps {
  title: string;
  client: string;
  image?: string;
  metrics: CaseStudyMetric[];
  slug: string;
  category: string;
}

export default function CaseStudyCard({
  title,
  client,
  image,
  metrics,
  slug,
  category,
}: CaseStudyCardProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = visualRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY } = e;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--img-x", `${px * -16}px`);
      el.style.setProperty("--img-y", `${py * -16}px`);
    });
  };

  const handleMouseLeave = () => {
    const el = visualRef.current;
    if (!el) return;
    el.style.setProperty("--img-x", "0px");
    el.style.setProperty("--img-y", "0px");
  };

  return (
    <Link
      href={`/case-studies/${slug}`}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.media}>
        <span className={styles.badge}>{category}</span>
        <div ref={visualRef} className={styles.visual}>
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.client}>{client}</span>
        <div className={styles.metrics}>
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
