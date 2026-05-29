"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isExpanded) return; // Disable hover effect when expanded
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
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={`${styles.card} card-3d ${isExpanded ? styles.expanded : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-expanded={isExpanded}
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
        <div className={styles.headerRow}>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.client}>{client}</span>
          </div>
          <span className={styles.expandIcon} aria-hidden="true">
            {isExpanded ? "−" : "+"}
          </span>
        </div>
        
        <div className={styles.metrics}>
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Expandable Content Area */}
        <div className={`${styles.expandableContent} ${isExpanded ? styles.showContent : ""}`}>
          <p className={styles.caseStudyText}>
            We engineered a targeted network placement strategy across our owned {category.toLowerCase()} surfaces to achieve unprecedented results for this campaign. By engaging communities naturally within their own feeds, we bypassed traditional ad friction and delivered high-intent audiences directly to the conversion point.
          </p>
        </div>
      </div>
    </button>
  );
}
