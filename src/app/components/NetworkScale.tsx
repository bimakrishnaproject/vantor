"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Total Reach", value: "250M+", suffix: "" },
  { label: "Owned Communities", value: "45", suffix: "" },
  { label: "Monthly Impressions", value: "1.2B", suffix: "" },
  { label: "Core Territories", value: "12", suffix: "" },
];

export default function NetworkScale() {
  return (
    <section className="w-full min-h-screen relative z-10 overflow-hidden flex items-center">
      {/* Decorative scanning line */}
      <motion.div 
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-accent/20 z-0"
      />

      <div className="w-full flex flex-col lg:flex-row">
        {/* Left Empty Side */}
        <div className="hidden lg:block lg:w-1/2 bg-transparent pointer-events-none" />

        {/* Right Solid Content Block */}
        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 bg-black/95 backdrop-blur-xl border-l border-white/10 min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24"
        >
          <div className="max-w-xl mx-auto w-full">
            <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-16 text-center lg:text-left drop-shadow-md">
              Network Scale
            </h2>

            <div className="flex flex-col gap-12 divide-y divide-white/5">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
