import { getPageBySlug } from "@/lib/cms";
import HeroSection from "@/components/homepage/HeroSection";
import PositioningSection from "@/components/homepage/PositioningSection";
import StatsSection from "@/components/homepage/StatsSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import FeaturedMetricsSection from "@/components/homepage/FeaturedMetricsSection";
import CaseStudySection from "@/components/homepage/CaseStudySection";
import CTASection from "@/components/homepage/CTASection";
import FloatingCTA from "@/components/ui/FloatingCTA";

export default async function HomePage() {
  const pageData = await getPageBySlug('home');
  const acf = pageData?.acf;

  // Use ACF data for Hero if available, otherwise fallback to static
  const heroData = {
    label: acf?.hero_subtitle || "Premium Media Buying Ecosystem",
    headline: acf?.hero_title || "Where Performance Meets Spectacle",
    subtext: acf?.hero_description || "Delivering immersive media buying solutions across Audio, eCommerce, Mobile Apps, and Casino verticals.",
    cta: {
      text: acf?.primary_cta_text || "Explore Our Ecosystem",
      link: acf?.primary_cta_url || "#services",
    },
  };

  const positioningData = {
    headline: "Strategic by Scale, Precise by Nature",
    description: "We are a full-spectrum media buying powerhouse — building campaigns that span continents, channels, and verticals while keeping every decision rooted in measurable performance.",
  };

  const statsData = [
    { value: "250M+", endValue: 250, suffix: "M+", label: "Monthly Impressions" },
    { value: "12K+",  endValue: 12,  suffix: "K+", label: "Campaigns Delivered" },
    { value: "98%",   endValue: 98,  suffix: "%",  label: "Client Retention Rate" },
    { value: "45+",   endValue: 45,  suffix: "+",  label: "Markets Reached" },
    { value: "3.2x",  endValue: 3.2, suffix: "x", decimals: 1, label: "Average ROAS" },
    { value: "$180M", endValue: 180, prefix: "$", suffix: "M", label: "Media Spend Managed" },
  ];

  const servicesData = [
    { title: "Audio",       description: "Programmatic audio, podcasts, streaming.", slug: "audio" },
    { title: "eCommerce",   description: "Turn ad spend into measurable revenue.",   slug: "ecommerce" },
    { title: "Mobile Apps", description: "Downloads, engagement, retention.",        slug: "mobile-apps" },
    { title: "Casinos",     description: "Compliant iGaming across regulated markets.", slug: "casinos" },
    { title: "Other",       description: "Beyond the verticals — modular campaigns.", slug: "other" },
  ];

  const featuredMetricsData = {
    title: "Numbers That Define Excellence",
    metrics: [
      { label: "Click-through Rate",     value: "4.2%",  trend: "up" },
      { label: "Conversion Rate",        value: "12.8%", trend: "up" },
      { label: "Cost Per Acquisition",   value: "-34%",  trend: "down" },
      { label: "Return on Ad Spend",     value: "3.2x",  trend: "up"  },
    ]
  };

  const caseStudiesData = [
    {
      title: "Streaming Platform Launch",
      client: "Audio Campaign",
      category: "Audio",
      slug: "streaming-launch",
      metrics: [
        { label: "Reach", value: "+340%" },
        { label: "Impressions", value: "2.1M" },
        { label: "CPV", value: "$0.03" },
      ],
    },
    {
      title: "Fashion Brand ROAS Boost",
      client: "eCommerce",
      category: "eCommerce",
      slug: "fashion-roas",
      metrics: [
        { label: "ROAS", value: "4.8x" },
        { label: "Revenue", value: "+127%" },
        { label: "CPA", value: "-62%" },
      ],
    },
  ];

  const ctaData = {
    headline: "Ready to Fill the Stadium?",
    subtext: "Let's build your next high-performance campaign together.",
    buttonText: acf?.secondary_cta_text || "Start a Project",
    buttonLink: acf?.secondary_cta_url || "/contact",
  };

  return (
    <main>
      <HeroSection data={heroData} />
      <PositioningSection data={positioningData} />
      <StatsSection data={statsData} />
      <ServicesSection data={servicesData} />
      <FeaturedMetricsSection data={featuredMetricsData} />
      <CaseStudySection data={caseStudiesData} />
      <CTASection data={ctaData} />
      <FloatingCTA />
    </main>
  );
}
