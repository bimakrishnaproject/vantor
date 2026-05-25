import type { Metadata } from "next";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import FeatureGrid from "@/components/verticals/FeatureGrid";
import ProcessFlow from "@/components/verticals/ProcessFlow";
import FloatingDevice from "@/components/verticals/FloatingDevice";
import StatCard from "@/components/ui/StatCard";
import MetricRow from "@/components/ui/MetricRow";

const ACCENT = "#00e88f";

const FEATURES = [
  { title: "User Acquisition",       description: "Paid install campaigns across all major mobile networks.",   icon: "📲" },
  { title: "App Store Optimization", description: "Keywords, creatives and listings tuned for organic lift.",   icon: "🏷" },
  { title: "Retargeting",            description: "Bring lapsed users back with deep-linked re-engagement.",     icon: "🔁" },
  { title: "In-App Engagement",      description: "Drive post-install events that grow LTV.",                    icon: "⚡" },
];

const STEPS = [
  { number: 1, title: "Audience Definition", description: "Demo, device, geo, behaviour and lookalike modelling." },
  { number: 2, title: "Creative Testing",    description: "Video, playable, static — large-scale iteration." },
  { number: 3, title: "Channel Mix",         description: "Social, programmatic, DSPs, OEM and alternative." },
  { number: 4, title: "Launch",              description: "Geo-staged rollout with conservative pacing." },
  { number: 5, title: "Optimize CPI",        description: "Bid and creative pruning against event-quality signals." },
  { number: 6, title: "Scale",               description: "Diversify, expand markets, defend efficiency." },
];

const STATS = [
  { value: "15M",  endValue: 15,  suffix: "M",            label: "App Installs Driven" },
  { value: "$0.42", endValue: 0.42, prefix: "$", decimals: 2, label: "Average CPI" },
  { value: "3.2x", endValue: 3.2, suffix: "x", decimals: 1, label: "ROAS on UA" },
  { value: "67%",  endValue: 67,  suffix: "%",            label: "Day-7 Retention" },
];

const METRICS = [
  { label: "Install Conversion Rate", value: "8.4%",  maxValue: 15 },
  { label: "Day-7 Retention",         value: "67%",   maxValue: 100 },
  { label: "ROAS (D30)",              value: "3.2x",  maxValue: 5 },
  { label: "Event Quality",           value: "+48%",  maxValue: 100 },
];

export const metadata: Metadata = {
  title: "Mobile App Marketing",
  description:
    "Drive app installs and engagement at scale. 15M+ installs driven with $0.42 average CPI and 67% day-7 retention.",
};

export default function MobileAppsPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Mobile App Marketing", slug: "/mobile-apps", description: "Mobile user acquisition, ASO, retargeting and engagement." })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Mobile Apps", slug: "/mobile-apps" }])} />
      <VerticalHero
        label="Mobile App Marketing"
        headline="Downloads at Scale"
        description="From installs to in-app engagement, we drive mobile growth with precision targeting and creative optimization."
        accentColor={ACCENT}
        visual={<FloatingDevice />}
        ctaText="Grow Your App"
      />

      <VerticalSection
        label="Full Mobile Lifecycle"
        title="Acquire, Engage, Retain"
        align="center"
      >
        <FeatureGrid items={FEATURES} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection
        label="Install to Engage"
        title="The Six-Step Mobile Playbook"
        background="secondary"
      >
        <ProcessFlow steps={STEPS} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection label="At a Glance" title="Performance Snapshot" align="center">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {STATS.map((s, i) => (
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

      <VerticalSection label="Conversion Metrics" title="Where Quality Lives" background="secondary">
        <MetricRow metrics={METRICS} />
      </VerticalSection>

      <VerticalCTA
        headline="Launch Your Growth"
        subtext="From soft launch to global scale — we run the funnel end to end."
        ctaText="Plan Your Launch"
        accentColor={ACCENT}
      />
    </>
  );
}
