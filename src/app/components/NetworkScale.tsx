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
    <section className="w-full bg-[#111112] py-24 px-6 md:px-12 border-y border-white/5 relative overflow-hidden">
      {/* Decorative scanning line */}
      <motion.div 
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-accent/20 z-0"
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-16 text-center">
          Network Scale
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <div className="font-sans text-[2.5rem] md:text-6xl lg:text-7xl font-light text-offwhite tracking-tighter mb-2 tabular-nums">
                {stat.value}
                <span className="text-accent font-display text-4xl md:text-5xl lg:text-6xl">{stat.suffix}</span>
              </div>
              <div className="text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
