"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

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

  const imgSrc = image || 
    (slug === "audio-campaign" ? "https://images.unsplash.com/photo-1516280440502-610111584dfc?auto=format&fit=crop&w=800&q=80" :
     slug === "ecommerce-scaling" ? "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" :
     slug === "mobile-acquisition" ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" :
     slug === "casino-compliance" ? "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80" :
     slug === "fashion-roas" ? "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80" :
     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80");

  return (
    <Link
      href={`/case-studies/${slug}`}
      className={`${styles.card} card-3d`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.media}>
        <span className={styles.badge}>{category}</span>
        <div ref={visualRef} className={styles.visual}>
          <Image
            src={imgSrc}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
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
