import type { Metadata } from "next";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import ProcessFlow from "@/components/verticals/ProcessFlow";
import GeoMap from "@/components/verticals/GeoMap";
import StatCard from "@/components/ui/StatCard";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

const ACCENT = "#f0c040";

const STEPS = [
  { number: 1, title: "Market & Compliance Review", description: "License posture, restrictions, creative review boards." },
  { number: 2, title: "Audience Segmentation",      description: "VIP, casual, sportsbook crossover — modelled per market." },
  { number: 3, title: "Geo-Targeting Setup",        description: "Postcode, IP and consent-grade location signals." },
  { number: 4, title: "Creative Localization",      description: "Language, payment methods, regional iconography." },
  { number: 5, title: "Launch",                     description: "Channel-by-channel activation with caps and pacing." },
  { number: 6, title: "Performance Tracking",       description: "FTD, retention, LTV and bonus efficiency." },
];

const STATS = [
  { value: "45+",    endValue: 45,   suffix: "+",            label: "Regulated Markets" },
  { value: "$42M",   endValue: 42,   prefix: "$", suffix: "M", label: "Monthly Casino Spend" },
  { value: "2.8x",   endValue: 2.8,  suffix: "x", decimals: 1, label: "Player LTV Multiplier" },
  { value: "99.2%",  endValue: 99.2, suffix: "%", decimals: 1, label: "Compliance Rate" },
];

const STUDIES = [
  {
    title: "EU Sportsbook Scale-Up",
    client: "Tier-1 Operator",
    category: "Casinos",
    slug: "eu-sportsbook",
    metrics: [
      { label: "FTDs",     value: "+212%" },
      { label: "CPA",      value: "-31%"  },
      { label: "LTV",      value: "2.8x"  },
    ],
  },
  {
    title: "LATAM Casino Launch",
    client: "iGaming Brand",
    category: "Casinos",
    slug: "latam-launch",
    metrics: [
      { label: "Markets",  value: "6"     },
      { label: "Spend",    value: "$8.4M" },
      { label: "ROAS",     value: "3.4x"  },
    ],
  },
];

export const metadata: Metadata = {
  title: "Casino & iGaming Marketing",
  description:
    "Compliant, high-performance casino campaigns across 45+ regulated markets. $42M monthly spend managed with 99.2% compliance.",
};

export default function CasinosPage() {
  return (
    <div style={{ "--bg-primary": "#0d0a08" } as React.CSSProperties}>
      <JsonLd data={serviceSchema({ name: "Casino & iGaming Marketing", slug: "/casinos", description: "Compliant casino and iGaming campaigns across regulated markets." })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Casinos", slug: "/casinos" }])} />
      <VerticalHero
        label="Casino & iGaming"
        headline="High Stakes, Higher Returns"
        description="Navigate regulated markets with precision. We deliver compliant, high-performance casino and iGaming campaigns globally."
        accentColor={ACCENT}
        visual={<GeoMap accentColor={ACCENT} />}
        ctaText="Enter the Arena"
      />

      <VerticalSection
        label="How We Play to Win"
        title="Compliant by Design, Profitable by Default"
        background="secondary"
      >
        <ProcessFlow steps={STEPS} accentColor={ACCENT} />
      </VerticalSection>

      <VerticalSection label="Global Reach" title="45+ Markets, One Operating Model" align="center">
        <div style={{ width: "100%", maxWidth: 900, marginInline: "auto" }}>
          <GeoMap accentColor={ACCENT} />
        </div>
      </VerticalSection>

      <VerticalSection label="By the Numbers" title="iGaming Performance" align="center" background="secondary">
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

      <VerticalSection label="Results" title="Operators We've Scaled">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {STUDIES.map((s) => (
            <CaseStudyCard key={s.slug} {...s} />
          ))}
        </div>
      </VerticalSection>

      <VerticalCTA
        headline="Enter the Arena"
        subtext="Tell us your market — we'll outline the compliant path to scale."
        ctaText="Talk to iGaming"
        accentColor={ACCENT}
      />
    </div>
  );
}
