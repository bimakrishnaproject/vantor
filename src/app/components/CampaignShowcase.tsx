"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const campaigns = [
  {
    objective: "Product Launch // Market Penetration",
    audience: "Gen Z & Millennial Sports Fans",
    format: "Video Integrations & Interactive Polls",
    reach: "12.4M",
    title: "Global Sneaker Drop",
  },
  {
    objective: "Brand Awareness // Cultural Alignment",
    audience: "Electronic Music Enthusiasts",
    format: "Live Event Streaming & Editorial Coverage",
    reach: "8.1M",
    title: "Festival Season Takeover",
  }
];

export default function CampaignShowcase() {
  return (
    <section className="w-full min-h-screen relative z-10 overflow-hidden flex items-center">
      <div className="w-full flex flex-col lg:flex-row">
        
        {/* Left Solid Content Block */}
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 bg-black/95 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24"
        >
          <div className="max-w-xl mx-auto w-full">
            <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
              <div>
                <h2 className="text-accent uppercase tracking-widest text-[10px] md:text-sm font-semibold mb-2 md:mb-4 drop-shadow-md">
                  Outcomes & Proof
                </h2>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-offwhite leading-[1.1] drop-shadow-lg">
                  Campaign Showcase
                </h3>
              </div>
              <button className="flex items-center gap-2 font-sans text-[10px] md:text-xs uppercase tracking-widest font-semibold text-offwhite hover:text-accent transition-colors self-start md:self-auto">
                <span>View Reports</span>
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Staggered Editorial Layout */}
            <div className="flex flex-col gap-12">
              {campaigns.map((campaign, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex flex-col gap-8 bg-[#111112] p-8 rounded-2xl shadow-2xl border border-white/5 transition-colors duration-500 hover:bg-black/60"
                >
                  <Link href={`/showcase/${campaign.title.toLowerCase().replace(/ /g, '-')}`} className="hover:text-accent transition-colors">
                    <h4 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter drop-shadow-lg">
                      {campaign.title}
                    </h4>
                  </Link>

                  <div className="flex flex-col gap-6">
                    <div className="border-t border-white/5 pt-4">
                      <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Objective</span>
                      <span className="font-sans text-sm text-white/80">{campaign.objective}</span>
                    </div>
                    
                    <div className="border-t border-white/5 pt-4">
                      <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Audience</span>
                      <span className="font-sans text-sm text-white/80">{campaign.audience}</span>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Format</span>
                      <span className="font-sans text-sm text-white/80">{campaign.format}</span>
                    </div>
                  </div>

                  {/* Impact Metric */}
                  <div className="mt-4 border-l-2 border-accent pl-6 flex flex-col">
                    <span className="font-sans text-[10px] text-accent uppercase tracking-[0.2em] mb-2 drop-shadow-md">Total Verified Reach</span>
                    <span className="font-display text-5xl tracking-tighter text-offwhite drop-shadow-lg">{campaign.reach}</span>
                  </div>

                </motion.div>
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
