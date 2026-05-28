"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import styles from "./HeroSection.module.css";

interface HeroProps {
  data: {
    label: string;
    headline: string;
    subtext: string;
    cta: { text: string; link: string };
    metrics?: { value: string; label: string }[];
  };
}

export default function HeroSection({ data }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background Stadium is now handled globally in app/page.tsx */}
      
      {/* Scrolling Interactive Content overlay */}
      <div className={styles.heroScrollWrapper}>
        <div ref={overlayRef} className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <span className={styles.label}>{data.label}</span>
            <h1 className={styles.headline}>{data.headline}</h1>
            <p className={styles.subtext}>{data.subtext}</p>
            <div className={styles.ctaRow}>
              <Button variant="primary" size="lg" href={data.cta?.link ?? "#"}>
                {data.cta?.text ?? "Explore"}
              </Button>
            </div>
          </div>
        </div>

        <div ref={hudRef} className={styles.hudContainer}>
          <div className={styles.hudLeft}>NETWORK: ACTIVE</div>
          <div className={styles.hudRight}>GLOBAL REACH</div>
        </div>
      </div>
    </section>
  );
}
