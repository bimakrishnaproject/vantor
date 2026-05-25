'use client';

import { useRef, useEffect, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  splitBy?: 'char' | 'word';
}

/**
 * Animated text reveal that splits text into characters or words
 * and reveals them with staggered fade + slide animation.
 * Triggers on scroll intersection.
 */
export function TextReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.03,
  splitBy = 'char',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const units = splitBy === 'char' ? text.split('') : text.split(' ');

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Tag className={className} aria-label={text}>
        {units.map((unit, i) => (
          <span
            key={i}
            className="inline-block transition-all"
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.6s',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: isVisible ? `${delay + i * stagger}s` : '0s',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(-80deg)',
              transformOrigin: 'bottom center',
            }}
            aria-hidden="true"
          >
            {unit === ' ' || splitBy === 'word' ? (
              <>
                {unit}
                {splitBy === 'word' && i < units.length - 1 ? '\u00A0' : ''}
              </>
            ) : (
              unit
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
