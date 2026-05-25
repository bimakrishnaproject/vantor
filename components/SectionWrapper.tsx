'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  showGrid?: boolean;
}

export function SectionWrapper({
  children,
  className = '',
  id,
  showGrid = false,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    const section = sectionRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    if (!section || !scrollWrapper) return;

    const isMobile = window.innerWidth < 768;

    // 1. Cinematic 3D Scrub Entrance (Tunnel Effect)
    gsap.fromTo(
      scrollWrapper,
      {
        scale: isMobile ? 0.95 : 0.8,
        opacity: 0,
        rotateX: isMobile ? 5 : 15,
        z: -400,
        y: 100,
      },
      {
        scale: 1,
        opacity: 1,
        rotateX: 0,
        z: 0,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom', // Start animation when top of section hits bottom of viewport
          end: 'top 30%',      // End animation when top of section reaches 30% from top of viewport
          scrub: 1,            // Smooth 1-second scrub catch-up
        },
      }
    );

    // 2. Interactive Mouse Parallax (Desktop Only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxWrapperRef.current) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 8; // Max 4 degrees tilt
      const yPos = (clientY / window.innerHeight - 0.5) * -8;

      gsap.to(parallaxWrapperRef.current, {
        rotateY: xPos,
        rotateX: yPos,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-20 md:py-[var(--spacing-section)] px-5 md:px-10 ${className}`}
      style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={scrollWrapperRef} 
        className="w-full h-full will-change-transform origin-bottom"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div 
          ref={parallaxWrapperRef}
          className="w-full h-full will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {showGrid && <div className="grid-overlay" aria-hidden="true" />}
          <div className="max-w-[1400px] mx-auto relative">{children}</div>
        </div>
      </div>
    </section>
  );
}
