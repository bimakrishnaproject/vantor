"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

export default function SplineThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // camera
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2, 
      window.innerWidth / 2, 
      window.innerHeight / 2, 
      window.innerHeight / -2,  
      -50000, 
      10000
    );
    camera.position.set(0, 0, 0);
    camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

    // scene
    const scene = new THREE.Scene();

    // spline scene
    const loader = new SplineLoader();
    loader.load(
      'https://prod.spline.design/ruX4lfWfV2czhL5t/scene.splinecode',
      (splineScene) => {
        scene.add(splineScene);
      }
    );

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Append to container instead of document.body for React compatibility
    container.appendChild(renderer.domElement);

    // scene settings
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    scene.background = new THREE.Color('#000000');
    renderer.setClearAlpha(1);

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;

    function onWindowResize() {
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    function animate() {
      controls.update();
      renderer.render(scene, camera);
    }
    
    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.setAnimationLoop(null);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1,
      }} 
    />
  );
}
