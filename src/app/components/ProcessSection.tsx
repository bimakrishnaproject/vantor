"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Campaign Brief",
    desc: "Define your product, objective, audience, and timeline."
  },
  {
    num: "02",
    title: "Network Selection",
    desc: "KOLS identifies highly relevant pages and segments."
  },
  {
    num: "03",
    title: "Creative Integration",
    desc: "Content is adapted to feel completely native to the platforms."
  },
  {
    num: "04",
    title: "Distribution",
    desc: "Content is seamlessly activated across the KOLS network."
  },
  {
    num: "05",
    title: "Reporting",
    desc: "Advertisers receive totally transparent performance data."
  }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Continuous Parallax & Tilt
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], ["15deg", "0deg", "-15deg"]);
  const translateY = useTransform(smoothProgress, [0, 0.5, 1], ["50px", "0px", "-50px"]);
  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], ["-200px", "0px", "-200px"]);

  return (
    <section ref={containerRef} id="how-it-works" className="w-full min-h-screen relative z-10 overflow-hidden flex items-center" style={{ perspective: "1200px" }}>
      
      <motion.div 
        className="w-full flex flex-col lg:flex-row transform-gpu"
        style={{ rotateX, y: translateY, z: translateZ, transformStyle: "preserve-3d" }}
      >
        {/* Left Empty Side */}
        <div className="hidden lg:block lg:w-1/2 bg-transparent pointer-events-none" />

        {/* Right Solid Content Block */}
        <div
          className="w-full lg:w-1/2 bg-black/95 backdrop-blur-xl border-l border-white/10 min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 relative"
        >
          {/* Background metallic mesh effect limited to the block */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
            className="max-w-xl mx-auto w-full relative z-10 perspective-[1000px]"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, rotateX: 45, y: 40, z: -50, scale: 0.9, transformOrigin: "right center" },
                visible: { opacity: 1, rotateX: 0, y: 0, z: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } }
              }}
              className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-6 text-center lg:text-left drop-shadow-md"
            >
              The Process
            </motion.h2>
            <motion.h3 
              variants={{
                hidden: { opacity: 0, rotateX: 45, y: 40, z: -50, scale: 0.9, transformOrigin: "right center" },
                visible: { opacity: 1, rotateX: 0, y: 0, z: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } }
              }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-offwhite uppercase tracking-tighter text-center lg:text-left mb-16 drop-shadow-lg"
            >
              How we activate audiences at scale
            </motion.h3>

            {/* Vertical Timeline Layout */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-8 left-[1.7rem] md:left-[2.4rem] w-[1px] h-[calc(100%-4rem)] bg-white/10" />

              <div className="flex flex-col gap-12">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, rotateX: 45, y: 40, z: -50, scale: 0.9, transformOrigin: "right center" },
                      visible: { opacity: 1, rotateX: 0, y: 0, z: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
                    }}
                    className="relative z-10 flex flex-row gap-6 md:gap-8 group items-start"
                  >
                    {/* Number Node */}
                    <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 bg-[#111112] border border-white/20 flex items-center justify-center rounded-xl shadow-lg z-10 group-hover:border-accent group-hover:bg-black/60 transition-colors duration-300">
                      <span className="font-display text-xl md:text-3xl text-offwhite tracking-tighter">
                        {step.num}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col pt-1 md:pt-4">
                      <h4 className="font-sans font-semibold text-base md:text-xl text-offwhite mb-2 md:mb-3">
                        {step.title}
                      </h4>
                      <p className="font-sans text-sm md:text-base text-white/50 leading-relaxed pr-4">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
