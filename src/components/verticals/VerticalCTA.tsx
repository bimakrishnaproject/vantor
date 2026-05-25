import type { CSSProperties } from "react";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./VerticalCTA.module.css";

interface VerticalCTAProps {
  headline: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
  accentColor?: string;
}

export default function VerticalCTA({
  headline,
  subtext,
  ctaText = "Start a Project",
  ctaHref = "/contact",
  accentColor,
}: VerticalCTAProps) {
  const style = accentColor
    ? ({ "--cta-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <section className={styles.section} style={style}>
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.inner}>
        <TextReveal tag="h2" className={styles.headline}>
          {headline}
        </TextReveal>
        {subtext && <p className={styles.subtext}>{subtext}</p>}
        <Button variant="primary" size="lg" href={ctaHref}>
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
