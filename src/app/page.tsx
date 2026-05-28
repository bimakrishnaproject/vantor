import { getHomepageData } from "@/lib/cms";
import HeroSection from "@/components/homepage/HeroSection";
import PositioningSection from "@/components/homepage/PositioningSection";
import StatsSection from "@/components/homepage/StatsSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import FeaturedMetricsSection from "@/components/homepage/FeaturedMetricsSection";
import CaseStudySection from "@/components/homepage/CaseStudySection";
import CTASection from "@/components/homepage/CTASection";
import FloatingCTA from "@/components/ui/FloatingCTA";

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <main>
      <div id="hero-section">
        <HeroSection data={data.hero} />
      </div>
      <div id="positioning-section">
        <PositioningSection data={data.positioning} />
      </div>
      <div id="stats-section">
        <StatsSection data={data.stats} />
      </div>
      <div id="services-section">
        <ServicesSection data={data.services} />
      </div>
      <div id="featured-metrics-section">
        <FeaturedMetricsSection data={data.featuredMetrics} />
      </div>
      <div id="case-study-section">
        <CaseStudySection data={data.caseStudies} />
      </div>
      <div id="cta-section">
        <CTASection data={data.cta} />
      </div>
      <FloatingCTA />
    </main>
  );
}
