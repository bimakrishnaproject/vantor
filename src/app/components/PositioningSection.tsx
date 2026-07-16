"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll } from "framer-motion";
import React, { useRef } from "react";

// --- 3D Split Text Helper ---
const SplitText3D = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap gap-x-[0.3em] gap-y-2 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-visible" style={{ perspective: "1000px" }}>
          <motion.span
            className="inline-block transform-gpu"
            style={{ backfaceVisibility: "hidden" }}
            variants={{
              hidden: { opacity: 0, rotateX: -90, y: 50, z: -50 },
              visible: { 
                opacity: 1, 
                rotateX: 0, 
                y: 0, 
                z: 0, 
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
              }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
function TiltCard({ num }: { num: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  const hoverSpring = useSpring(hover, springConfig);

  // Strong rotation
  const rotateX = useTransform(mouseYSpring, [0, 1], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-25deg", "25deg"]);

  // Extreme Parallax Depth Layers
  const cardTranslateZ = useTransform(hoverSpring, [0, 1], [0, -30]);
  const contentTranslateZ = useTransform(hoverSpring, [0, 1], [0, 80]);
  const borderTranslateZ = useTransform(hoverSpring, [0, 1], [0, 40]);

  // Opacities & Scales
  const textOpacity = useTransform(hoverSpring, [0, 1], [0.3, 1]);
  const textScale = useTransform(hoverSpring, [0, 1], [1, 1.1]);
  const glareOpacity = useTransform(hoverSpring, [0, 1], [0, 1]);

  // Dynamic glare positioning
  const glareX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);
  const background = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    hover.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    hover.set(0);
  };

  return (
    <div 
      className="w-full h-full relative" 
      style={{ perspective: "1200px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          z: cardTranslateZ,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full min-h-[100px] md:min-h-[120px] relative flex items-center justify-center cursor-crosshair"
      >
        {/* LAYER 1: Background Plate (Has overflow-hidden for internal effects) */}
        <div className="absolute inset-0 bg-[#0B0B0C] rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
          {/* Dynamic Glare */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              opacity: glareOpacity,
              background 
            }}
          />
          {/* Abstract Grid Pattern for depth reference */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:12px_12px]" />
        </div>

        {/* LAYER 2: Floating Border Frame */}
        <motion.div
          className="absolute inset-3 border border-white/10 rounded-lg pointer-events-none flex items-center justify-center"
          style={{ z: borderTranslateZ, transformStyle: "preserve-3d" }}
        >
          {/* Corner Accents */}
          <div className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t border-l border-white/50" />
          <div className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t border-r border-white/50" />
          <div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b border-l border-white/50" />
          <div className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b border-r border-white/50" />
        </motion.div>

        {/* LAYER 3: 3D Content Number */}
        <motion.div 
          className="relative pointer-events-none"
          style={{ 
            z: contentTranslateZ,
            opacity: textOpacity,
            scale: textScale
          }}
        >
          <span className="font-display text-4xl lg:text-5xl text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            {num}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll position relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress so the 3D rotation feels fluid and premium
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 3D Scroll Transforms (EXTREME 3D): 
  // Enters heavily tilted back/right, pushes incredibly close in the middle, exits tilted forward/left
  const gridRotateX = useTransform(smoothProgress, [0, 0.45, 0.55, 1], ["80deg", "0deg", "0deg", "-80deg"]);
  const gridRotateY = useTransform(smoothProgress, [0, 0.45, 0.55, 1], ["-60deg", "0deg", "0deg", "60deg"]);
  const gridScale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.3, 1.15, 1.15, 0.3]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const gridTranslateZ = useTransform(smoothProgress, [0, 0.45, 0.55, 1], ["-1000px", "50px", "50px", "-1000px"]);
  
  // Parallax Depth for Text Content relative to background
  const textTranslateZ = useTransform(smoothProgress, [0, 0.45, 0.55, 1], ["-50px", "30px", "30px", "-50px"]);
  const textRotateY = useTransform(smoothProgress, [0, 0.45, 0.55, 1], ["-10deg", "0deg", "0deg", "10deg"]);

  // 3D Entrance Variants for Text Content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
    }
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, rotateX: 45, y: 40, z: -50, scale: 0.9, transformOrigin: "left center" },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      y: 0, 
      z: 0, 
      scale: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <section ref={sectionRef} id="network" className="w-full min-h-screen relative z-10 overflow-hidden flex items-center" style={{ perspective: "1200px" }}>
      <div className="w-full flex flex-col lg:flex-row" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Left Solid Content Block */}
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-full lg:w-1/2 bg-black/95 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {/* Apply Text Parallax here */}
          <motion.div 
            className="max-w-xl mx-auto w-full"
            style={{ z: textTranslateZ, rotateY: textRotateY, transformStyle: "preserve-3d" }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.h2 variants={textVariants} className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-8 drop-shadow-md transform-gpu" style={{ backfaceVisibility: "hidden" }}>
              The Network
            </motion.h2>
            
            {/* Split Text 3D Reveal */}
            <motion.div variants={textVariants}>
              <SplitText3D 
                text="Direct access to audiences built around culture, entertainment and sport."
                className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tighter mb-8 drop-shadow-lg text-offwhite"
              />
            </motion.div>
            
            <motion.p variants={textVariants} className="text-white/80 font-sans text-lg md:text-xl leading-relaxed mb-16 drop-shadow-md transform-gpu" style={{ backfaceVisibility: "hidden" }}>
              KOLS operates and activates a proprietary network of high-engagement social communities, giving brands direct access to audiences at scale.
            </motion.p>

            {/* 3D Scroll Perspective Wrapper */}
            <motion.div variants={textVariants} style={{ perspective: "800px" }} className="w-full">
              <motion.div 
                className="grid grid-cols-3 gap-2 aspect-square p-1 rounded-xl overflow-visible"
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                style={{
                  rotateX: gridRotateX,
                  rotateY: gridRotateY,
                  scale: gridScale,
                  opacity: gridOpacity,
                  z: gridTranslateZ,
                  transformStyle: "preserve-3d"
                }}
              >
                {[...Array(9)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="transform-gpu w-full h-full"
                    style={{ backfaceVisibility: "hidden" }}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, rotateY: 15, z: -100 },
                      visible: { opacity: 1, scale: 1, rotateY: 0, z: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
                    }}
                  >
                    <TiltCard num={`0${i + 1}`} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Empty Side (Shows Video) */}
        <div className="hidden lg:block lg:w-1/2 bg-transparent pointer-events-none" />
        
      </div>
    </section>
  );
}
