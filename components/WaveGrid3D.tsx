'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated 3D wireframe wave/terrain grid — "Digital Ocean" effect.
 * Used on the Contact page.
 */

function WavePlane({ isMobile = false }: { isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = isMobile ? 30 : 60;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 16, segments, segments);
    return geo;
  }, [segments]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);

      // Multi-layered wave displacement
      const wave1 = Math.sin(x * 0.5 + t * 0.8) * 0.3;
      const wave2 = Math.sin(y * 0.4 + t * 0.6) * 0.2;
      const wave3 = Math.cos((x + y) * 0.3 + t * 1.2) * 0.15;
      const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.6 - t * 1.5) * 0.15;

      posAttr.setZ(i, wave1 + wave2 + wave3 + ripple);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.5, 0, 0]}
      position={[0, -2, -4]}
    >
      <meshBasicMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

function WavePoints({ isMobile = false }: { isMobile?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = isMobile ? 200 : 600;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    return pos;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      // Float particles along the wave surface
      posAttr.array[i * 3 + 1] =
        positions[i * 3 + 1] +
        Math.sin(x * 0.3 + t * 0.5) * 0.3 +
        Math.cos(z * 0.4 + t * 0.3) * 0.2;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#00f5d4"
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function DataStreams() {
  const groupRef = useRef<THREE.Group>(null);

  const streams = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const points: THREE.Vector3[] = [];
      const xBase = (i - 2) * 2.5;
      for (let j = 0; j < 20; j++) {
        const t = j / 19;
        points.push(
          new THREE.Vector3(
            xBase + Math.sin(t * Math.PI * 2) * 0.3,
            t * 6 - 3,
            -5 + Math.cos(t * Math.PI * 3) * 0.5
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      return new THREE.TubeGeometry(curve, 20, 0.01, 4, false);
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.8 + i) * 0.04;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {streams.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00d4ff' : '#00f5d4'}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export function WaveGridScene({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.05} />
      <WavePlane isMobile={isMobile} />
      <WavePoints isMobile={isMobile} />
      {!isMobile && <DataStreams />}
    </>
  );
}
