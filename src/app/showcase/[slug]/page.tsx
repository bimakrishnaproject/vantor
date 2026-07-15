import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "Media Campaign Report | KOLS",
};

export default async function ShowcaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, ' ');

  return (
    <main className="flex min-h-screen flex-col bg-charcoal overflow-x-clip pt-[100px]">
      
      {/* Back Button */}
      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Report Header */}
      <section className="w-full px-6 md:px-12 pb-16 pt-8 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col gap-6">
            <span className="inline-block border border-accent px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest text-accent self-start">
              Campaign Report
            </span>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter text-offwhite leading-[0.9] max-w-6xl">
              {formattedTitle} <br /> 
              <span className="text-white/20 italic font-sans lowercase align-middle">& brand takeover</span>
            </h1>

            {/* Metadata Row */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Format</span>
                <span className="font-sans text-sm text-offwhite font-medium">Video Integrations</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Vertical</span>
                <span className="font-sans text-sm text-offwhite font-medium">Sports / Culture</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Duration</span>
                <span className="font-sans text-sm text-offwhite font-medium">4 Weeks</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Launch Date</span>
                <span className="font-sans text-sm text-offwhite font-medium">Q3 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Performance Scoreboard */}
      <section className="w-full bg-[#111112] py-16 px-6 md:px-12 border-b border-white/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
          <div className="flex flex-col items-start lg:items-center justify-center lg:text-center pl-4 lg:pl-0">
            <div className="font-sans text-4xl md:text-5xl font-light text-offwhite tabular-nums mb-2">12.4<span className="text-accent">M</span></div>
            <div className="text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">Total Impressions</div>
          </div>
          <div className="flex flex-col items-start lg:items-center justify-center lg:text-center pl-8 lg:pl-0">
            <div className="font-sans text-4xl md:text-5xl font-light text-offwhite tabular-nums mb-2">6.8<span className="text-accent">%</span></div>
            <div className="text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">Engagement Rate</div>
          </div>
          <div className="flex flex-col items-start lg:items-center justify-center lg:text-center pl-4 lg:pl-0">
            <div className="font-sans text-4xl md:text-5xl font-light text-offwhite tabular-nums mb-2">340<span className="text-accent">K</span></div>
            <div className="text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">Click-Throughs</div>
          </div>
          <div className="flex flex-col items-start lg:items-center justify-center lg:text-center pl-8 lg:pl-0">
            <div className="font-sans text-4xl md:text-5xl font-light text-offwhite tabular-nums mb-2">8.2<span className="text-accent">K</span></div>
            <div className="text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">Total Conversions</div>
          </div>
        </div>
      </section>

      {/* Narrative & Visuals */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col gap-32">
        
        {/* Block 1: Brief & Objective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-3xl uppercase tracking-tighter text-offwhite">Brief & Objective</h3>
          </div>
          <div className="lg:col-span-8">
            <p className="font-sans text-white/60 text-lg leading-relaxed mb-6">
              The brand approached KOLS to drive massive cultural relevance around a new product drop. The objective was clear: penetrate the highly skeptical Gen Z demographic without relying on traditional interruptive advertising formats.
            </p>
            <p className="font-sans text-white/60 text-lg leading-relaxed">
              We needed to integrate the brand directly into the daily content consumption habits of the audience, positioning the product not as an ad, but as an editorial talking point.
            </p>
          </div>
        </div>

        {/* Visual Break */}
        <div className="w-full aspect-video bg-[#0c0c0e] border border-white/5 relative overflow-hidden flex items-center justify-center cursor-crosshair">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <span className="font-sans text-white/20 uppercase tracking-[0.3em] text-sm">Main Campaign Visual Asset</span>
        </div>

        {/* Block 2: Strategy & Execution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-3xl uppercase tracking-tighter text-offwhite">Strategy & Execution</h3>
          </div>
          <div className="lg:col-span-8">
            <p className="font-sans text-white/60 text-lg leading-relaxed mb-8">
              Instead of scattering budget across broad networks, KOLS isolated 15 core communities within the Sports and Culture vertical. We developed native video integrations where community hosts naturally debated the product.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111112] border border-white/5 aspect-square relative p-8 flex items-end">
                 <span className="font-sans text-white/20 uppercase tracking-[0.2em] text-xs">Creative Asset 1</span>
              </div>
              <div className="bg-[#111112] border border-white/5 aspect-square relative p-8 flex items-end">
                 <span className="font-sans text-white/20 uppercase tracking-[0.2em] text-xs">Creative Asset 2</span>
              </div>
            </div>
          </div>
        </div>
        
      </section>

    </main>
  );
}
