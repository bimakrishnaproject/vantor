"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Total Reach", value: "250M+", suffix: "" },
  { label: "Owned Communities", value: "45", suffix: "" },
  { label: "Monthly Impressions", value: "1.2B", suffix: "" },
  { label: "Core Territories", value: "12", suffix: "" },
];

export default function NetworkScale() {
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
    <section ref={containerRef} className="w-full min-h-screen relative z-10 overflow-hidden flex items-center" style={{ perspective: "1200px" }}>
      {/* Decorative scanning line */}
      <motion.div 
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-accent/20 z-0"
      />

      <motion.div 
        className="w-full flex flex-col lg:flex-row transform-gpu"
        style={{ rotateX, y: translateY, z: translateZ, transformStyle: "preserve-3d" }}
      >
        {/* Left Empty Side */}
        <div className="hidden lg:block lg:w-1/2 bg-transparent pointer-events-none" />

        {/* Right Solid Content Block */}
        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="w-full lg:w-1/2 bg-black/95 backdrop-blur-xl border-l border-white/10 min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24"
        >
          <div className="max-w-xl mx-auto w-full">
            <motion.h2 
              initial={{ opacity: 0, rotateX: 45, y: 40, z: -50, scale: 0.9, transformOrigin: "left center" }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-16 text-center lg:text-left drop-shadow-md"
            >
              Network Scale
            </motion.h2>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
              className="flex flex-col gap-12 divide-y divide-white/5 perspective-[1000px]"
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, rotateX: 45, y: 40, z: -50, scale: 0.9, transformOrigin: "right center" },
                    visible: { opacity: 1, rotateX: 0, y: 0, z: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
                  }}
                  className="flex flex-col lg:flex-row lg:items-center justify-between pt-12 first:pt-0"
                >
                  <div className="text-white/80 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold mb-2 lg:mb-0 drop-shadow-md">
                    {stat.label}
                  </div>
                  <div className="font-sans text-[2.5rem] md:text-6xl font-light text-offwhite tracking-tighter tabular-nums drop-shadow-lg text-left lg:text-right">
                    {stat.value}
                    <span className="text-accent font-display text-4xl md:text-5xl drop-shadow-md">{stat.suffix}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
