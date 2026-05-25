'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated number counter hook with intersection observer trigger.
 * Counts from 0 to target value when the element scrolls into view.
 */
export function useCountUp(
  target: number,
  duration: number = 2000,
  prefix: string = '',
  suffix: string = ''
) {
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    function animateCount() {
      const startTime = performance.now();

      function update(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        // Format the number
        let formatted: string;
        if (target >= 1000000000) {
          formatted = `${(current / 1000000000).toFixed(current >= target * 0.99 ? 0 : 1)}B`;
        } else if (target >= 1000000) {
          formatted = `${(current / 1000000).toFixed(current >= target * 0.99 ? 0 : 1)}M`;
        } else if (target >= 1000) {
          formatted = `${(current / 1000).toFixed(current >= target * 0.99 ? 0 : 1)}K`;
        } else if (Number.isInteger(target)) {
          formatted = Math.round(current).toString();
        } else {
          formatted = current.toFixed(1);
        }

        setDisplayValue(`${prefix}${formatted}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }

    return () => observer.disconnect();
  }, [target, duration, prefix, suffix]);

  return { ref, displayValue };
}
