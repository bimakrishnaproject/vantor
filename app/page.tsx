import { getHomepageData } from '@/lib/cms';
import { StadiumHero } from '@/components/StadiumHero';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ScoreboardMetrics } from '@/components/ScoreboardMetrics';
import { ServiceCard } from '@/components/ServiceCard';
import { ExpandableCaseStudy } from '@/components/ExpandableCaseStudy';
import { CTASection } from '@/components/CTASection';
import { ScrollingTicker } from '@/components/ScrollingTicker';
import { TextReveal } from '@/components/TextReveal';

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <>
      {/* ===== 1. HERO ===== */}
      <StadiumHero hero={data.hero} metrics={data.metrics} />

      {/* ===== 2. SCROLLING TICKER — Social Proof Strip ===== */}
      <ScrollingTicker
        items={[
          '1B+ Monthly Views',
          '60M+ Followers',
          '5-10% Engagement',
          'Native Placements',
          '100% CPM Accountability',
          'Sports & Entertainment',
          'High-Converting Reach',
          'Fan Communities at Scale',
        ]}
        speed="normal"
      />

      {/* ===== 3. POSITIONING ===== */}
      <SectionWrapper id="positioning" showGrid>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {data.positioning.map((block, i) => (
            <div key={i} className="group pb-10 border-b border-white/5 last:border-0">
              <TextReveal
                text={block.title}
                tag="h3"
                className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-vantor-white mb-4 group-hover:text-vantor-blue transition-colors duration-300"
                splitBy="word"
                delay={i * 0.15}
              />
              <p className="text-vantor-silver text-sm md:text-base leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== 4. SCOREBOARD METRICS ===== */}
      <SectionWrapper id="metrics">
        <ScoreboardMetrics
          metrics={data.metrics}
          title="The Numbers Behind the Network"
        />
      </SectionWrapper>

      {/* ===== 5. SERVICES ECOSYSTEM ===== */}
      <SectionWrapper id="services" showGrid>
        <div className="text-center mb-12 md:mb-16">
          <p className="text-vantor-blue text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Our Network
          </p>
          <TextReveal
            text="The Vantor Ecosystem"
            tag="h2"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-subtle"
            splitBy="word"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data.services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ===== 6. SCROLLING TICKER 2 ===== */}
      <ScrollingTicker
        items={[
          'Audio',
          'eCommerce',
          'Mobile Apps',
          'Casinos',
          'Sports',
          'Entertainment',
          'Music',
          'Culture',
          'Cross-Vertical',
        ]}
        speed="slow"
        direction="right"
        separator="—"
      />

      {/* ===== 7. FEATURED CASE STUDY ===== */}
      <SectionWrapper id="case-study">
        <div className="text-center mb-10">
          <p className="text-vantor-blue text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Proven Results
          </p>
          <TextReveal
            text="Featured Campaign"
            tag="h2"
            className="font-display text-3xl md:text-4xl font-bold text-vantor-white"
            splitBy="word"
          />
        </div>
        <div className="max-w-3xl mx-auto">
          <ExpandableCaseStudy caseStudy={data.featuredCaseStudy} />
        </div>
      </SectionWrapper>

      {/* ===== 8. FINAL CTA ===== */}
      <CTASection
        title={data.finalCta.title}
        subtitle={data.finalCta.subtitle}
        cta={data.finalCta.cta}
      />
    </>
  );
}
