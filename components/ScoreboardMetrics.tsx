'use client';

import { AnimatedMetric } from './AnimatedMetric';
import type { Metric } from '@/types';

interface ScoreboardMetricsProps {
  metrics: Metric[];
  title?: string;
  columns?: number;
}

export function ScoreboardMetrics({ metrics, title, columns = 5 }: ScoreboardMetricsProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }[columns] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';

  return (
    <div className="relative">
      {title && (
        <h3 className="text-center text-vantor-muted text-xs md:text-sm uppercase tracking-[0.3em] font-medium mb-8 md:mb-12">
          {title}
        </h3>
      )}
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {metrics.map((metric, i) => (
          <AnimatedMetric key={i} metric={metric} />
        ))}
      </div>
    </div>
  );
}
