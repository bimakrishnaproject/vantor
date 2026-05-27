import type { Metadata } from "next";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getVerticalPageBySlug } from "@/lib/cms";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import FeatureGrid from "@/components/verticals/FeatureGrid";
import ProcessFlow from "@/components/verticals/ProcessFlow";
import StatCard from "@/components/ui/StatCard";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export const metadata: Metadata = {
  title: "Specialized Audiences",
  description: "Bespoke media strategies for B2B, niche consumer segments, and complex buyer journeys.",
};

export default async function OtherPage() {
  const data = await getVerticalPageBySlug("other");
  const ACCENT = data.hero.accentColor;

  return (
    <>
      <JsonLd data={serviceSchema({ name: data.title, slug: "/other", description: data.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Specialized Audiences", slug: "/other" }])} />
      <VerticalHero
        label={data.hero.label}
        headline={data.hero.headline}
        description={data.hero.description}
        accentColor={ACCENT}
        ctaText={data.hero.ctaText}
      />

      <VerticalSection
        label={data.features.label}
        title={data.features.title}
        align="center"
        background="primary"
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

      <VerticalSection label={data.stats.label} title={data.stats.title} align="center">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {data.stats.items.map((s: any, i: number) => (
            <StatCard
              key={s.label}
              value={s.value}
              endValue={s.endValue}
              prefix={s.prefix}
              suffix={s.suffix}
              decimals={s.decimals}
              label={s.label}
              delay={i * 100}
            />
          ))}
        </div>
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
