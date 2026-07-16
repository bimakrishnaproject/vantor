"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleVideoRef = useRef<HTMLVideoElement>(null);
  const contentVideoRef = useRef<HTMLVideoElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMoment, setMobileMoment] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isIntroDone, setIsIntroDone] = useState(false);
  
  // OS level reduced motion check
  const prefersReducedMotion = useReducedMotion();

  // Constants for LERP smoothing and intro state
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const globalTargetScroll = useRef(0);
  const globalCurrentScroll = useRef(0);
  const requestRef = useRef<number>(0);
  const isComponentMounted = useRef(true);
  
  // Intro animation refs
  const introState = useRef<'forward' | 'reverse' | 'idle' | 'scrub' | 'content'>('forward');
  const lastTime = useRef<number>(0);
  const virtualTime = useRef<number>(0);
  const pendingState = useRef<'idle' | 'scrub' | 'content' | null>(null);
  const transitionAlpha = useRef<number>(0);

  useEffect(() => {
    isComponentMounted.current = true;
    lastTime.current = Date.now();
    
    // Scroll lock during intro
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const handleResize = () => {
      checkMobile();
      if (window.innerWidth < 768 || prefersReducedMotion) return;
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      // Handle high-DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      
      if (rect) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Manual fallback to ensure videos load even if events fail
    const readyCheck = setInterval(() => {
      if (videoRef.current && videoRef.current.readyState >= 1) {
        setVideoLoaded(true);
        clearInterval(readyCheck);
      }
    }, 200);

    // Failsafe: Unlock scroll and show text if intro takes too long or fails
    const failsafe = setTimeout(() => {
      setIsIntroDone(true);
      document.body.style.overflow = "";
    }, 8000);

    // Desktop Scroll logic
    const handleScroll = () => {
      if (window.innerWidth < 768 || !containerRef.current) return;
      if (introState.current === 'forward' || introState.current === 'reverse') return; // Ignore scroll during intro

      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const scrollY = -rect.top;
      
      let progress = scrollY / scrollHeight;
      targetScroll.current = Math.max(0, Math.min(1, progress));

      // Global progress for content video (starts after Hero finishes)
      const maxGlobalScroll = document.body.scrollHeight - window.innerHeight;
      const contentScrollHeight = maxGlobalScroll - scrollHeight;
      const contentY = window.scrollY - scrollHeight;
      
      if (contentScrollHeight > 0) {
          globalTargetScroll.current = Math.max(0, Math.min(1, contentY / contentScrollHeight));
      } else {
          globalTargetScroll.current = 0;
      }
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    // Desktop Render loop for Video Scrubbing & Intro Animation
    const renderLoop = () => {
      if (!isComponentMounted.current) return;
      
      if (window.innerWidth >= 768 && !prefersReducedMotion) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        if (video && canvas && video.readyState >= 2) {
          const now = Date.now();
          const dt = (now - lastTime.current) / 1000;
          lastTime.current = now;

          // 1. Process Logic based on CURRENT state
          if (introState.current === 'forward') {
            virtualTime.current = video.currentTime; // Keep virtual time in sync
            if (video.currentTime >= video.duration - 0.1) {
              introState.current = 'reverse';
            } else {
              if (video.paused) video.play().catch(() => {});
            }
          } else if (introState.current === 'reverse') {
            if (!video.paused) video.pause();
            // Reverse 4x faster than normal speed
            virtualTime.current = Math.max(0, virtualTime.current - dt * 4.0);
            
            if (virtualTime.current <= 0 && !pendingState.current) {
              pendingState.current = 'idle';
            }
          } else if (introState.current === 'idle') {
            if ((targetScroll.current > 0 || currentScroll.current > 0.005) && !pendingState.current) {
              pendingState.current = 'scrub';
            }
            if (idleVideoRef.current && idleVideoRef.current.paused) {
               idleVideoRef.current.play().catch(() => {});
            }
          } else if (introState.current === 'scrub') {
            if (targetScroll.current <= 0 && currentScroll.current <= 0.005 && !pendingState.current) {
              pendingState.current = 'idle';
            }
            if (targetScroll.current >= 0.99 && !pendingState.current) {
              pendingState.current = 'content';
            }
            
            // LERP the scroll progress for cinematic heaviness
            currentScroll.current += (targetScroll.current - currentScroll.current) * 0.08;
            setScrollProgress(currentScroll.current);
          } else if (introState.current === 'content') {
            if (targetScroll.current < 0.99 && !pendingState.current) {
              pendingState.current = 'scrub';
            }
            // LERP global scroll for the second video
            globalCurrentScroll.current += (globalTargetScroll.current - globalCurrentScroll.current) * 0.08;
          }

          // 2. Process Transition Animation (Dip to Black)
          if (pendingState.current) {
             transitionAlpha.current += (1.05 - transitionAlpha.current) * 0.15; // Fast dip to black
             if (transitionAlpha.current >= 0.99) {
                 transitionAlpha.current = 1.0;
                 introState.current = pendingState.current;
                 pendingState.current = null;
                 
                 if (introState.current === 'idle') {
                    setIsIntroDone(true);
                    document.body.style.overflow = ""; // Unlock scroll
                    if (idleVideoRef.current) idleVideoRef.current.currentTime = 0;
                 } else if (introState.current === 'scrub') {
                    if (idleVideoRef.current) idleVideoRef.current.pause();
                 }
             }
          } else {
             if (transitionAlpha.current > 0.001) {
                 transitionAlpha.current += (0 - transitionAlpha.current) * 0.1; // Smooth fade back in
             } else {
                 transitionAlpha.current = 0;
             }
          }

          const ctx = canvas.getContext("2d");
          if (ctx) {
            let activeVideo = video;
            if (introState.current === 'idle') activeVideo = idleVideoRef.current || video;
            if (introState.current === 'content') activeVideo = contentVideoRef.current || video;

            // ONLY seek and draw if we have data, preventing decoder choking
            if (activeVideo && activeVideo.readyState >= 2 && activeVideo.videoWidth > 0 && activeVideo.videoHeight > 0) {
              try {
              // Object-cover math
              const canvasRatio = canvas.width / canvas.height;
              const videoRatio = activeVideo.videoWidth / activeVideo.videoHeight;
              
              let drawWidth, drawHeight, startX, startY;
              
              if (canvasRatio > videoRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / videoRatio;
                startX = 0;
                startY = (canvas.height - drawHeight) / 2;
              } else {
                drawWidth = canvas.height * videoRatio;
                drawHeight = canvas.height;
                startX = (canvas.width - drawWidth) / 2;
                startY = 0;
              }
              
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Draw Active Video
              ctx.globalAlpha = 1;
              ctx.drawImage(activeVideo, startX, startY, drawWidth, drawHeight);

              // Standard overlay for text readability
              ctx.fillStyle = "rgba(11, 11, 12, 0.4)";
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              // Transition Gradient Overlay (Dip to Dark)
              if (transitionAlpha.current > 0) {
                 ctx.fillStyle = `rgba(11, 11, 12, ${transitionAlpha.current})`;
                 ctx.fillRect(0, 0, canvas.width, canvas.height);
              }

              // AFTER drawing, request the NEXT frame time to prevent decoder choking
              if (introState.current === 'reverse') {
                 activeVideo.currentTime = virtualTime.current;
              } else if (introState.current === 'scrub') {
                 if (!isNaN(activeVideo.duration) && activeVideo.duration > 0) {
                    activeVideo.currentTime = currentScroll.current * activeVideo.duration;
                 }
              } else if (introState.current === 'content' && contentVideoRef.current) {
                 if (!isNaN(contentVideoRef.current.duration) && contentVideoRef.current.duration > 0) {
                    contentVideoRef.current.currentTime = globalCurrentScroll.current * contentVideoRef.current.duration;
                 }
              }
              } catch (err) {
                 console.error("Canvas draw error", err);
              }
            }
          }
        }
      }
      
      requestRef.current = requestAnimationFrame(renderLoop);
    };
    
    if (!isMobile && !prefersReducedMotion) {
      requestRef.current = requestAnimationFrame(renderLoop);
    } else if (isMobile && !prefersReducedMotion) {
      // Mobile auto-play sequence
      const t1 = setTimeout(() => setMobileMoment(1), 2500);
      const t2 = setTimeout(() => setMobileMoment(2), 5000);
      
      return () => {
        isComponentMounted.current = false;
        document.body.style.overflow = "";
        window.removeEventListener("resize", handleResize);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    return () => {
      isComponentMounted.current = false;
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearInterval(readyCheck);
      clearTimeout(failsafe);
    };
  }, [isMobile, prefersReducedMotion]);

  // -------------------------
  // REDUCED MOTION STATIC RENDER
  // -------------------------
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full min-h-screen bg-charcoal flex flex-col justify-center items-center py-32 px-6 gap-8">
        
        <div className="bg-[#111112] p-8 border border-white/10 max-w-md text-left w-full">
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Core Philosophy</h3>
          <p className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-offwhite mb-4 leading-[1.1]">
            Not Just Another<br/>Media Buying Agency
          </p>
          <div className="w-full h-1 bg-accent/30 overflow-hidden">
            <div className="h-full bg-accent w-[45%]" />
          </div>
        </div>

        <div className="bg-[#111112] p-8 border border-white/10 max-w-md text-left w-full">
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Final Proof Point</h3>
          <p className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-offwhite mb-4">
            120M+ Live Network Scale
          </p>
          <div className="w-full h-1 bg-accent/30 overflow-hidden">
            <div className="h-full bg-accent w-full" />
          </div>
        </div>

      </div>
    );
  }

  // -------------------------
  // MOBILE AUTOPLAY RENDER
  // -------------------------
  if (isMobile) {
    return (
      <div className="relative w-full h-[100vh] bg-charcoal overflow-hidden flex flex-col justify-center items-center">
        <video 
          src="/assets/Cinematic_slow_continuous_push.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        />

        {/* Moment 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: mobileMoment === 1 ? 1 : 0, 
            x: mobileMoment === 1 ? 0 : -50 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-start justify-end pb-[25vh] z-10 px-6 pointer-events-none"
        >
          <div className="bg-[#111112]/90 backdrop-blur-md p-6 border border-white/10 w-full max-w-md">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Core Philosophy</h3>
            <p className="font-display text-3xl uppercase tracking-tighter text-offwhite mb-3 leading-[1.1]">
              Not Just Another<br/>Media Buying Agency
            </p>
            <div className="w-full h-1 bg-accent/30 overflow-hidden">
              <div className="h-full bg-accent w-[45%]" />
            </div>
          </div>
        </motion.div>

        {/* Moment 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: mobileMoment === 2 ? 1 : 0, y: mobileMoment === 2 ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-end pb-24 px-6 z-10 pointer-events-none"
        >
          <div className="bg-[#111112]/90 backdrop-blur-md p-6 border border-white/10 w-full">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Final Proof Point</h3>
            <p className="font-display text-3xl uppercase tracking-tighter text-offwhite mb-3">
              120M+ Live Network Scale
            </p>
            <div className="w-full h-1 bg-accent/30 overflow-hidden">
              <div className="h-full bg-accent w-2/3" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------
  // DESKTOP SCROLL RENDER
  // -------------------------
  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-transparent hidden md:block" aria-hidden="true">
      {/* Hidden Video element for source data */}
      <video
        key="cinematic-video"
        ref={videoRef}
        src="/assets/Cinematic_slow_continuous_push.mp4"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="fixed w-0 h-0 opacity-0 pointer-events-none"
        onLoadedData={() => setVideoLoaded(true)}
        onLoadedMetadata={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
      />

      <video
        key="idle-video"
        ref={idleVideoRef}
        src="/assets/idle.mp4"
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="fixed w-0 h-0 opacity-0 pointer-events-none"
      />

      <video
        key="content-video"
        ref={contentVideoRef}
        src="/assets/2_content.mp4"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="fixed w-0 h-0 opacity-0 pointer-events-none"
      />

      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-transparent border-none outline-none ring-0 z-0">
        {/* Render Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 border-none outline-none"
          style={{ width: '100%', height: '100%', opacity: videoLoaded ? 1 : 0 }}
        />

        {/* Bottom Gradient (Soft transition, no hard lines) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent pointer-events-none" />

        {/* Loading / Intro State Fallback */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500"
          style={{ opacity: !isIntroDone && videoLoaded ? 1 : 0 }}
        >
          <div className="flex flex-col items-center">
            {/* You can add an intro text or spinner here if needed */}
          </div>
        </div>

        {/* Text Overlays (Only visible after intro is done) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: isIntroDone ? 1 : 0 }}
        >
          {/* Step 2 & 3 (Now Step 1 since we removed "WE OWN THE AUDIENCES") */}
          <div 
            className="absolute inset-0 flex flex-col justify-end pb-[25vh] px-6 md:px-12 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: scrollProgress <= 0.70 ? 
                       (scrollProgress < 0.15 ? scrollProgress / 0.15 : 
                       (scrollProgress > 0.6 ? 1 - (scrollProgress - 0.6) / 0.1 : 1)) : 0,
              transform: `translateX(${scrollProgress < 0.15 ? -50 : 0}px)`
            }}
          >
            <div className="bg-[#111112]/80 backdrop-blur-md p-6 md:p-8 border border-white/10 max-w-lg">
              <h3 className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Core Philosophy</h3>
              <p className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-offwhite mb-4 leading-[1.1]">
                Not Just Another<br/>Media Buying Agency
              </p>
              <div className="w-full h-1 bg-accent/30 overflow-hidden">
                <div className="h-full bg-accent w-[45%]" />
              </div>
            </div>
          </div>

          {/* Step 4 (Now Step 2) */}
          <div 
            className="absolute inset-0 flex flex-col justify-end pb-32 px-12 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: scrollProgress > 0.70 && scrollProgress < 0.99 ? 
                       (scrollProgress < 0.75 ? (scrollProgress - 0.70) / 0.05 : 
                        scrollProgress > 0.90 ? (0.99 - scrollProgress) / 0.09 : 1) : 0,
              transform: `translateX(${scrollProgress > 0.70 ? 0 : 50}px)`
            }}
          >
            <div className="bg-[#111112]/80 backdrop-blur-md p-8 border border-white/10 max-w-md ml-auto">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Final Proof Point</h3>
              <p className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-offwhite mb-4">
                120M+ Live Network Scale
              </p>
              <div className="w-full h-1 bg-accent/30 overflow-hidden">
                <div className="h-full bg-accent w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
