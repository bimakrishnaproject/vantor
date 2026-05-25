'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  showGrid?: boolean;
  delay?: number;
}

export function SectionWrapper({
  children,
  className = '',
  id,
  showGrid = false,
  delay = 0,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    const el = sectionRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;

    gsap.fromTo(
      el.children,
      {
        opacity: 0,
        y: isMobile ? 20 : 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.6 : 0.8,
        stagger: 0.15,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-20 md:py-[var(--spacing-section)] px-5 md:px-10 ${className}`}
    >
      {showGrid && <div className="grid-overlay" aria-hidden="true" />}
      <div className="max-w-[1400px] mx-auto relative">{children}</div>
    </section>
  );
}
