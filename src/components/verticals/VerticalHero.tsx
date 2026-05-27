"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./VerticalHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(contentRef.current, {
      y: 80,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  const style = { "--vh-accent": accentColor } as CSSProperties;

  return (
    <section ref={sectionRef} className={styles.hero} style={style}>
      <div ref={bgRef} className={styles.backdrop} aria-hidden="true">
        <div className={styles.stadiumGlow} />
        <div className={styles.gridOverlay} />
        <div className={styles.grain} />
      </div>

      {backgroundEffect && (
        <div className={styles.effect} aria-hidden="true">
          {backgroundEffect}
        </div>
      )}

      <div ref={contentRef} className={styles.inner}>
        <ScrollReveal animation="stagger-children" stagger={0.1}>
          <div className={styles.content}>
            <span className={styles.label}>{label}</span>
            <TextReveal tag="h1" className={styles.headline}>
              {headline}
            </TextReveal>
            <p className={styles.description}>
              {description}
            </p>
            <div className={styles.cta}>
              <Button variant="outline" size="lg" href={ctaHref}>
                {ctaText}
              </Button>
            </div>
          </div>
        </ScrollReveal>
        
        {visual && (
          <ScrollReveal animation="3d-float" delay={0.2} className={styles.visual}>
            {visual}
          </ScrollReveal>
        )}
      </div>
      
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollChevron} aria-hidden="true">↓</span>
      </div>
    </section>
  );
}

