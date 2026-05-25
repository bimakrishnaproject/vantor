import Link from 'next/link';
import type { ServicePreview } from '@/types';

interface ServiceCardProps {
  service: ServicePreview;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link
      href={`/verticals/${service.slug}`}
      id={`service-card-${service.slug}`}
      className="group relative scoreboard-card card-3d p-6 md:p-8 overflow-hidden hover:border-vantor-blue/30 transition-all duration-500 hover:-translate-y-1"
      style={{ '--accent': service.accentColor } as React.CSSProperties}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${service.accentColor}15 0%, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
        }}
      />

      {/* Icon */}
      <div className="text-4xl md:text-5xl mb-4 relative z-10 card-3d-inner">{service.icon}</div>

      {/* Title */}
      <h3 className="font-display text-xl md:text-2xl font-bold text-vantor-white mb-2 relative z-10 group-hover:text-vantor-blue transition-colors duration-300 card-3d-inner">
        {service.title}
      </h3>

      {/* Tagline */}
      <p className="text-vantor-muted text-sm leading-relaxed relative z-10 mb-6 card-3d-inner">
        {service.tagline}
      </p>

      {/* Arrow CTA */}
      <div className="flex items-center gap-2 text-vantor-blue text-sm font-medium relative z-10 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 card-3d-inner">
        Explore
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Index number */}
      <div className="absolute bottom-4 right-5 text-vantor-charcoal font-display text-6xl md:text-7xl font-bold select-none pointer-events-none">
        0{index + 1}
      </div>
    </Link>
  );
}
