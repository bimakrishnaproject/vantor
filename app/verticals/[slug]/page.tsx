import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVerticalPages, getVerticalPageBySlug } from '@/lib/cms';
import { VerticalHero } from '@/components/VerticalHero';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ScoreboardMetrics } from '@/components/ScoreboardMetrics';
import { ExpandableCaseStudy } from '@/components/ExpandableCaseStudy';
import { InfographicPanel } from '@/components/InfographicPanel';
import { CTASection } from '@/components/CTASection';

// Generate static params for all verticals
export async function generateStaticParams() {
  const verticals = await getVerticalPages();
  return verticals.map((v) => ({ slug: v.slug }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getVerticalPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getVerticalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* 1. Cinematic Hero */}
      <VerticalHero hero={page.hero} visualTheme={page.visualTheme} />

      {/* 2. Service Description */}
      <SectionWrapper id="description">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-vantor-silver text-base md:text-lg leading-relaxed">
            {page.description}
          </p>
        </div>
      </SectionWrapper>

      {/* 3. Key Benefits */}
      <SectionWrapper id="key-points" showGrid>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {page.keyPoints.map((point, i) => (
            <div key={i} className="glass-panel p-6 md:p-8 hover:border-vantor-blue/25 transition-colors duration-300">
              <div className="w-10 h-10 rounded-full bg-vantor-blue/10 border border-vantor-blue/20 flex items-center justify-center mb-4">
                <span className="text-vantor-blue font-bold text-sm">{i + 1}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-vantor-white mb-3">
                {point.title}
              </h3>
              <p className="text-vantor-muted text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 4. Metrics */}
      <SectionWrapper id="vertical-metrics">
        <ScoreboardMetrics
          metrics={page.metrics}
          title={`${page.title} Performance`}
          columns={4}
        />
      </SectionWrapper>

      {/* 5. Case Studies */}
      {page.caseStudies.length > 0 && (
        <SectionWrapper id="case-studies">
          <div className="text-center mb-10">
            <p className="text-vantor-blue text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Case Studies
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-vantor-white">
              Proven {page.title} Results
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {page.caseStudies.map((cs) => (
              <ExpandableCaseStudy key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* 6. Why This Fits */}
      <SectionWrapper id="why-fits" showGrid>
        <InfographicPanel
          title={page.whyFits.title}
          points={page.whyFits.points}
        />
      </SectionWrapper>

      {/* 7. CTA */}
      <CTASection
        title={`Ready to Launch ${page.title}?`}
        subtitle="Tell us about your brand and we'll build a custom campaign."
        cta={page.cta}
      />
    </>
  );
}
