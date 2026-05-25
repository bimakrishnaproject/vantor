import { Button } from './Button';
import type { CTA } from '@/types';

interface CTASectionProps {
  title: string;
  subtitle: string;
  cta: CTA;
}

export function CTASection({ title, subtitle, cta }: CTASectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="final-cta">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-vantor-black via-vantor-navy to-vantor-black" />

      {/* Stadium light effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 60%)' }}
      />

      {/* Grid */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-5 md:px-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-subtle mb-6">
          {title}
        </h2>
        <p className="text-vantor-silver text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          {subtitle}
        </p>
        <Button cta={cta} size="lg" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-vantor-black to-transparent" />
    </section>
  );
}
