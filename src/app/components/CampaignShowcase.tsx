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
    <section className="w-full bg-transparent py-16 md:py-32 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8"
        >
          <div>
            <h2 className="text-accent uppercase tracking-widest text-[10px] md:text-sm font-semibold mb-2 md:mb-4 drop-shadow-md">
              Outcomes & Proof
            </h2>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-offwhite max-w-2xl leading-[1.1] drop-shadow-lg">
              Campaign Showcase
            </h3>
          </div>
          <button className="flex items-center gap-2 font-sans text-[10px] md:text-xs uppercase tracking-widest font-semibold text-offwhite hover:text-accent transition-colors self-start md:self-auto">
            <span>View All Reports</span>
            <ArrowUpRight size={16} />
          </button>
        </motion.div>

        {/* Staggered Editorial Layout */}
        <div className="flex flex-col gap-16 md:gap-24">
          {campaigns.map((campaign, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`flex flex-col gap-12 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
            >
              {/* Visual Frame */}
              <Link href={`/showcase/${campaign.title.toLowerCase().replace(/ /g, '-')}`} className="w-full lg:w-3/5 aspect-[4/3] bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl relative group overflow-hidden cursor-crosshair block">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                
                {/* Simulated image/video placeholder */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay flex items-center justify-center"
                >
                  <span className="font-sans text-white/20 uppercase tracking-[0.3em] text-sm">Visual Asset</span>
                </motion.div>

                {/* Hover overlay data */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="flex justify-between items-center text-offwhite font-sans text-xs uppercase tracking-widest">
                    <span>Play Video</span>
                    <ArrowUpRight size={20} className="text-accent" />
                  </div>
                </div>
              </Link>

              {/* Editorial Data */}
              <div className="w-full lg:w-2/5 flex flex-col gap-8 bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10">
                <Link href={`/showcase/${campaign.title.toLowerCase().replace(/ /g, '-')}`} className="hover:text-accent transition-colors">
                  <h4 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter drop-shadow-lg">
                    {campaign.title}
                  </h4>
                </Link>

                <div className="flex flex-col gap-6">
                  <div className="border-t border-white/10 pt-4">
                    <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Objective</span>
                    <span className="font-sans text-sm text-white/80">{campaign.objective}</span>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Audience</span>
                    <span className="font-sans text-sm text-white/80">{campaign.audience}</span>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Format</span>
                    <span className="font-sans text-sm text-white/80">{campaign.format}</span>
                  </div>
                </div>

                {/* Impact Metric */}
                <div className="mt-4 bg-black/40 backdrop-blur-xl rounded-xl shadow-inner border border-white/20 p-6 flex flex-col">
                  <span className="font-sans text-[10px] text-accent uppercase tracking-[0.2em] mb-2 drop-shadow-md">Total Verified Reach</span>
                  <span className="font-display text-5xl tracking-tighter text-offwhite drop-shadow-lg">{campaign.reach}</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
