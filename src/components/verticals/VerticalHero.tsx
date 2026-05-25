import type { CSSProperties, ReactNode } from "react";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./VerticalHero.module.css";

interface VerticalHeroProps {
  label: string;
  headline: string;
  description: string;
  accentColor: string;
  backgroundEffect?: ReactNode;
  visual?: ReactNode;
  ctaText?: string;
  ctaHref?: string;
}

export default function VerticalHero({
  label,
  headline,
  description,
  accentColor,
  backgroundEffect,
  visual,
  ctaText = "Get Started",
  ctaHref = "/contact",
}: VerticalHeroProps) {
  const style = { "--vh-accent": accentColor } as CSSProperties;

  return (
    <section className={styles.hero} style={style}>
      <div className={styles.backdrop} aria-hidden="true" />
      {backgroundEffect && (
        <div className={styles.effect} aria-hidden="true">
          {backgroundEffect}
        </div>
      )}

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.label}>{label}</span>
          <TextReveal tag="h1" className={styles.headline}>
            {headline}
          </TextReveal>
          <p className={styles.description}>{description}</p>
          <div className={styles.cta}>
            <Button variant="outline" size="lg" href={ctaHref}>
              {ctaText}
            </Button>
          </div>
        </div>
        {visual && <div className={styles.visual}>{visual}</div>}
      </div>
    </section>
  );
}
