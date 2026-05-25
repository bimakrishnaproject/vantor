'use client';

import { useCountUp } from '@/hooks/useCountUp';
import type { Metric } from '@/types';

interface AnimatedMetricProps {
  metric: Metric;
}

export function AnimatedMetric({ metric }: AnimatedMetricProps) {
  const { ref, displayValue } = useCountUp(
    metric.numericValue || 0,
    2000,
    metric.prefix || '',
    metric.suffix || ''
  );

  return (
    <div ref={ref} className="scoreboard-card p-6 md:p-8 text-center group hover:border-vantor-blue/30 transition-colors duration-500">
      <div className="text-vantor-blue font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2 glow-text">
        {metric.numericValue ? displayValue : metric.value}
      </div>
      <div className="text-vantor-silver text-xs md:text-sm uppercase tracking-[0.15em] font-medium mb-2">
        {metric.label}
      </div>
      {metric.description && (
        <p className="text-vantor-muted text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {metric.description}
        </p>
      )}
    </div>
  );
}
