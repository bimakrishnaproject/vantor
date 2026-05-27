"use client";

import styles from "./VerticalHeroVisual.module.css";
import Image from "next/image";

interface VerticalHeroVisualProps {
  slug: string;
}

const images = {
  casinos: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
  audio: "https://images.unsplash.com/photo-1516280440502-610111584dfc?auto=format&fit=crop&w=600&q=80",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
  "mobile-apps": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  other: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
};

export default function VerticalHeroVisual({ slug }: VerticalHeroVisualProps) {
  const imgSrc = images[slug as keyof typeof images] || images.other;

  return (
    <div className={styles.container}>
      <div className={`${styles.panel} ${styles.backPanel} animate-float-3d`} style={{ animationDelay: '-2s' }}>
        <div className={styles.chartLine} />
      </div>
      <div className={`${styles.panel} ${styles.mainPanel} animate-float-3d`}>
        <Image src={imgSrc} alt={slug} fill style={{ objectFit: 'cover' }} className={styles.image} />
        <div className={styles.glassOverlay}>
          <div className={styles.statLabel}>Performance Index</div>
          <div className={styles.statValue}>98.5%</div>
        </div>
      </div>
      <div className={`${styles.panel} ${styles.frontPanel} animate-float-3d`} style={{ animationDelay: '-4s' }}>
        <div className={styles.dot} />
        <div className={styles.dotLine} />
        <div className={styles.dotLine} style={{ width: '60%' }} />
      </div>
    </div>
  );
}
