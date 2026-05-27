"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./HeroSection.module.css";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PARTICLES = [
  { top: "15%", left: "12%", delay: "0s",   size: 6 },
  { top: "35%", left: "85%", delay: "1.2s", size: 4 },
  { top: "65%", left: "20%", delay: "0.6s", size: 5 },
  { top: "75%", left: "70%", delay: "2.4s", size: 8 },
  { top: "45%", left: "90%", delay: "1.8s", size: 4 },
  { top: "85%", left: "15%", delay: "3.0s", size: 5 },
];

interface HeroProps {
  data: {
    label: string;
    headline: string;
    subtext: string;
    cta: {
      text: string;
      link: string;
    };
  };
}

export default function HeroSection({ data }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
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

    // Content parallax on scroll
    gsap.to(contentRef.current, {
      y: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 3D floating elements parallax (move faster than bg)
    gsap.to(floatingElementsRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background layer */}
      <div ref={bgRef} className={styles.backdrop} aria-hidden="true">
        <div className={styles.stadiumGlow} />
        <div className={styles.floodlights} />
        <div className={styles.gridOverlay} />
        <div className={styles.grain} />
      </div>

      {/* Middle ground floating elements (3D panels) */}
      <div ref={floatingElementsRef} className={styles.floatingLayer} aria-hidden="true">
        
        {/* Card 1: Performance Chart */}
        <div className={`${styles.floatPanel} ${styles.panel1} animate-float-3d`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardDot} /> Live Performance
          </div>
          <div className={styles.cardValue}>+124%</div>
          <div className={styles.cardLabel}>ROAS Growth</div>
          <div className={styles.cardChart}>
             <div className={styles.bar} style={{ height: '30%' }} />
             <div className={styles.bar} style={{ height: '50%' }} />
             <div className={styles.bar} style={{ height: '75%' }} />
             <div className={styles.bar} style={{ height: '100%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }} />
          </div>
        </div>

        {/* Card 2: Audience Reach */}
        <div className={`${styles.floatPanel} ${styles.panel2} animate-float-3d`} style={{ animationDelay: '-2s' }}>
          <div className={styles.cardHeader}>Global Reach</div>
          <div className={styles.cardValue}>4.2M</div>
          <div className={styles.cardLabel}>Active Listeners</div>
          <div className={styles.avatarRow}>
            <div className={styles.avatar} style={{ zIndex: 3 }} />
            <div className={styles.avatar} style={{ zIndex: 2 }} />
            <div className={styles.avatar} style={{ zIndex: 1 }} />
          </div>
        </div>

        {/* Card 3: Conversion Pulse */}
        <div className={`${styles.floatPanel} ${styles.panel3} animate-float-3d`} style={{ animationDelay: '-4s' }}>
          <div className={styles.pulseWrapper}>
            <div className={styles.pulseRing} />
            <div className={styles.pulseRing} style={{ animationDelay: '1s' }} />
            <div className={styles.cardValue} style={{ fontSize: '1.8rem', margin: 0, position: 'relative', zIndex: 2 }}>98%</div>
          </div>
          <div className={styles.cardLabel}>Match Rate</div>
        </div>

        <div className={styles.particles}>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Foreground Content */}
      <div ref={contentRef} className={styles.content}>
        <ScrollReveal animation="stagger-children" stagger={0.15}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className={styles.label}>{data.label}</span>
            <TextReveal tag="h1" className={styles.headline}>
              {data.headline}
            </TextReveal>
            <p className={styles.subtext}>
              {data.subtext}
            </p>
            <div className={styles.cta}>
              <Button variant="primary" size="lg" href={data.cta.link}>
                {data.cta.text}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <span className={styles.scrollChevron} aria-hidden="true">↓</span>
      </div>
    </section>
  );
}

