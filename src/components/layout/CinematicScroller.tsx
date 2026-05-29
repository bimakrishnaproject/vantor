"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import styles from "./CinematicScroller.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 120;
const ASSET_PATH = (index: number) =>
  `/assets/frames/frame_${index.toString().padStart(4, "0")}.jpg`;

export interface CinematicBlockData {
  id: string;
  label?: string;
  title: string;
  description: string;
  top: string;
  left: string;
  right?: string;
  transform: string;
  textAlign: "center" | "left" | "right";
  maxWidth?: string;
  startPercent: number; // e.g. 0.15
  endPercent: number | null; // e.g. 0.30 or null to stay
}

interface CinematicScrollerProps {
  blocks: CinematicBlockData[];
}

export default function CinematicScroller({ blocks }: CinematicScrollerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const frameRef = useRef(1);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 1. Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        promises.push(
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = ASSET_PATH(i);
            img.onload = () => resolve(img);
            imagesRef.current[i] = img;
          })
        );
      }
      await Promise.all(promises.slice(0, 20));
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  // 2. Set up Canvas & GSAP
  useEffect(() => {
    if (!sectionRef.current || !canvasRef.current || !imagesLoaded) return;
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameRef.current);
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function renderFrame(index: number) {
      if (!ctx || !canvas) return;
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }

    let animationFrameId: number;
    const sequenceState = { frame: 1 };

    const renderLoop = () => {
      const targetFrame = Math.round(sequenceState.frame);
      if (targetFrame !== frameRef.current && targetFrame > 0 && targetFrame <= TOTAL_FRAMES) {
        frameRef.current = targetFrame;
        renderFrame(targetFrame);
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    blocks.forEach((block, idx) => {
      const ref = blockRefs.current[idx];
      if (!ref) return;

      if (block.startPercent === 0) {
        tl.to(ref, { opacity: 0, duration: 0.1 }, block.endPercent || 0.1);
      } else {
        tl.fromTo(ref, { opacity: 0 }, { opacity: 1, duration: 0.05 }, block.startPercent);
        if (block.endPercent !== null) {
          tl.to(ref, { opacity: 0, duration: 0.05 }, block.endPercent);
        }
      }
    });

    tl.to(
      sequenceState,
      {
        frame: TOTAL_FRAMES,
        ease: "none",
        duration: 1,
      },
      0
    );

    tl.to({}, { duration: 0.2 });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [imagesLoaded, mounted, blocks]);

  const backgroundLayer = (
    <div className={styles.fixedBackgroundLayer}>
      <canvas ref={canvasRef} className={styles.bgCanvas} />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />
    </div>
  );

  return (
    <>
      {mounted && createPortal(backgroundLayer, document.body)}
      <section ref={sectionRef} className={styles.scrollSequence}>
        <div className={styles.stickyContainer}>
          <div className={styles.cinematicContainer}>
            <div className={styles.sideGradient} aria-hidden="true" style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)' }} />
            
            {blocks.map((block, idx) => (
              <div 
                key={block.id}
                ref={(el) => {
                  blockRefs.current[idx] = el;
                }}
                className={styles.cinematicBlock}
                style={{ 
                  opacity: block.startPercent === 0 ? 1 : 0, 
                  top: block.top, 
                  left: block.left, 
                  right: block.right,
                  transform: block.transform, 
                  textAlign: block.textAlign,
                  width: (block.left && block.left !== 'auto' && block.left !== '50%') ? `calc(100% - ${block.left} * 2)` : (block.right && block.right !== 'auto' ? `calc(100% - ${block.right} * 2)` : '100%'),
                  maxWidth: block.maxWidth || '1400px'
                }}
              >
                {block.label && <span className={styles.label}>{block.label}</span>}
                <h2 className={styles.cinematicTitle}>{block.title}</h2>
                <p className={styles.cinematicDesc} style={{ margin: block.textAlign === 'center' ? '0 auto' : (block.textAlign === 'right' ? '0 0 0 auto' : '0') }}>{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
