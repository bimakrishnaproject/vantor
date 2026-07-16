"use client";

import { motion } from "framer-motion";

export default function PositioningSection() {
  return (
    <section id="network" className="w-full min-h-screen relative z-10 overflow-hidden flex items-center">
      <div className="w-full flex flex-col lg:flex-row">
        
        {/* Left Solid Content Block */}
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 bg-black/95 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24"
        >
          <div className="max-w-xl mx-auto w-full">
            <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-8 drop-shadow-md">
              The Network
            </h2>
            
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tighter mb-8 drop-shadow-lg text-offwhite">
              Direct access to audiences built around culture, entertainment and sport.
            </h3>
            
            <p className="text-white/80 font-sans text-lg md:text-xl leading-relaxed mb-16 drop-shadow-md">
              KOLS operates and activates a proprietary network of high-engagement social communities, giving brands direct access to audiences at scale.
            </p>

            {/* Redesigned Audience Grid Visual (Vertical Stack) */}
            <div className="grid grid-cols-3 gap-[1px] bg-white/10 aspect-[3/1] p-[1px] rounded-xl overflow-hidden shadow-2xl">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="bg-[#111112] w-full h-full relative group overflow-hidden transition-colors duration-500 hover:bg-black/60"
                >
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-display text-4xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{`0${i + 1}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Empty Side (Shows Video) */}
        <div className="hidden lg:block lg:w-1/2 bg-transparent pointer-events-none" />
        
      </div>
    </section>
  );
}
