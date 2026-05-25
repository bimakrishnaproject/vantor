'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D rotating ring/torus element for the CTA section.
 * Pulsing glow synced with rotation.
 */

function Ring({
  radius,
  tube,
  speed,
  color,
  opacity,
  rotationAxis,
}: {
  radius: number;
  tube: number;
  speed: number;
  color: string;
  opacity: number;
  rotationAxis: 'x' | 'y' | 'z';
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed;
      if (rotationAxis === 'x') ref.current.rotation.x = t;
      else if (rotationAxis === 'y') ref.current.rotation.y = t;
      else ref.current.rotation.z = t;

      // Pulse opacity
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 16, 60]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function CenterGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      const s = 1 + Math.sin(t * 1.5) * 0.15;
      ref.current.scale.setScalar(s);
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + Math.sin(t * 2) * 0.02;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function CTARings3DScene() {
  return (
    <>
      <ambientLight intensity={0.02} />
      {/* Outer ring */}
      <Ring
        radius={2.5}
        tube={0.015}
        speed={0.3}
        color="#00d4ff"
        opacity={0.12}
        rotationAxis="y"
      />
      {/* Middle ring — tilted */}
      <group rotation={[0.5, 0, 0.3]}>
        <Ring
          radius={2}
          tube={0.01}
          speed={0.4}
          color="#00f5d4"
          opacity={0.1}
          rotationAxis="z"
        />
      </group>
      {/* Inner ring — opposite tilt */}
      <group rotation={[-0.3, 0.4, 0]}>
        <Ring
          radius={1.5}
          tube={0.008}
          speed={0.5}
          color="#1e90ff"
          opacity={0.08}
          rotationAxis="x"
        />
      </group>
      <CenterGlow />
    </>
  );
}
