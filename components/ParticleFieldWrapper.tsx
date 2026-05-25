'use client';

import dynamic from 'next/dynamic';

const ParticleField3D = dynamic(
  () => import('./ParticleField3D').then((m) => ({ default: m.ParticleField3D })),
  { ssr: false }
);

/**
 * Client-side wrapper for the ParticleField3D component.
 * Uses dynamic import with ssr: false to prevent server-side rendering
 * of the Three.js canvas.
 */
export function ParticleFieldWrapper() {
  return <ParticleField3D />;
}
