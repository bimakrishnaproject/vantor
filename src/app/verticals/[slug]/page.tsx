import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vertical | KOLS",
};

export default async function VerticalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise
  const { slug } = await params;

  return (
    <main className="flex min-h-screen flex-col bg-charcoal overflow-x-clip pt-[100px]">
      
      {/* Hero Header */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center px-6 md:px-12 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0B0C]">
          {/* Subtle grid line for editorial precision */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-[size:100px] opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(230,0,0,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full">
          <div className="inline-block border border-white/20 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest text-accent mb-6">
            Vertical Focus
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter text-offwhite leading-[0.9] max-w-5xl">
            {slug.replace(/-/g, ' ')} <br /> Network <span className="text-white/20 italic font-sans lowercase align-middle">accessibility</span>
          </h1>
          <div className="mt-12 inline-block bg-[#111112] border border-white/10 px-6 py-4">
            <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Total Verified Reach</span>
            <span className="font-display text-4xl text-offwhite tracking-tighter">50M+ REACH</span>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Audience Persona */}
        <div className="w-full lg:w-1/3 flex flex-col gap-12">
          <div>
            <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-6">
              Target Audience Persona
            </h2>
            <p className="font-sans text-white/60 leading-relaxed text-sm">
              This vertical targets highly engaged, high-intent individuals deeply rooted in the {slug.replace(/-/g, ' ')} culture. They value authenticity, quick information consumption, and community-driven content.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="border-t border-white/10 pt-4">
              <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Core Demographics</span>
              <span className="font-sans text-sm text-white/80">18 - 34 Years Old (65%)</span>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Top Regions</span>
              <span className="font-sans text-sm text-white/80">North America, Southeast Asia, Europe</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="block font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Engagement Rate</span>
              <span className="font-sans text-sm text-white/80">4.8% Average (Network Wide)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Owned Asset Showcase Grid */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-6">
            Owned Communities & Assets
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-[#111112] border border-white/5 aspect-[4/3] relative group overflow-hidden cursor-crosshair">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1d] to-charcoal mix-blend-luminosity p-8 flex flex-col justify-between">
                  <span className="font-sans text-white/30 uppercase tracking-[0.2em] text-[10px]">Property 0{item}</span>
                  <span className="font-display text-3xl text-white/20 uppercase tracking-tighter group-hover:text-offwhite transition-colors duration-500">Asset Title</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Section CTA */}
      <section className="w-full bg-[#111112] py-24 px-6 md:px-12 border-t border-white/5 text-center">
        <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-offwhite mb-6">
          Ready to activate this audience?
        </h3>
        <p className="font-sans text-white/60 mb-12 max-w-lg mx-auto">
          Contact our network specialists to discuss custom strategies and pricing models tailored to the {slug.replace(/-/g, ' ')} vertical.
        </p>
        <button className="bg-accent text-white px-8 py-4 font-sans uppercase tracking-widest text-sm font-semibold hover:bg-accent/90 transition-colors">
          Request a Campaign
        </button>
      </section>
    </main>
  );
}
