'use client';

import { useState } from 'react';
import type { CaseStudy } from '@/types';
import { AnimatedMetric } from './AnimatedMetric';

interface ExpandableCaseStudyProps {
  caseStudy: CaseStudy;
}

export function ExpandableCaseStudy({ caseStudy }: ExpandableCaseStudyProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      id={`case-study-${caseStudy.id}`}
      className="scoreboard-card overflow-hidden transition-all duration-500"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 md:p-8 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors duration-300"
        aria-expanded={isExpanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-vantor-blue text-[10px] md:text-xs uppercase tracking-widest font-semibold">
              {caseStudy.vertical}
            </span>
            <span className="w-1 h-1 rounded-full bg-vantor-muted" />
            <span className="text-vantor-muted text-[10px] md:text-xs">
              {caseStudy.client}
            </span>
          </div>
          <h4 className="font-display text-lg md:text-xl font-bold text-vantor-white truncate">
            {caseStudy.title}
          </h4>
        </div>

        {/* Expand/collapse icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full border border-vantor-blue/30 flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'bg-vantor-blue/10 rotate-180' : ''
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-vantor-blue" />
          </svg>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5">
          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h5 className="text-vantor-blue text-xs uppercase tracking-widest font-semibold mb-3">
                Challenge
              </h5>
              <p className="text-vantor-silver text-sm leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div>
              <h5 className="text-vantor-cyan text-xs uppercase tracking-widest font-semibold mb-3">
                Solution
              </h5>
              <p className="text-vantor-silver text-sm leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8">
            <h5 className="text-vantor-white text-xs uppercase tracking-widest font-semibold mb-4">
              Results
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {caseStudy.results.map((metric, i) => (
                <AnimatedMetric key={i} metric={metric} />
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <blockquote className="mt-8 pl-4 border-l-2 border-vantor-blue/30">
              <p className="text-vantor-silver text-sm italic leading-relaxed">
                &ldquo;{caseStudy.testimonial}&rdquo;
              </p>
              <cite className="text-vantor-muted text-xs mt-2 block not-italic">
                — {caseStudy.client}
              </cite>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
