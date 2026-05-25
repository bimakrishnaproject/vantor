'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { Button } from './Button';
import type { HeroContent } from '@/types';

interface VerticalHeroProps {
  hero: HeroContent;
  visualTheme: string;
}

const themeGradients: Record<string, { primary: string; secondary: string }> = {
  concert: { primary: 'rgba(255,107,53,0.12)', secondary: 'rgba(255,107,53,0.05)' },
  digital: { primary: 'rgba(0,212,255,0.12)', secondary: 'rgba(0,212,255,0.05)' },
  mobile: { primary: 'rgba(124,58,237,0.12)', secondary: 'rgba(124,58,237,0.05)' },
  arena: { primary: 'rgba(245,158,11,0.12)', secondary: 'rgba(245,158,11,0.05)' },
  modular: { primary: 'rgba(16,185,129,0.12)', secondary: 'rgba(16,185,129,0.05)' },
};

export function VerticalHero({ hero, visualTheme }: VerticalHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = themeGradients[visualTheme] || themeGradients.digital;

  useGSAP((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.v-hero-light', { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.15 });
    tl.fromTo('.v-hero-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.6');
    tl.fromTo('.v-hero-content', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.4');
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-vantor-black" />

      {/* Theme-specific lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] v-hero-light opacity-0"
        style={{ background: `radial-gradient(ellipse at center, ${colors.primary} 0%, transparent 60%)` }}
      />
      <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] v-hero-light opacity-0"
        style={{ background: `radial-gradient(ellipse at center, ${colors.secondary} 0%, transparent 60%)` }}
      />
      <div className="absolute top-[-10%] right-[20%] w-[400px] h-[400px] v-hero-light opacity-0"
        style={{ background: `radial-gradient(ellipse at center, ${colors.secondary} 0%, transparent 60%)` }}
      />

      {/* Grid */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-vantor-black to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-5 md:px-10 pt-28 md:pt-32">
        {hero.eyebrow && (
          <p className="v-hero-content text-vantor-blue text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-6">
            {hero.eyebrow}
          </p>
        )}
        <h1 className="v-hero-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] mb-6 gradient-text-subtle">
          {hero.title}
        </h1>
        <p className="v-hero-content text-lg md:text-xl text-vantor-silver font-light leading-relaxed max-w-2xl mx-auto mb-10">
          {hero.subtitle}
        </p>
        {hero.primaryCta && (
          <div className="v-hero-content">
            <Button cta={hero.primaryCta} size="lg" />
          </div>
        )}
      </div>
    </section>
  );
}
