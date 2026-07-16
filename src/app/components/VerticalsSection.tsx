"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const verticals = [
  {
    title: "Sports",
    desc: "Global football, motorsport, and combat sports audiences. Activating the most passionate fan bases.",
    metric: "45M+ Fans",
  },
  {
    title: "Entertainment & Music",
    desc: "Culture-defining audiences across digital platforms. We connect brands directly with creators and events.",
    metric: "30M+ Listeners",
  },
  {
    title: "Audio",
    desc: "Premium podcast and digital radio networks. High-retention audio storytelling formats.",
    metric: "15M+ Monthly Streams",
  },
  {
    title: "Mobile Apps",
    desc: "In-app integrations and targeted user acquisition across lifestyle, utility, and gaming applications.",
    metric: "10M+ Installs",
  },
  {
    title: "eCommerce",
    desc: "High-intent shopping audiences and shoppable content strategies driving direct conversion.",
    metric: "$50M+ GMV",
  },
  {
    title: "Gaming",
    desc: "Compliant, high-value acquisition networks focused on iGaming, esports, and casual players.",
    metric: "5M+ Players",
  }
];

export default function VerticalsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="verticals" className="w-full min-h-screen relative z-10 overflow-hidden flex items-center justify-center">
      
      {/* Background Doors (Slide in to form a full solid block) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        <motion.div 
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-1/2 h-full bg-black/95 backdrop-blur-xl border-r border-white/5"
        />
        <motion.div 
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-1/2 h-full bg-black/95 backdrop-blur-xl border-l border-white/5"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 md:gap-8">
          <div>
            <h2 className="text-accent uppercase tracking-widest text-[10px] md:text-sm font-semibold mb-2 md:mb-4 drop-shadow-md">
              The Verticals
            </h2>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-offwhite leading-[1.1] drop-shadow-lg">
              Targeted.<br className="md:hidden" /> Engaged. Owned.
            </h3>
          </div>
          <p className="font-sans text-white/80 max-w-sm text-sm md:text-base leading-relaxed drop-shadow-md">
            We do not rely on third-party exchanges. Our proprietary network ensures your message lands cleanly within highly engaged, specific communities.
          </p>
        </div>

        {/* Editorial Accordion System */}
        <div className="flex flex-col border-t border-white/10">
          {verticals.map((vertical, idx) => {
            const isExpanded = expandedIndex === idx;
            
            return (
              <div 
                key={idx}
                onMouseEnter={() => window.innerWidth >= 768 && setExpandedIndex(idx)}
                onClick={() => window.innerWidth < 768 && toggleExpand(idx)}
                className="group border-b border-white/10 relative overflow-hidden"
              >
                {/* Background Highlight */}
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  className="absolute inset-0 bg-white/[0.02] pointer-events-none"
                />

                <div className="relative z-10 py-6 md:py-12 px-2 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 cursor-pointer transition-colors duration-500 hover:text-white">
                  
                  {/* Left: Title */}
                  <div className="w-full md:w-1/3 flex justify-between items-center">
                    <h4 className={`font-display text-2xl md:text-4xl lg:text-5xl uppercase tracking-tighter transition-colors duration-500 ${isExpanded ? 'text-accent' : 'text-offwhite group-hover:text-accent'}`}>
                      {vertical.title}
                    </h4>
                    {/* Mobile toggle indicator */}
                    <span className="md:hidden text-white/30 text-xl font-light">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>
                  
                  {/* Middle: Expanded Content */}
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: isExpanded ? "auto" : "0px",
                      opacity: isExpanded ? 1 : 0
                    }}
                    className="w-full md:w-1/3 font-sans text-white/60 text-xs md:text-base leading-relaxed overflow-hidden"
                  >
                    <div className="py-2 md:py-0 max-w-sm">
                      {vertical.desc}
                      
                      {/* Metric Tag */}
                      <div className="mt-4 md:mt-4 inline-block border border-white/20 px-2 md:px-3 py-1 rounded-sm text-[10px] md:text-xs font-semibold uppercase tracking-widest text-offwhite">
                        {vertical.metric}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: CTA & Visual Placeholder */}
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: isExpanded ? "auto" : "0px",
                      opacity: isExpanded ? 1 : 0
                    }}
                    className="w-full md:w-1/3 overflow-hidden md:!h-auto md:!opacity-100 flex flex-col md:flex-row items-start md:items-center justify-between md:justify-end gap-6 md:gap-8 pt-2 md:pt-0"
                  >
                    
                    {/* Visual Placeholder (Only visible on hover on desktop) */}
                    <div className="hidden md:block w-0 group-hover:w-[120px] h-[80px] bg-[#111112] border border-white/10 overflow-hidden relative transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <span className="font-sans text-[10px] uppercase tracking-widest">Visual</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/verticals/${vertical.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="flex items-center gap-2 font-sans text-[10px] md:text-xs uppercase tracking-widest font-semibold text-offwhite group-hover:text-accent transition-colors pb-4 md:pb-0">
                      <span>Explore Vertical</span>
                      <ArrowUpRight size={14} className="md:w-[16px] md:h-[16px]" />
                    </Link>
                  </motion.div>

                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
