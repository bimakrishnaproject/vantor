import HeroSection from "@/components/homepage/HeroSection";
import PositioningSection from "@/components/homepage/PositioningSection";
import StatsSection from "@/components/homepage/StatsSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import FeaturedMetricsSection from "@/components/homepage/FeaturedMetricsSection";
import CaseStudySection from "@/components/homepage/CaseStudySection";
import CTASection from "@/components/homepage/CTASection";
import FloatingCTA from "@/components/ui/FloatingCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedMetricsSection />
      <CaseStudySection />
      <CTASection />
      <FloatingCTA />
    </>
  );
}
