"use client";

import { motion } from "framer-motion";

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
  return (
    <section id="how-it-works" className="w-full bg-transparent py-16 md:py-32 px-6 md:px-12 relative z-10 overflow-hidden">
      
      {/* Background metallic mesh effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-24"
        >
          <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-6 text-center drop-shadow-md">
            The Process
          </h2>
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-offwhite uppercase tracking-tighter text-center max-w-3xl mx-auto drop-shadow-lg">
            How we activate audiences at scale
          </h3>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-white/10" />

          {/* Mobile connecting line (runs full height of the stack) */}
          <div className="lg:hidden absolute top-8 left-[1.7rem] w-[1px] h-[calc(100%-4rem)] bg-white/10" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-8">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col lg:flex-col gap-6 lg:gap-0 bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl group transition-colors duration-500 hover:bg-black/40 items-start lg:items-stretch"
              >
                {/* Number Node */}
                <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-xl shadow-lg lg:mb-8 z-10 group-hover:border-accent group-hover:bg-black/60 transition-colors duration-300">
                  <span className="font-display text-xl md:text-3xl text-offwhite tracking-tighter">
                    {step.num}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex flex-col pt-1 lg:pt-0 pb-6 lg:pb-0">
                  <h4 className="font-sans font-semibold text-base md:text-lg text-offwhite mb-2 md:mb-3">
                    {step.title}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed pr-4">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
