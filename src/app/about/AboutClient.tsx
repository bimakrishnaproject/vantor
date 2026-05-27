"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./about.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutClientProps {
  data: any;
}

const teamImages = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
];

export default function AboutClient({ data }: AboutClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on quote
    gsap.from(quoteRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      scrollTrigger: {
        trigger: quoteRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    // Staggered float in for team members
    if (teamRef.current) {
      const members = teamRef.current.querySelectorAll(`.${styles.member}`);
      gsap.from(members, {
        y: 100,
        opacity: 0,
        rotationY: 30,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Executive */}
      <section className={`${styles.section} ${styles.execSection}`}>
        <div className={styles.inner}>
          <div className={styles.exec}>
            <div className={`${styles.execPhoto} card-3d`} aria-hidden="true" style={{ position: "relative", overflow: "hidden" }}>
              <Image 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" 
                alt="CEO" 
                fill 
                style={{ objectFit: "cover" }}
                className={styles.execImage}
              />
            </div>
            <div className={styles.execCopy}>
              <span className={styles.label}>Letter from the CEO</span>
              <h1 className={styles.execName}>{data.team.members[0].name}</h1>
              <span className={styles.execTitle}>{data.team.members[0].role}</span>
              <p className={styles.execBio}>
                {data.mission.description}
              </p>
              <p className={styles.execBio}>
                {data.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning / Quote */}
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.centered}`}>
          <blockquote ref={quoteRef} className={styles.quote}>
            &ldquo;Strategic by scale, precise by nature.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Team */}
      <section className={`${styles.section} ${styles.bgSecondary}`}>
        <div className={styles.inner}>
          <ScrollReveal animation="fade-up">
            <SectionHeading label="Our Team" title={data.team.title} />
          </ScrollReveal>
          
          <ScrollReveal animation="stagger-children" stagger={0.15}>
            <div ref={teamRef} className={styles.teamGrid}>
              {data.team.members.map((m: any, i: number) => (
                <div key={m.name} className={`${styles.member} card-3d`} style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className={styles.memberPhoto} aria-hidden="true">
                    <Image 
                      src={teamImages[i % teamImages.length]} 
                      alt={m.name} 
                      fill 
                      style={{ objectFit: "cover" }}
                      className={styles.image}
                    />
                    <div className={styles.photoOverlay} />
                  </div>
                  <div className={styles.memberInfo}>
                    <div className={styles.memberInfoInner}>
                      <h3 className={styles.memberName}>{m.name}</h3>
                      <span className={styles.memberRole}>{m.role}</span>
                      <div className={styles.memberDivider} />
                      <p className={styles.memberBio}>
                        Driving growth, compliance, and global scaling strategies across all verticals.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Network Scale */}
      <section className={`${styles.section} ${styles.bgSecondary}`}>
        <div className={styles.inner}>
          <ScrollReveal animation="fade-up">
            <SectionHeading label="Network" title="Operating at Scale" align="center" />
          </ScrollReveal>
          
          <ScrollReveal animation="stagger-children" stagger={0.1}>
            <div className={styles.scaleGrid}>
              {data.stats.map((s: any, i: number) => (
                <StatCard
                  key={s.label}
                  value={s.value}
                  endValue={s.endValue}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  label={s.label}
                  delay={i * 100}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Partners */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <ScrollReveal animation="fade-up">
            <SectionHeading label="Partners" title={data.partners.title} align="center" />
          </ScrollReveal>
          
          <ScrollReveal animation="stagger-children" stagger={0.1}>
            <div className={styles.partnerGrid}>
              {data.partners.logos.map((p: any, i: number) => (
                <div key={p} className={`${styles.partnerLogo} card-3d`} aria-label={p}>
                  <span className={styles.partnerLogoText}>{p}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
