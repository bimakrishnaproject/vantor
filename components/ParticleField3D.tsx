'use client';

import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Persistent floating particle field rendered via Three.js.
 * Appears across every page as a fixed background.
 * - Reactive to scroll position
 * - Mouse interaction on desktop
 * - Performance-optimized with reduced count on mobile
 */

function Particles({ count = 200, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Initialize positions
  const [basePositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, [count]);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 2 + 0.5;
    }
    return arr;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(basePositions), 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [basePositions, sizes]);

  // Mouse tracking
  useEffect(() => {
    if (isMobile) return;
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isMobile]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();
    const scrollY = scrollRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base drift
      posAttr.array[i3] = basePositions[i3] + velocities[i3] * t * 60 + Math.sin(t * 0.1 + i) * 0.5;
      posAttr.array[i3 + 1] = basePositions[i3 + 1] + velocities[i3 + 1] * t * 60 + scrollY * 3;
      posAttr.array[i3 + 2] = basePositions[i3 + 2] + velocities[i3 + 2] * t * 60;

      // Mouse repulsion (desktop only)
      if (!isMobile) {
        const dx = posAttr.array[i3] - mouseRef.current.x * 5;
        const dy = posAttr.array[i3 + 1] - mouseRef.current.y * 5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          const force = (3 - dist) / 3 * 0.15;
          posAttr.array[i3] += (dx / dist) * force;
          posAttr.array[i3 + 1] += (dy / dist) * force;
        }
      }

      // Wrap-around
      if (posAttr.array[i3] > 10) posAttr.array[i3] -= 20;
      if (posAttr.array[i3] < -10) posAttr.array[i3] += 20;
      if (posAttr.array[i3 + 1] > 10) posAttr.array[i3 + 1] -= 20;
      if (posAttr.array[i3 + 1] < -10) posAttr.array[i3 + 1] += 20;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#00d4ff"
        size={0.025}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines({ count = 200, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const posRef = useRef<Float32Array | null>(null);

  const maxConnections = isMobile ? 20 : 50;
  const connectionDistance = 2.5;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(maxConnections * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [maxConnections]);

  useFrame(() => {
    if (!lineRef.current) return;
    // Find the particles points from the parent
    const parent = lineRef.current.parent;
    if (!parent) return;

    const pointsMesh = parent.children.find((c) => c instanceof THREE.Points) as THREE.Points | undefined;
    if (!pointsMesh) return;

    const posAttr = pointsMesh.geometry.attributes.position as THREE.BufferAttribute;
    const linePositions = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;

    let lineIdx = 0;
    for (let i = 0; i < Math.min(count, 60) && lineIdx < maxConnections; i++) {
      for (let j = i + 1; j < Math.min(count, 60) && lineIdx < maxConnections; j++) {
        const dx = posAttr.array[i * 3] - posAttr.array[j * 3];
        const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1];
        const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          linePositions.array[lineIdx * 6] = posAttr.array[i * 3];
          linePositions.array[lineIdx * 6 + 1] = posAttr.array[i * 3 + 1];
          linePositions.array[lineIdx * 6 + 2] = posAttr.array[i * 3 + 2];
          linePositions.array[lineIdx * 6 + 3] = posAttr.array[j * 3];
          linePositions.array[lineIdx * 6 + 4] = posAttr.array[j * 3 + 1];
          linePositions.array[lineIdx * 6 + 5] = posAttr.array[j * 3 + 2];
          lineIdx++;
        }
      }
    }

    // Clear remaining
    for (let i = lineIdx; i < maxConnections; i++) {
      linePositions.array[i * 6] = 0;
      linePositions.array[i * 6 + 1] = 0;
      linePositions.array[i * 6 + 2] = 0;
      linePositions.array[i * 6 + 3] = 0;
      linePositions.array[i * 6 + 4] = 0;
      linePositions.array[i * 6 + 5] = 0;
    }

    linePositions.needsUpdate = true;
    lineRef.current.geometry.setDrawRange(0, lineIdx * 2);
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export function ParticleField3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setDpr(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
  }, []);

  const particleCount = isMobile ? 80 : 200;

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
          camera={{ fov: 60, position: [0, 0, 8], near: 0.1, far: 100 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: false,
          }}
          style={{ background: 'transparent' }}
        >
          <Particles count={particleCount} isMobile={isMobile} />
          {!isMobile && <ConnectionLines count={particleCount} isMobile={isMobile} />}
        </Canvas>
      </Suspense>
    </div>
  );
}

