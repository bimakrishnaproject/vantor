'use client';

interface ScrollingTickerProps {
  items: string[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  separator?: string;
  className?: string;
}

/**
 * Infinite horizontal scrolling ticker strip for social proof / key stats.
 * Pure CSS animation with doubled content for seamless loop.
 */
export function ScrollingTicker({
  items,
  speed = 'normal',
  direction = 'left',
  separator = '✦',
  className = '',
}: ScrollingTickerProps) {
  const durations = { slow: '60s', normal: '40s', fast: '25s' };
  const dur = durations[speed];

  const content = items.flatMap((item, i) => [
    <span key={`item-${i}`} className="text-vantor-white font-display text-sm md:text-base lg:text-lg font-light tracking-wide whitespace-nowrap">
      {item}
    </span>,
    <span key={`sep-${i}`} className="text-vantor-blue text-xs mx-6 md:mx-8">
      {separator}
    </span>,
  ]);

  return (
    <div
      className={`relative overflow-hidden py-5 md:py-6 border-y border-white/5 ${className}`}
      aria-hidden="true"
    >
      {/* Edge fades */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-vantor-black to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-vantor-black to-transparent z-10" />

      <div
        className="flex items-center"
        style={{
          animation: `marquee ${dur} linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {/* Double for seamless loop */}
        <div className="flex items-center shrink-0">{content}</div>
        <div className="flex items-center shrink-0">{content}</div>
      </div>
    </div>
  );
}
