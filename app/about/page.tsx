import type { Metadata } from 'next';
import { getAboutData } from '@/lib/cms';
import { StadiumHero } from '@/components/StadiumHero';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ScoreboardMetrics } from '@/components/ScoreboardMetrics';
import { TeamGrid } from '@/components/TeamGrid';
import { PartnerStrip } from '@/components/PartnerStrip';
import { AboutScene3D } from '@/components/AboutScene3D';

export const metadata: Metadata = {
  title: 'About | Vantor Ventures',
  description:
    'Building the largest media ecosystem in sports and entertainment. We don\'t sell impressions. We sell integration.',
};

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <>
      <StadiumHero hero={data.hero} />

      {/* 3D Floating Orbs background for the about sections */}
      <AboutScene3D />

      <SectionWrapper id="about-blurb" showGrid>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-vantor-white font-display text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-12">
            {data.companyBlurb}
          </p>
          <div className="w-px h-24 bg-gradient-to-b from-vantor-blue/50 to-transparent mx-auto" />
        </div>
      </SectionWrapper>

      <SectionWrapper id="positioning">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-vantor-blue mb-6">
            Integration, Not Interruption
          </h2>
          <p className="text-vantor-silver text-base md:text-lg leading-relaxed">
            {data.positioning}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="network-scale" showGrid>
        <ScoreboardMetrics
          metrics={data.networkScale}
          title="Network Scale"
        />
      </SectionWrapper>

      <SectionWrapper id="team">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-vantor-white">
            The Team
          </h2>
        </div>
        <TeamGrid team={data.team} />
      </SectionWrapper>

      <SectionWrapper id="partners" className="pt-0 pb-24 md:pb-32">
        <div className="text-center mb-10">
          <p className="text-vantor-blue text-xs uppercase tracking-widest font-semibold">
            Trusted By
          </p>
        </div>
        <PartnerStrip partners={data.partners} />
      </SectionWrapper>
    </>
  );
}
