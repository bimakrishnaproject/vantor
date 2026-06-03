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
  title?: string;
  description?: string;
  metrics?: { value: string; label: string }[];
  top: string;
  left: string;
  right?: string;
  transform: string;
  textAlign: "center" | "left" | "right";
  maxWidth?: string;
  startPercent: number; // e.g. 0.15
  endPercent: number | null; // e.g. 0.30 or null to stay
  color?: string;
  className?: string;
}

interface CinematicScrollerProps {
  blocks: CinematicBlockData[];
}

export default function CinematicScroller({ blocks }: CinematicScrollerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoFadeWrapperRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const frameRef = useRef(1);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Smooth loop transition for the idle video using a double-buffered crossfade
  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2) return;

    const videos = [v1, v2];
    let activeIdx = 0;
    let crossfading = false;

    // Initialize styling
    videos[0].style.opacity = "1";
    videos[0].style.zIndex = "2";
    videos[1].style.opacity = "0";
    videos[1].style.zIndex = "1";

    // Play active video, pause inactive video
    videos[0].play().catch(() => {});
    videos[1].pause();

    const crossfadeDuration = 1.5;

    const handleTimeUpdate = (e: Event) => {
      const video = e.currentTarget as HTMLVideoElement;
      const currentActive = videos[activeIdx];

      // Only check for the active video, and if we are not already crossfading
      if (video !== currentActive || crossfading) return;

      const duration = video.duration;
      const currentTime = video.currentTime;
      if (!duration || isNaN(duration)) return;

      if (currentTime > duration - crossfadeDuration) {
        crossfading = true;

        const nextIdx = 1 - activeIdx;
        const activeVideo = videos[activeIdx];
        const inactiveVideo = videos[nextIdx];

        // Prepare next video
        inactiveVideo.currentTime = 0;
        inactiveVideo.style.zIndex = "2";
        activeVideo.style.zIndex = "1";

        const playPromise = inactiveVideo.play();

        const triggerFade = () => {
          gsap.to(inactiveVideo, {
            opacity: 1,
            duration: crossfadeDuration,
            ease: "none",
          });

          gsap.to(activeVideo, {
            opacity: 0,
            duration: crossfadeDuration,
            ease: "none",
            onComplete: () => {
              activeVideo.pause();
              activeVideo.currentTime = 0;
              
              // Move roles to next index
              activeIdx = nextIdx;
              crossfading = false;
            },
          });
        };

        if (playPromise !== undefined) {
          playPromise.then(triggerFade).catch(() => {
            triggerFade();
          });
        } else {
          triggerFade();
        }
      }
    };

    v1.addEventListener("timeupdate", handleTimeUpdate);
    v2.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      v1.removeEventListener("timeupdate", handleTimeUpdate);
      v2.removeEventListener("timeupdate", handleTimeUpdate);
      gsap.killTweensOf(v1);
      gsap.killTweensOf(v2);
    };
  }, [mounted]);

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
    if (!sectionRef.current || !canvasRef.current || !imagesLoaded || !videoFadeWrapperRef.current) return;
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const videoWrapper = videoFadeWrapperRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth || window.innerWidth;
      canvas.height = canvas.clientHeight || window.innerHeight;
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

    // Crossfade from idle video wrapper to canvas
    tl.to(videoWrapper, { opacity: 0, duration: 0.05 }, 0);
    tl.to(canvas, { opacity: 1, duration: 0.05 }, 0);

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
      <div className={styles.videoWrapper}>
        <div ref={videoFadeWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <video
            ref={videoRef1}
            src="/assets/idle_hero.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            className={styles.bgVideo}
            style={{ opacity: 1, zIndex: 2 }}
          />
          <video
            ref={videoRef2}
            src="/assets/idle_hero.mp4"
            muted
            playsInline
            preload="auto"
            className={styles.bgVideo}
            style={{ opacity: 0, zIndex: 1 }}
          />
        </div>
        <canvas 
          ref={canvasRef} 
          className={styles.bgCanvas} 
          style={{ opacity: 0, zIndex: 2 }}
        />
      </div>
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />
      <div className={styles.watermarkBlocker} aria-hidden="true" />
    </div>
  );

  return (
    <>
      {mounted && createPortal(backgroundLayer, document.body)}
      <section ref={sectionRef} className={styles.scrollSequence}>
        <div className={styles.stickyContainer}>
          <div className={styles.cinematicContainer}>
            <div className={styles.sideGradient} aria-hidden="true" style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)' }} />
            
            {blocks.map((block, idx) => (
              <div 
                key={block.id}
                ref={(el) => {
                  blockRefs.current[idx] = el;
                }}
                className={`${styles.cinematicBlock} ${styles[block.id as keyof typeof styles] || ''} ${block.className ? (styles[block.className as keyof typeof styles] || block.className) : ''}`}
                style={{ 
                  opacity: block.startPercent === 0 ? 1 : 0, 
                  top: block.top, 
                  left: block.left, 
                  right: block.right,
                  transform: block.transform, 
                  textAlign: block.textAlign,
                  width: (block.left && block.left !== 'auto' && block.left !== '50%') ? `calc(100% - ${block.left} * 2)` : (block.right && block.right !== 'auto' ? `calc(100% - ${block.right} * 2)` : '100%'),
                  maxWidth: block.maxWidth || '1400px',
                }}
              >
                {block.label && <span className={styles.label} style={{ color: block.color }}>{block.label}</span>}
                {block.title && <h2 className={styles.cinematicTitle} style={{ color: block.color }}>{block.title}</h2>}
                {block.description && <p className={styles.cinematicDesc} style={{ margin: block.textAlign === 'center' ? '0 auto' : (block.textAlign === 'right' ? '0 0 0 auto' : '0'), color: block.color || 'rgba(255, 255, 255, 0.85)' }}>{block.description}</p>}
                
                {block.id === "hero" && (
                  <div className={styles.scrollIndicator}>
                    <span>Scroll to explore</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                )}
                
                {block.metrics && (
                  <>
                    <div className={styles.metricsGrid}>
                      {block.metrics.map((m, i) => (
                        <div key={i} className={styles.metricItem}>
                          <div className={styles.metricValue}>{m.value}</div>
                          <div className={styles.metricLabel}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    {block.id === "pillar4" && (
                      <div className={styles.scoreboardTicker}>
                        <div className={styles.tickerTrack}>
                          <span>• OWNED AUDIENCE INFRASTRUCTURE</span>
                          <span>• REACH THAT CONVERTS</span>
                          <span>• HIGH-CONVERTING PLACEMENTS</span>
                          <span>• SPORTS & ENTERTAINMENT SURFACES</span>
                          <span>• CPM-BASED CAMPAIGNS</span>
                          {/* Duplicate for seamless marquee looping */}
                          <span>• OWNED AUDIENCE INFRASTRUCTURE</span>
                          <span>• REACH THAT CONVERTS</span>
                          <span>• HIGH-CONVERTING PLACEMENTS</span>
                          <span>• SPORTS & ENTERTAINMENT SURFACES</span>
                          <span>• CPM-BASED CAMPAIGNS</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
