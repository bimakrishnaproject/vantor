'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WaveGridScene } from './WaveGrid3D';

/**
 * Client-side 3D scene wrapper for the Contact page.
 * Renders an animated wave grid as an ambient background.
 * Uses mounted check to prevent SSR issues.
 */
export function ContactScene3D() {
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
          camera={{ fov: 50, position: [0, 2, 8], near: 0.1, far: 1000 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ background: 'transparent' }}
        >
          <WaveGridScene isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
