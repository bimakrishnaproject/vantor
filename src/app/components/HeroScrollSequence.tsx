"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMoment, setMobileMoment] = useState(0);
  const [isInView, setIsInView] = useState(true);
  
  // OS level reduced motion check
  const prefersReducedMotion = useReducedMotion();

  // Constants for LERP smoothing
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const requestRef = useRef<number>(0);
  const isComponentMounted = useRef(true);

  // Resize listener refs
  const canvasWidth = useRef(0);
  const canvasHeight = useRef(0);

  useEffect(() => {
    isComponentMounted.current = true;
    
    // Intersection Observer to pause rendering when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const handleResize = () => {
      checkMobile();
      if (window.innerWidth < 768 || prefersReducedMotion) return; // Skip canvas sizing
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      canvasWidth.current = canvas.width;
      canvasHeight.current = canvas.height;
      
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Desktop Scroll logic
    const handleScroll = () => {
      if (window.innerWidth < 768 || !containerRef.current || !isInView) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const scrollHeight = rect.height - window.innerHeight;
      const scrollY = -rect.top;
      
      let progress = scrollY / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      targetScroll.current = progress;
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    // Desktop Render loop
    const renderLoop = () => {
      if (!isComponentMounted.current) return;
      if (window.innerWidth >= 768 && !prefersReducedMotion && isInView) {
        currentScroll.current += (targetScroll.current - currentScroll.current) * 0.08;
        setScrollProgress(currentScroll.current);
        drawCanvas(currentScroll.current);
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
        window.removeEventListener("resize", handleResize);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    return () => {
      isComponentMounted.current = false;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, [isMobile, isInView, prefersReducedMotion]);

  const drawCanvas = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width / (window.devicePixelRatio || 1);
    const ch = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, cw, ch);
    const cx = cw / 2;
    const cy = ch / 2;

    let scale = 1;
    if (progress > 0.25 && progress <= 0.70) {
      const zoomProgress = (progress - 0.25) / 0.45;
      scale = 1 + (Math.pow(zoomProgress, 2) * 3);
    } else if (progress > 0.70) {
      scale = 4;
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);

    ctx.fillStyle = "#0B0B0C";
    ctx.fillRect(0, 0, cw, ch);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    for(let i=0; i<10; i++) {
      ctx.moveTo(cx - (300 + i*50), ch);
      ctx.lineTo(cx - 100, cy + 50);
      ctx.moveTo(cx + (300 + i*50), ch);
      ctx.lineTo(cx + 100, cy + 50);
    }
    
    for(let i=0; i<8; i++) {
      ctx.moveTo(cx - (400 - i*20), 0);
      ctx.lineTo(cx - 150, cy - 80);
      ctx.moveTo(cx + (400 - i*20), 0);
      ctx.lineTo(cx + 150, cy - 80);
    }
    ctx.stroke();

    ctx.fillStyle = "#111112";
    ctx.fillRect(cx - 150, cy - 80, 300, 130);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.strokeRect(cx - 150, cy - 80, 300, 130);

    if (progress > 0.70) {
      const mode = Math.floor(progress * 100) % 2 === 0 ? "rgba(0, 71, 255, 0.8)" : "rgba(230, 0, 0, 0.8)";
      ctx.fillStyle = mode;
      if (Math.random() > 0.1) ctx.fillRect(cx - 148, cy - 78, 296, 126);
    } else {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(cx - 148, cy - 78, 296, 126);
    }

    const gradientLeft = ctx.createLinearGradient(0, ch, cx, cy);
    gradientLeft.addColorStop(0, "rgba(255,255,255,0.05)");
    gradientLeft.addColorStop(1, "transparent");
    ctx.fillStyle = gradientLeft;
    ctx.beginPath();
    ctx.moveTo(0, ch);
    ctx.lineTo(0, ch - 200);
    ctx.lineTo(cx - 150, cy + 50);
    ctx.fill();

    const gradientRight = ctx.createLinearGradient(cw, ch, cx, cy);
    gradientRight.addColorStop(0, "rgba(255,255,255,0.05)");
    gradientRight.addColorStop(1, "transparent");
    ctx.fillStyle = gradientRight;
    ctx.beginPath();
    ctx.moveTo(cw, ch);
    ctx.lineTo(cw, ch - 200);
    ctx.lineTo(cx + 150, cy + 50);
    ctx.fill();

    ctx.restore();
  };

  // -------------------------
  // REDUCED MOTION STATIC RENDER
  // -------------------------
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full min-h-screen bg-charcoal flex flex-col justify-center items-center py-32 px-6">
        <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-none text-offwhite uppercase tracking-tighter text-center mb-12">
          We Own the <br /> Audiences.
        </h1>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-accent uppercase tracking-tighter text-center max-w-3xl mb-16">
          Not Just Another Media Buying Agency.
        </h2>
        <div className="bg-[#111112] p-8 border border-white/10 max-w-md text-center">
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Final Proof Point</h3>
          <p className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-offwhite mb-4">
            120M+ Live Network Scale
          </p>
          <div className="w-full h-1 bg-accent/30 overflow-hidden mx-auto">
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
        {/* Simplified mobile background */}
        <div className="absolute inset-0 bg-charcoal z-0" />
        <motion.div 
          animate={{ scale: mobileMoment >= 1 ? 1.5 : 1, opacity: mobileMoment >= 2 ? 0.3 : 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(230,0,0,0.1),transparent_70%)] z-0"
        />

        {/* Moment 1 */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: mobileMoment > 0 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center z-10 px-6 pointer-events-none"
        >
          <h1 className="font-display text-5xl md:text-7xl leading-none text-offwhite uppercase tracking-tighter text-center">
            We Own the <br /> Audiences.
          </h1>
        </motion.div>

        {/* Moment 2 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: mobileMoment === 1 ? 1 : 0, 
            scale: mobileMoment === 1 ? 1 : 1.1 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center z-10 px-6 pointer-events-none"
        >
          <h2 className="font-display text-4xl leading-[1.1] text-accent uppercase tracking-tighter text-center">
            Not Just Another <br/>Media Buying Agency.
          </h2>
        </motion.div>

        {/* Moment 3 */}
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
    <div ref={containerRef} className="relative w-full h-[500vh] bg-charcoal hidden md:block" aria-hidden="true">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Step 1 */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{
            opacity: scrollProgress <= 0.25 ? (scrollProgress > 0.15 ? 1 - (scrollProgress - 0.15) / 0.1 : 1) : 0,
            transform: `translateY(${scrollProgress * -100}px)`
          }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-none text-offwhite uppercase tracking-tighter text-center">
            We Own the <br /> Audiences.
          </h1>
        </div>

        {/* Step 2 & 3 */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{
            opacity: scrollProgress > 0.25 && scrollProgress <= 0.70 ? 
                     (scrollProgress < 0.35 ? (scrollProgress - 0.25) / 0.1 : 
                     (scrollProgress > 0.6 ? 1 - (scrollProgress - 0.6) / 0.1 : 1)) : 0,
            transform: `scale(${1 + (scrollProgress - 0.25) * 0.5})`
          }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-[5rem] leading-[1.1] text-accent uppercase tracking-tighter text-center max-w-4xl px-6">
            Not Just Another Media Buying Agency.
          </h2>
        </div>

        {/* Step 4 */}
        <div 
          className="absolute inset-0 flex flex-col justify-end pb-32 px-12 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: scrollProgress > 0.70 && scrollProgress <= 1.0 ? 
                     (scrollProgress < 0.75 ? (scrollProgress - 0.70) / 0.05 : 1) : 0,
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
        
        {/* Step 5 */}
        <div 
          className="absolute inset-0 bg-charcoal pointer-events-none"
          style={{
            opacity: scrollProgress > 0.9 ? (scrollProgress - 0.9) / 0.1 : 0
          }}
        />
      </div>
    </div>
  );
}
