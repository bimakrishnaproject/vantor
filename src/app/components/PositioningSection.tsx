"use client";

import { motion } from "framer-motion";

export default function PositioningSection() {
  return (
    <section id="network" className="w-full bg-transparent text-offwhite py-32 px-6 md:px-12 relative z-10 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-8 drop-shadow-md">
                The Network
              </h2>
              
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tighter mb-8 drop-shadow-lg">
                Direct access to audiences built around culture, entertainment and sport.
              </h3>
              
              <p className="text-white/80 font-sans text-lg md:text-xl leading-relaxed max-w-lg drop-shadow-md">
                KOLS operates and activates a proprietary network of high-engagement social communities, giving brands direct access to audiences at scale.
              </p>
            </motion.div>
          </div>

          {/* Right Audience Grid Visual - Glassmorphism */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="grid grid-cols-3 grid-rows-3 gap-[1px] bg-white/10 aspect-square lg:aspect-auto lg:h-[600px] p-[1px] rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Grid Items representing audience blocks */}
              {[...Array(9)].map((_, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ backgroundColor: "rgba(230, 0, 0, 0.2)" }}
                  className="bg-black/30 backdrop-blur-md w-full h-full relative group overflow-hidden transition-colors duration-500"
                >
                  {/* Subtle crosshairs in corners for premium tech feel */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Internal abstract representation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-display text-5xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{`0${i + 1}`}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
