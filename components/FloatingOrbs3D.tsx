'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Beautiful floating, pulsing orbs with glassmorphism-like materials.
 * Used on the About page.
 */

function Orb({
  position,
  scale,
  speed,
  offset,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(t * 0.7) * 0.8;
      meshRef.current.position.y = position[1] + Math.sin(t) * 1.2;
      meshRef.current.position.z = position[2] + Math.cos(t * 0.5) * 0.5;
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      const s = scale + Math.sin(t * 2) * 0.1;
      meshRef.current.scale.setScalar(s);
    }
    if (wireRef.current) {
      wireRef.current.position.x = position[0] + Math.sin(t * 0.7) * 0.8;
      wireRef.current.position.y = position[1] + Math.sin(t) * 1.2;
      wireRef.current.position.z = position[2] + Math.cos(t * 0.5) * 0.5;
      wireRef.current.rotation.x = t * 0.2;
      wireRef.current.rotation.y = t * 0.3;
      const s = scale + Math.sin(t * 2) * 0.1;
      wireRef.current.scale.setScalar(s);
    }
  });

  return (
    <>
      {/* Solid translucent orb */}
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh ref={wireRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </>
  );
}

function FloatingRing({
  position,
  radius,
  speed,
  offset,
}: {
  position: [number, number, number];
  radius: number;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.rotation.x = t;
      ref.current.rotation.z = t * 0.5;
      ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.02, 8, 40]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} />
    </mesh>
  );
}

export function FloatingOrbsScene({ isMobile = false }: { isMobile?: boolean }) {
  const orbCount = isMobile ? 5 : 10;
  const ringCount = isMobile ? 2 : 4;

  const orbs = useMemo(
    () =>
      Array.from({ length: orbCount }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 8 - 3,
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.3 + 0.15,
        offset: i * 1.5,
        color: i % 3 === 0 ? '#00f5d4' : i % 3 === 1 ? '#00d4ff' : '#f59e0b',
      })),
    [orbCount]
  );

  const rings = useMemo(
    () =>
      Array.from({ length: ringCount }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          -3 - Math.random() * 4,
        ] as [number, number, number],
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        offset: i * 2,
      })),
    [ringCount]
  );

  return (
    <>
      <ambientLight intensity={0.05} />
      {orbs.map((orb, i) => (
        <Orb key={`orb-${i}`} {...orb} />
      ))}
      {rings.map((ring, i) => (
        <FloatingRing key={`ring-${i}`} {...ring} />
      ))}
    </>
  );
}
