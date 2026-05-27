import type { Metadata } from "next";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getVerticalPageBySlug } from "@/lib/cms";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import FeatureGrid from "@/components/verticals/FeatureGrid";
import ProcessFlow from "@/components/verticals/ProcessFlow";
import EcommerceVisual, { EcommerceBackground } from "@/components/verticals/EcommerceVisual";
import MetricRow from "@/components/ui/MetricRow";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export const metadata: Metadata = {
  title: "eCommerce Performance Marketing",
  description: "Data-driven eCommerce campaigns delivering 4.8x ROAS. Social commerce, search, marketplace, and retargeting at scale.",
};

export default async function EcommercePage() {
  const data = await getVerticalPageBySlug("ecommerce");
  const ACCENT = data.hero.accentColor;

  const formattedMetrics = data.stats.items.map((m: any) => ({
    label: m.label,
    value: m.value,
    maxValue: 100 // default max value
  }));

  return (
    <>
      <JsonLd data={serviceSchema({ name: data.title, slug: "/ecommerce", description: data.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "eCommerce", slug: "/ecommerce" }])} />
      <VerticalHero
        label={data.hero.label}
        headline={data.hero.headline}
        description={data.hero.description}
        accentColor={ACCENT}
        backgroundEffect={<EcommerceBackground />}
        visual={<EcommerceVisual />}
        ctaText={data.hero.ctaText}
      />

      <VerticalSection
        label={data.features.label}
        title={data.features.title}
        align="center"
      >
        <FeatureGrid items={data.features.items} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection
        label={data.process.label}
        title={data.process.title}
        background="secondary"
      >
        <ProcessFlow steps={data.process.steps} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection label={data.stats.label} title={data.stats.title}>
        <MetricRow metrics={formattedMetrics} />
      </VerticalSection>

      <VerticalSection label={data.caseStudies.label} title={data.caseStudies.title} background="secondary">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {data.caseStudies.items.map((s: any) => (
            <CaseStudyCard key={s.slug} {...s} />
          ))}
        </div>
      </VerticalSection>

      <VerticalCTA
        headline={data.cta.headline}
        subtext={data.cta.subtext}
        ctaText={data.cta.ctaText}
        accentColor={ACCENT}
      />
    </>
  );
}
