'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface Scene3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Camera field of view */
  fov?: number;
  /** Camera position */
  cameraPosition?: [number, number, number];
  /** Whether to render on demand only */
  frameloop?: 'always' | 'demand';
  /** Additional Canvas props */
  flat?: boolean;
}

/**
 * Reusable 3D scene wrapper with:
 * - Performance auto-detection
 * - Mobile device pixel ratio capping
 * - Suspense fallback
 * - Proper z-index layering
 */
export function Scene3D({
  children,
  className = '',
  style,
  fov = 60,
  cameraPosition = [0, 0, 5],
  frameloop = 'always',
  flat = true,
}: Scene3DProps) {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    // Cap DPR at 2 for performance, lower on mobile
    const isMobile = window.innerWidth < 768;
    const deviceDpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
    setDpr(deviceDpr);
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={style}>
      <Suspense fallback={null}>
        <Canvas
          dpr={dpr}
          camera={{ fov, position: cameraPosition, near: 0.1, far: 1000 }}
          frameloop={frameloop}
          flat={flat}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ background: 'transparent' }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
