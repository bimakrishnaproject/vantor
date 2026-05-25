import type { Metadata } from "next";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import FeatureGrid from "@/components/verticals/FeatureGrid";
import ProcessFlow from "@/components/verticals/ProcessFlow";
import EcommerceVisual, { EcommerceBackground } from "@/components/verticals/EcommerceVisual";
import MetricRow from "@/components/ui/MetricRow";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

const ACCENT = "#ff6b35";

const FEATURES = [
  { title: "Social Commerce",  description: "Meta, TikTok, Pinterest — full-funnel performance creative.", icon: "🛍" },
  { title: "Search & Shopping", description: "Google, Bing, marketplace search at the moment of intent.",   icon: "🔍" },
  { title: "Marketplace Ads",  description: "Amazon, Walmart, Target — bid down to the SKU.",               icon: "🏬" },
  { title: "Retargeting",      description: "Recover abandoned carts with cross-device frequency control.", icon: "🎯" },
];

const STEPS = [
  { number: 1, title: "Market Research",   description: "Category dynamics, competitor spend, audience pockets." },
  { number: 2, title: "Creative Production", description: "On-brand variants tested across platforms and ratios." },
  { number: 3, title: "A/B Testing",       description: "Statistically valid creative and offer experiments." },
  { number: 4, title: "Launch & Scale",    description: "Diversified channel mix with budget pacing." },
  { number: 5, title: "Optimize",          description: "Daily ROAS, CPA and basket-size tuning." },
  { number: 6, title: "Report",            description: "Revenue attribution and incremental lift." },
];

const METRICS = [
  { label: "ROAS",                value: "4.8x",   maxValue: 6  },
  { label: "Revenue Growth",      value: "+127%",  maxValue: 200 },
  { label: "CPA Reduction",       value: "-34%",   maxValue: 50 },
  { label: "Conversion Rate",     value: "12.8%",  maxValue: 20 },
];

const STUDIES = [
  {
    title: "Fashion Brand ROAS Boost",
    client: "DTC Apparel",
    category: "eCommerce",
    slug: "fashion-roas",
    metrics: [
      { label: "ROAS",    value: "4.8x"  },
      { label: "Revenue", value: "+127%" },
      { label: "CPA",     value: "-62%"  },
    ],
  },
  {
    title: "Marketplace Expansion",
    client: "Home Goods Brand",
    category: "eCommerce",
    slug: "marketplace-expansion",
    metrics: [
      { label: "Markets", value: "12"     },
      { label: "AOV",     value: "+38%"   },
      { label: "Sessions", value: "9.6M"  },
    ],
  },
];

export const metadata: Metadata = {
  title: "eCommerce Performance Marketing",
  description:
    "Data-driven eCommerce campaigns delivering 4.8x ROAS. Social commerce, search, marketplace, and retargeting at scale.",
};

export default function EcommercePage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "eCommerce Performance Marketing", slug: "/ecommerce", description: "Full-funnel eCommerce media buying delivering measurable revenue." })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "eCommerce", slug: "/ecommerce" }])} />
      <VerticalHero
        label="eCommerce Performance"
        headline="Fuel Your Sales Engine"
        description="We turn ad spend into revenue. Data-driven eCommerce campaigns across every major platform, optimized for ROAS."
        accentColor={ACCENT}
        backgroundEffect={<EcommerceBackground />}
        visual={<EcommerceVisual />}
        ctaText="Boost Your Revenue"
      />

      <VerticalSection
        label="Full-Funnel eCommerce"
        title="Coverage Across Every Buying Surface"
        align="center"
      >
        <FeatureGrid items={FEATURES} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection
        label="From Click to Checkout"
        title="Our Operating Rhythm"
        background="secondary"
      >
        <ProcessFlow steps={STEPS} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection label="Performance Metrics" title="Numbers That Drive Revenue">
        <MetricRow metrics={METRICS} />
      </VerticalSection>

      <VerticalSection label="Case Studies" title="Real Brands, Real Lift" background="secondary">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {STUDIES.map((s) => (
            <CaseStudyCard key={s.slug} {...s} />
          ))}
        </div>
      </VerticalSection>

      <VerticalCTA
        headline="Scale Your Revenue"
        subtext="Tell us your category, your margin, your goals — we'll build the campaign."
        ctaText="Get a Plan"
        accentColor={ACCENT}
      />
    </>
  );
}
