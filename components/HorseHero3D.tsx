'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural 3D wireframe horse built from geometry primitives.
 * Features:
 * - Glowing cyan wireframe matching Vantor blue theme
 * - Subtle galloping animation via rotation
 * - Particle dust trail
 * - Mouse-reactive camera tilt
 */

/* ─── Horse Body Parts ─── */

function HorseBody() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    // Main torso — elongated box
    const geo = new THREE.BoxGeometry(2.4, 1.0, 0.9, 6, 4, 4);
    // Slightly round the top
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const z = positions.getZ(i);
      if (y > 0.3) {
        positions.setY(i, y + Math.sin(positions.getX(i) * 0.8) * 0.15);
      }
      // Taper the rear
      const x = positions.getX(i);
      if (x < -0.8) {
        const taperFactor = 1 - ((-x - 0.8) / 0.4) * 0.15;
        positions.setY(i, y * taperFactor);
        positions.setZ(i, z * taperFactor);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0.5, 0]}>
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function HorseNeck() {
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.3, 0.45, 1.4, 8, 4);
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={[1.2, 1.3, 0]} rotation={[0, 0, 0.6]}>
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function HorseHead() {
  const groupRef = useRef<THREE.Group>(null);

  const headGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(0.9, 0.45, 0.4, 4, 3, 3);
    // Taper the nose
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      if (x > 0.2) {
        const taperFactor = 1 - ((x - 0.2) / 0.25) * 0.3;
        positions.setY(i, positions.getY(i) * Math.max(taperFactor, 0.5));
        positions.setZ(i, positions.getZ(i) * Math.max(taperFactor, 0.5));
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Ears
  const earGeo = useMemo(() => new THREE.ConeGeometry(0.06, 0.2, 4), []);

  return (
    <group ref={groupRef} position={[1.9, 2.1, 0]} rotation={[0, 0, -0.2]}>
      <mesh geometry={headGeo}>
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Ears */}
      <mesh geometry={earGeo} position={[-0.1, 0.3, 0.12]}>
        <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh geometry={earGeo} position={[-0.1, 0.3, -0.12]}>
        <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function HorseLeg({
  position,
  phaseOffset,
}: {
  position: [number, number, number];
  phaseOffset: number;
}) {
  const upperRef = useRef<THREE.Group>(null);
  const lowerRef = useRef<THREE.Mesh>(null);

  const upperGeo = useMemo(() => new THREE.CylinderGeometry(0.12, 0.1, 0.7, 6), []);
  const lowerGeo = useMemo(() => new THREE.CylinderGeometry(0.1, 0.07, 0.65, 6), []);
  const hoofGeo = useMemo(() => new THREE.BoxGeometry(0.12, 0.08, 0.14, 2, 2, 2), []);

  useFrame(({ clock }) => {
    if (upperRef.current && lowerRef.current) {
      const t = clock.getElapsedTime() * 1.5 + phaseOffset;
      // Gallop-like motion
      upperRef.current.rotation.z = Math.sin(t) * 0.25;
      lowerRef.current.rotation.z = Math.sin(t + 0.8) * 0.15 + 0.05;
    }
  });

  return (
    <group position={position}>
      <group ref={upperRef}>
        <mesh geometry={upperGeo} position={[0, -0.35, 0]}>
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
        </mesh>
        <group position={[0, -0.7, 0]}>
          <group ref={lowerRef}>
            <mesh geometry={lowerGeo} position={[0, -0.32, 0]}>
              <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
            </mesh>
            {/* Hoof */}
            <mesh geometry={hoofGeo} position={[0, -0.68, 0]}>
              <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.45} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function HorseTail() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      pts.push(
        new THREE.Vector3(
          -t * 0.8,
          -t * 0.6 + Math.sin(t * Math.PI) * 0.2,
          0
        )
      );
    }
    return pts;
  }, []);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 12, 0.04, 6, false);
  }, [points]);

  const tailRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.15;
      tailRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 1.5 + 1) * 0.1;
    }
  });

  return (
    <mesh ref={tailRef} geometry={geometry} position={[-1.2, 0.8, 0]}>
      <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

/* ─── Dust Particles ─── */

function DustParticles({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Start around the horse's hooves
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = Math.random() * 0.3 - 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;

      vel[i * 3] = (Math.random() - 0.7) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3] += velocities[i * 3];
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset particles that float too high
      if (posAttr.array[i * 3 + 1] > 1) {
        posAttr.array[i * 3] = (Math.random() - 0.5) * 4;
        posAttr.array[i * 3 + 1] = Math.random() * 0.3 - 1.5;
        posAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#00d4ff"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Grid Floor ─── */

function GridFloor() {
  return (
    <group position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[20, 30, '#00d4ff', '#00d4ff']}
        rotation={[Math.PI / 2, 0, 0]}
        material-transparent
        material-opacity={0.06}
      />
    </group>
  );
}

/* ─── Glow Orbs ─── */

function GlowOrbs() {
  const orbData = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 + 1,
          (Math.random() - 0.5) * 6 - 2,
        ] as [number, number, number],
        scale: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.3,
        offset: i * 1.2,
      })),
    []
  );

  return (
    <>
      {orbData.map((orb, i) => (
        <GlowOrb key={i} {...orb} />
      ))}
    </>
  );
}

function GlowOrb({
  position,
  scale,
  speed,
  offset,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.y = position[1] + Math.sin(t) * 0.5;
      ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.3;
      ref.current.scale.setScalar(scale + Math.sin(t * 1.5) * 0.05);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.08}
        wireframe
      />
    </mesh>
  );
}

/* ─── Mouse-Reactive Camera ─── */

function CameraRig() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(({ camera }) => {
    // Subtle tilt based on mouse position
    camera.position.x += (mouseRef.current.x * 0.8 - camera.position.x) * 0.02;
    camera.position.y += (-mouseRef.current.y * 0.4 + 1.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0.3, 0);
  });

  return null;
}

/* ─── Ambient Light Beams ─── */

function LightBeams() {
  const beamGeo = useMemo(() => new THREE.PlaneGeometry(0.05, 8), []);

  return (
    <>
      <mesh geometry={beamGeo} position={[-3, 2, -4]} rotation={[0, 0, 0.15]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.04} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh geometry={beamGeo} position={[3, 2, -4]} rotation={[0, 0, -0.15]}>
        <meshBasicMaterial color="#1e90ff" transparent opacity={0.03} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh geometry={beamGeo} position={[0.5, 2, -5]} rotation={[0, 0, 0.05]}>
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.025} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  );
}

/* ─── Main Horse Assembly ─── */

export function HorseModel({ isMobile = false }: { isMobile?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle whole-body breathing/sway animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05 + 0.2;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.03;
    }
  });

  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.1} />

      <group ref={groupRef} scale={isMobile ? 0.7 : 1} position={[0, -0.2, 0]}>
        <HorseBody />
        <HorseNeck />
        <HorseHead />

        {/* Front legs */}
        <HorseLeg position={[0.7, 0, 0.25]} phaseOffset={0} />
        <HorseLeg position={[0.7, 0, -0.25]} phaseOffset={Math.PI} />

        {/* Back legs */}
        <HorseLeg position={[-0.8, 0, 0.25]} phaseOffset={Math.PI * 0.5} />
        <HorseLeg position={[-0.8, 0, -0.25]} phaseOffset={Math.PI * 1.5} />

        <HorseTail />
      </group>

      <DustParticles count={isMobile ? 30 : 80} />
      <GlowOrbs />
      <GridFloor />
      <LightBeams />
    </>
  );
}
