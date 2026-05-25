'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingOrbsScene } from './FloatingOrbs3D';

/**
 * Client-side 3D scene wrapper for the About page.
 * Renders floating glassmorphism orbs as an ambient background.
 * Uses mounted check to prevent SSR issues.
 */
export function AboutScene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setDpr(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={dpr}
          camera={{ fov: 55, position: [0, 0, 8], near: 0.1, far: 1000 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ background: 'transparent' }}
        >
          <FloatingOrbsScene isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
