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

  const valueText = metric.numericValue ? displayValue : metric.value;
  const isLongText = valueText.length > 10;

  return (
    <div ref={ref} className="scoreboard-card card-3d p-6 md:p-8 text-center group hover:border-vantor-blue/30 transition-colors duration-500 flex flex-col justify-center">
      <div className={`text-vantor-blue font-display font-bold mb-2 glow-text card-3d-inner leading-tight break-words hyphens-auto px-2 ${isLongText ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-3xl md:text-4xl lg:text-5xl'}`}>
        {valueText}
      </div>
      <div className="text-vantor-silver text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium mb-2 card-3d-inner px-2">
        {metric.label}
      </div>
      {metric.description && (
        <p className="text-vantor-muted text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 card-3d-inner px-2 mt-2">
          {metric.description}
        </p>
      )}
    </div>
  );
}
