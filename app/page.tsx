import { getHomepageData } from '@/lib/cms';
import { StadiumHero } from '@/components/StadiumHero';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ScoreboardMetrics } from '@/components/ScoreboardMetrics';
import { ServiceCard } from '@/components/ServiceCard';
import { ExpandableCaseStudy } from '@/components/ExpandableCaseStudy';
import { CTASection } from '@/components/CTASection';

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <>
      {/* ===== 1. HERO ===== */}
      <StadiumHero hero={data.hero} metrics={data.metrics} />

      {/* ===== 2. POSITIONING ===== */}
      <SectionWrapper id="positioning" showGrid>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {data.positioning.map((block, i) => (
            <div key={i} className="group">
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-vantor-white mb-4 group-hover:text-vantor-blue transition-colors duration-300">
                {block.title}
              </h3>
              <p className="text-vantor-silver text-sm md:text-base leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== 3. SCOREBOARD METRICS ===== */}
      <SectionWrapper id="metrics">
        <ScoreboardMetrics
          metrics={data.metrics}
          title="The Numbers Behind the Network"
        />
      </SectionWrapper>

      {/* ===== 4. SERVICES ECOSYSTEM ===== */}
      <SectionWrapper id="services" showGrid>
        <div className="text-center mb-12 md:mb-16">
          <p className="text-vantor-blue text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Our Network
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-subtle">
            The Vantor Ecosystem
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data.services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ===== 5. FEATURED CASE STUDY ===== */}
      <SectionWrapper id="case-study">
        <div className="text-center mb-10">
          <p className="text-vantor-blue text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Proven Results
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-vantor-white">
            Featured Campaign
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <ExpandableCaseStudy caseStudy={data.featuredCaseStudy} />
        </div>
      </SectionWrapper>

      {/* ===== 6. FINAL CTA ===== */}
      <CTASection
        title={data.finalCta.title}
        subtitle={data.finalCta.subtitle}
        cta={data.finalCta.cta}
      />
    </>
  );
}
