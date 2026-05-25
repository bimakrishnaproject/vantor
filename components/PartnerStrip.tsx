import type { Partner } from '@/types';

interface PartnerStripProps {
  partners: Partner[];
}

export function PartnerStrip({ partners }: PartnerStripProps) {
  // Double the array for seamless loop
  const doubled = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden py-8" id="partner-strip">
      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-vantor-black to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-vantor-black to-transparent z-10" />

      {/* Marquee */}
      <div className="flex animate-marquee">
        {doubled.map((partner, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
          >
            <div className="glass-panel px-8 py-4 text-vantor-muted text-sm md:text-base font-medium tracking-wider hover:text-vantor-silver hover:border-vantor-blue/20 transition-all duration-300 whitespace-nowrap">
              {partner.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
