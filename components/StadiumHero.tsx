'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { Button } from './Button';
import type { HeroContent, Metric } from '@/types';

interface StadiumHeroProps {
  hero: HeroContent;
  metrics?: Metric[];
}

export function StadiumHero({ hero, metrics }: StadiumHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Stadium lights fade in
    tl.fromTo(
      '.stadium-light',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, stagger: 0.2 }
    );

    // Title reveal
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
      '-=0.8'
    );

    // Content slides up
    tl.fromTo(
      contentRef.current?.children ? Array.from(contentRef.current.children) : [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      '-=0.6'
    );

    // Scoreboard metrics pulse
    if (metrics && !isMobile) {
      tl.fromTo(
        '.scoreboard-metric',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );
    }

    // Parallax on scroll (desktop only)
    if (!isMobile) {
      gsap.to('.hero-bg-layer', {
        y: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }, [metrics]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* ===== STADIUM ATMOSPHERE LAYERS ===== */}

      {/* Base dark */}
      <div className="absolute inset-0 bg-vantor-black hero-bg-layer" />

      {/* Arena radial gradient */}
      <div className="absolute inset-0 hero-bg-layer stadium-atmosphere" />

      {/* Top stadium lights */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[400px] stadium-light opacity-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)' }}
      />
      <div className="absolute top-0 right-1/4 w-[300px] h-[400px] stadium-light opacity-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(30,144,255,0.1) 0%, transparent 70%)' }}
      />
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] stadium-light opacity-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 60%)' }}
      />

      {/* Light beams */}
      <div className="absolute top-0 left-[15%] w-[2px] h-[60%] stadium-light opacity-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.3) 0%, transparent 100%)', filter: 'blur(3px)', transform: 'rotate(-5deg)' }}
      />
      <div className="absolute top-0 right-[15%] w-[2px] h-[60%] stadium-light opacity-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.3) 0%, transparent 100%)', filter: 'blur(3px)', transform: 'rotate(5deg)' }}
      />
      <div className="absolute top-0 left-[35%] w-[1px] h-[50%] stadium-light opacity-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,245,212,0.2) 0%, transparent 100%)', filter: 'blur(2px)', transform: 'rotate(-2deg)' }}
      />
      <div className="absolute top-0 right-[35%] w-[1px] h-[50%] stadium-light opacity-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,245,212,0.2) 0%, transparent 100%)', filter: 'blur(2px)', transform: 'rotate(2deg)' }}
      />

      {/* Wide beam washes */}
      <div className="absolute top-[-10%] left-[10%] w-[200px] h-[120%] stadium-light opacity-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.06) 0%, transparent 60%)', filter: 'blur(40px)', transform: 'rotate(-8deg)' }}
      />
      <div className="absolute top-[-10%] right-[10%] w-[200px] h-[120%] stadium-light opacity-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.06) 0%, transparent 60%)', filter: 'blur(40px)', transform: 'rotate(8deg)' }}
      />

      {/* Perspective grid floor */}
      <div className="perspective-grid hero-bg-layer" />

      {/* Grid overlay */}
      <div className="grid-overlay hero-bg-layer" aria-hidden="true" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-vantor-black to-transparent z-10" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-5 md:px-10 pt-20">
        {/* Eyebrow */}
        {hero.eyebrow && (
          <div ref={contentRef}>
            <p className="text-vantor-blue text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-6 md:mb-8">
              {hero.eyebrow}
            </p>
          </div>
        )}

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-6 md:mb-8 gradient-text-subtle"
        >
          {hero.title}
        </h1>

        {/* Subtitle & Description */}
        <div ref={contentRef}>
          <p className="text-lg md:text-xl lg:text-2xl text-vantor-silver font-light leading-relaxed max-w-3xl mx-auto mb-4">
            {hero.subtitle}
          </p>
          {hero.description && (
            <p className="text-sm md:text-base text-vantor-muted font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-12">
              {hero.description}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {hero.primaryCta && <Button cta={hero.primaryCta} size="lg" />}
            {hero.secondaryCta && <Button cta={hero.secondaryCta} size="lg" />}
          </div>
        </div>

        {/* Scoreboard metrics strip */}
        {metrics && metrics.length > 0 && (
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {metrics.slice(0, 5).map((metric, i) => (
              <div
                key={i}
                className="scoreboard-metric scoreboard-card p-4 md:p-5 text-center opacity-0"
              >
                <div className="text-vantor-blue font-display text-2xl md:text-3xl font-bold mb-1">
                  {metric.value}
                </div>
                <div className="text-vantor-muted text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-float">
        <span className="text-vantor-muted text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-vantor-muted/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-vantor-blue rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
