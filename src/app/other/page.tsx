import type { Metadata } from "next";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import GlowCard from "@/components/ui/GlowCard";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

const ACCENT = "#a855f7";

const SERVICES = [
  { title: "Audience Clipping",     description: "Carve premium lookalikes from first-party data.",                span: 2 },
  { title: "Programmatic Display",  description: "Brand-safe inventory, every IAB size, every market.",            span: 1 },
  { title: "Connected TV",          description: "Streaming-first activation with verified attribution.",          span: 1 },
  { title: "Native Advertising",    description: "Editorial-grade placements at scale.",                           span: 2 },
  { title: "Influencer Campaigns",  description: "Vetted creators with airtight measurement frameworks.",          span: 1 },
  { title: "Affiliate Networks",    description: "Pay-on-outcome partners across every vertical we operate in.",   span: 1 },
];

const STUDIES = [
  {
    title: "B2B SaaS Lead Gen",
    client: "Enterprise SaaS",
    category: "Other",
    slug: "saas-leadgen",
    metrics: [
      { label: "MQLs",  value: "+184%" },
      { label: "CPL",   value: "-42%"  },
      { label: "Spend", value: "$2.3M" },
    ],
  },
  {
    title: "CTV Brand Lift",
    client: "DTC Health Brand",
    category: "Other",
    slug: "ctv-brand-lift",
    metrics: [
      { label: "Reach",   value: "12M"  },
      { label: "Recall",  value: "+34%" },
      { label: "Sessions", value: "640K" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Extended Services",
  description:
    "Audience clipping, programmatic display, CTV, native advertising, and more. Modular performance marketing beyond the verticals.",
};

export default function OtherPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Extended Services", slug: "/other", description: "Programmatic display, CTV, native, influencer and affiliate." })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Other", slug: "/other" }])} />
      <VerticalHero
        label="Extended Services"
        headline="Beyond the Verticals"
        description="From audience clipping to niche market campaigns, our modular approach adapts to any performance marketing challenge."
        accentColor={ACCENT}
        ctaText="Talk Strategy"
      />

      <VerticalSection
        label="Modular by Design"
        title="Pick a Service, or Compose Them"
        align="center"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((s) => (
            <div key={s.title} style={{ gridColumn: `span ${s.span}` }}>
              <GlowCard glowColor={ACCENT}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h3)", fontWeight: 500, marginBottom: "0.5rem" }}>
                  {s.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body-sm)" }}>
                  {s.description}
                </p>
              </GlowCard>
            </div>
          ))}
        </div>
      </VerticalSection>

      <VerticalSection
        label="Audience Segmentation"
        title="Concentric Reach"
        description="Core audience first, then lookalikes, then broad — each tier feeds the next."
        align="center"
        background="secondary"
      >
        <div style={{ position: "relative", width: "100%", height: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[440, 320, 200].map((size, i) => (
            <div
              key={size}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                border: `1px solid color-mix(in srgb, ${ACCENT} ${30 + i * 20}%, transparent)`,
                background: i === 2 ? `color-mix(in srgb, ${ACCENT} 15%, transparent)` : "transparent",
              }}
            />
          ))}
          {["Broad", "Lookalike", "Core"].map((label, i) => (
            <span
              key={label}
              style={{
                position: "absolute",
                top: `calc(50% - ${[200, 140, 78][i]}px)`,
                color: "var(--text-secondary)",
                fontSize: "var(--text-caption)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </VerticalSection>

      <VerticalSection label="Campaign Examples" title="Selected Work">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {STUDIES.map((s) => (
            <CaseStudyCard key={s.slug} {...s} />
          ))}
        </div>
      </VerticalSection>

      <VerticalCTA
        headline="Build Your Custom Campaign"
        subtext="No two briefs are the same. Tell us the goal — we'll engineer the mix."
        ctaText="Start the Brief"
        accentColor={ACCENT}
      />
    </>
  );
}
