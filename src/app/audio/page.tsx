import type { Metadata } from "next";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import FeatureGrid from "@/components/verticals/FeatureGrid";
import ProcessFlow from "@/components/verticals/ProcessFlow";
import WaveformAnimation from "@/components/verticals/WaveformAnimation";
import StatCard from "@/components/ui/StatCard";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

const ACCENT = "#00d4ff";

const FEATURES = [
  { title: "Programmatic Audio",  description: "Targeted reach across the streaming and digital radio ecosystem.", icon: "♪" },
  { title: "Podcast Sponsorship", description: "Native host-read placements in tier-one shows worldwide.",         icon: "🎙" },
  { title: "Streaming Campaigns", description: "Spotify, Pandora, Amazon Music — measured down to the listen.",    icon: "📡" },
];

const STEPS = [
  { number: 1, title: "Audience Analysis",  description: "Listening habits, genre affinity, daypart, market." },
  { number: 2, title: "Creative Strategy",  description: "Scripts, voice talent, sonic logos, A/B variants." },
  { number: 3, title: "Platform Selection", description: "Match audience density to the right buying platforms." },
  { number: 4, title: "Campaign Launch",    description: "Multi-platform activation with frequency capping." },
  { number: 5, title: "Optimization",       description: "Bid, creative and audience tuning on signal." },
  { number: 6, title: "Reporting",          description: "Attribution back to brand lift and conversions." },
];

const STATS = [
  { value: "2.1M",  endValue: 2.1, suffix: "M", decimals: 1, label: "Daily Audio Impressions" },
  { value: "340%",  endValue: 340, suffix: "%",              label: "Average Reach Increase" },
  { value: "$0.03", endValue: 0.03, prefix: "$", decimals: 2, label: "Cost Per Listen" },
  { value: "89%",   endValue: 89,  suffix: "%",              label: "Completion Rate" },
];

const STUDIES = [
  {
    title: "Streaming Platform Launch",
    client: "Tier-1 Music Service",
    category: "Audio",
    slug: "streaming-launch",
    metrics: [
      { label: "Reach",       value: "+340%" },
      { label: "Impressions", value: "2.1M"  },
      { label: "CPV",         value: "$0.03" },
    ],
  },
  {
    title: "Podcast Network Takeover",
    client: "Consumer Tech Brand",
    category: "Audio",
    slug: "podcast-takeover",
    metrics: [
      { label: "Episodes", value: "120+"   },
      { label: "Listens",  value: "8.4M"   },
      { label: "Lift",     value: "+22pp" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Audio Advertising",
  description:
    "Programmatic audio, podcast sponsorship, and streaming campaigns that drive measurable results. 2.1M+ daily audio impressions delivered.",
};

export default function AudioPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Audio Advertising", slug: "/audio", description: "Programmatic audio, podcast and streaming campaigns." })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Audio", slug: "/audio" }])} />
      <VerticalHero
        label="Audio Advertising"
        headline="Sound That Converts"
        description="From streaming platforms to podcasts, we engineer audio campaigns that resonate with audiences and drive measurable results."
        accentColor={ACCENT}
        backgroundEffect={<WaveformAnimation />}
        ctaText="Talk to Audio"
      />

      <VerticalSection
        label="How We Amplify Your Brand"
        title="Three Channels, One Voice"
        align="center"
        background="primary"
      >
        <FeatureGrid items={FEATURES} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection
        label="Our Audio Process"
        title="From Insight to Impact"
        background="secondary"
      >
        <ProcessFlow steps={STEPS} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection label="Performance" title="Audio at Scale" align="center">
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

      <VerticalSection label="Case Studies" title="Proven Audio Outcomes" background="secondary">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {STUDIES.map((s) => (
            <CaseStudyCard key={s.slug} {...s} />
          ))}
        </div>
      </VerticalSection>

      <VerticalCTA
        headline="Ready to Be Heard?"
        subtext="Let's design an audio campaign that captures attention and earns results."
        ctaText="Start Your Audio Campaign"
        accentColor={ACCENT}
      />
    </>
  );
}
