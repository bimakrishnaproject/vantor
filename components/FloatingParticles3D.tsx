'use client';

import { useEffect, useRef } from 'react';

/**
 * CSS-3D floating particles creating depth and movement.
 * Uses pure CSS transforms and animations — no canvas/WebGL.
 */
export function FloatingParticles3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Generate particles
    const count = 40;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = Math.random() * 400 - 200;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * -20;
      const opacity = Math.random() * 0.3 + 0.05;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0,212,255,${opacity + 0.2}) 0%, rgba(0,212,255,0) 70%);
        box-shadow: 0 0 ${size * 3}px rgba(0,212,255,${opacity});
        transform: translate3d(0, 0, ${z}px);
        animation: particle-float-${i % 5} ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
      `;

      particles.push(particle);
      container.appendChild(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}
      aria-hidden="true"
    />
  );
}
