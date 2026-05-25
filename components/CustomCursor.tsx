'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor with blend-mode glow effect — like infracorp.global.
 * Hidden on mobile/touch devices.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    // Smooth trail follow
    function animateTrail() {
      if (!trail) return;
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
      requestAnimationFrame(animateTrail);
    }

    // Scale cursor on hover over interactive elements
    const onEnterInteractive = () => {
      cursor.style.width = '50px';
      cursor.style.height = '50px';
      trail.style.width = '60px';
      trail.style.height = '60px';
    };

    const onLeaveInteractive = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      trail.style.width = '40px';
      trail.style.height = '40px';
    };

    document.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animateTrail);

    // Observe interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    // Show cursor, hide default
    document.body.style.cursor = 'none';
    cursor.style.opacity = '1';
    trail.style.opacity = '1';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = '';
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'rgba(0, 212, 255, 0.9)',
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
          transition: 'width 0.3s ease, height 0.3s ease',
          mixBlendMode: 'screen',
        }}
      />
      {/* Trail glow */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          transition: 'width 0.4s ease, height 0.4s ease',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
