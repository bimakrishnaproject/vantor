'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Rotating DNA-like double helix structure for Vertical pages.
 * Adapts color based on the vertical's accent color.
 */

function HelixStrand({
  color,
  offset,
  speed,
  radius,
}: {
  color: string;
  offset: number;
  speed: number;
  radius: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 100; i++) {
      const t = (i / 99) * Math.PI * 6; // 3 full rotations
      const y = (i / 99) * 10 - 5;
      points.push(
        new THREE.Vector3(
          Math.cos(t + offset) * radius,
          y,
          Math.sin(t + offset) * radius
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 100, 0.03, 6, false);
  }, [offset, radius]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function HelixConnectors({
  color,
  radius,
  speed,
}: {
  color: string;
  radius: number;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const connectors = useMemo(() => {
    const geos: { position: [number, number, number]; rotation: [number, number, number]; length: number }[] = [];
    for (let i = 0; i < 20; i++) {
      const t = (i / 19) * Math.PI * 6;
      const y = (i / 19) * 10 - 5;
      geos.push({
        position: [0, y, 0],
        rotation: [0, t, 0],
        length: radius * 2,
      });
    }
    return geos;
  }, [radius]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {connectors.map((conn, i) => (
        <mesh key={i} position={conn.position} rotation={conn.rotation}>
          <boxGeometry args={[conn.length, 0.01, 0.01]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1 + (i % 3) * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function HelixParticles({
  color,
  count = 60,
}: {
  color: string;
  count?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6;
      const y = (i / count) * 10 - 5;
      const r = 1.2 + (Math.random() - 0.5) * 0.8;
      pos[i * 3] = Math.cos(t) * r + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(t) * r + (Math.random() - 0.5) * 0.3;
    }
    return pos;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Map visual theme to accent colors
const themeColors: Record<string, { primary: string; secondary: string }> = {
  concert: { primary: '#ff6b35', secondary: '#ff9f6b' },
  digital: { primary: '#00d4ff', secondary: '#00f5d4' },
  mobile: { primary: '#7c3aed', secondary: '#a78bfa' },
  arena: { primary: '#f59e0b', secondary: '#fbbf24' },
  modular: { primary: '#10b981', secondary: '#34d399' },
};

export function DNAHelixScene({
  visualTheme = 'digital',
  isMobile = false,
}: {
  visualTheme?: string;
  isMobile?: boolean;
}) {
  const colors = themeColors[visualTheme] || themeColors.digital;
  const radius = isMobile ? 0.6 : 0.9;
  const speed = 0.15;

  return (
    <>
      <ambientLight intensity={0.05} />
      <HelixStrand color={colors.primary} offset={0} speed={speed} radius={radius} />
      <HelixStrand color={colors.secondary} offset={Math.PI} speed={speed} radius={radius} />
      <HelixConnectors color={colors.primary} radius={radius} speed={speed} />
      <HelixParticles color={colors.primary} count={isMobile ? 30 : 60} />
    </>
  );
}
