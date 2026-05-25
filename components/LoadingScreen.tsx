'use client';

import { useState, useEffect, useRef } from 'react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate progress from 0 to 100
    const duration = 2200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDismissed(true), 400);
        setTimeout(() => setHidden(true), 1200);
      }
    }

    requestAnimationFrame(tick);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-vantor-black transition-opacity duration-700 ${
        dismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D rotating ring */}
      <div className="relative w-32 h-32 mb-10" style={{ perspective: '600px' }}>
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-vantor-blue/20"
          style={{
            animation: 'loader-ring-1 3s linear infinite',
            transformStyle: 'preserve-3d',
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute inset-3 rounded-full border border-vantor-cyan/30"
          style={{
            animation: 'loader-ring-2 2.5s linear infinite reverse',
            transformStyle: 'preserve-3d',
          }}
        />
        {/* Core ring */}
        <div
          className="absolute inset-6 rounded-full border border-stadium-glow/20"
          style={{
            animation: 'loader-ring-3 2s linear infinite',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Progress text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-vantor-blue font-display text-2xl font-bold tabular-nums">
            {progress}
          </span>
        </div>
      </div>

      {/* Logo SVG with path draw */}
      <svg
        ref={svgRef}
        viewBox="0 0 200 24"
        fill="none"
        className="w-48 h-6 mb-6"
      >
        <text
          x="100"
          y="18"
          textAnchor="middle"
          className="font-display text-[20px] font-bold"
          fill="none"
          stroke="url(#loader-gradient)"
          strokeWidth="0.5"
          strokeDasharray="200"
          style={{
            strokeDashoffset: 200 - progress * 2,
            transition: 'stroke-dashoffset 0.1s ease-out',
          }}
        >
          VANTOR VENTURES
        </text>
        <text
          x="100"
          y="18"
          textAnchor="middle"
          className="font-display text-[20px] font-bold"
          fill="url(#loader-gradient)"
          opacity={progress > 80 ? (progress - 80) / 20 : 0}
          style={{ transition: 'opacity 0.3s ease-out' }}
        >
          VANTOR VENTURES
        </text>
        <defs>
          <linearGradient id="loader-gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="50%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#00f5d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Progress bar */}
      <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-vantor-blue to-vantor-cyan rounded-full transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tagline */}
      <p
        className="text-vantor-muted text-[10px] tracking-[0.4em] uppercase mt-4 transition-opacity duration-500"
        style={{ opacity: progress > 50 ? 1 : 0 }}
      >
        Reach That Converts
      </p>
    </div>
  );
}
