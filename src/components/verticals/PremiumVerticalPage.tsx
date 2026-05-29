import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import CinematicScroller, { CinematicBlockData } from "@/components/layout/CinematicScroller";

interface StatItem {
  value: string;
  endValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

interface CaseStudyItem {
  title: string;
  client: string;
  category: string;
  slug: string;
  metrics: { label: string; value: string }[];
}

interface PremiumVerticalData {
  title: string;
  description: string;
  hero: {
    label?: string;
    headline: string;
    description: string;
    accentColor: string;
    ctaText?: string;
  };
  features: {
    label: string;
    title: string;
    items: { icon?: string; title: string; text?: string; description?: string }[];
  };
  process: {
    label: string;
    title: string;
    steps: { number: number; title: string; description: string }[];
  };
  stats: {
    label: string;
    title: string;
    items: StatItem[];
  };
  caseStudies: {
    label: string;
    title: string;
    items: CaseStudyItem[];
  };
  cta: {
    headline: string;
    subtext?: string;
    ctaText?: string;
  };
}

interface PremiumVerticalPageProps {
  data: PremiumVerticalData;
  slug: string;
  breadcrumbName: string;
}

export default function PremiumVerticalPage({
  data,
  slug,
  breadcrumbName,
}: PremiumVerticalPageProps) {
  
  const blocks: CinematicBlockData[] = [
    // 1. Hero Block (Centered)
    {
      id: "hero",
      label: data.hero.label || "Media Network",
      title: data.hero.headline,
      description: data.hero.description,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      startPercent: 0,
      endPercent: 0.1,
    },
    // 2. Top Feature (Top Left)
    {
      id: "feature",
      label: data.features.label,
      title: data.features.items[0]?.title || data.features.title,
      description: data.features.items[0]?.description || data.features.items[0]?.text || "",
      top: "50%",
      left: "10%",
      transform: "translateY(-50%)",
      textAlign: "left",
      startPercent: 0.15,
      endPercent: 0.25,
    },
    // 3. Process/System (Bottom Right)
    {
      id: "process",
      label: data.process.label,
      title: data.process.steps[0]?.title || data.process.title,
      description: data.process.steps[0]?.description || "",
      top: "50%",
      left: "auto",
      right: "10%",
      transform: "translateY(-50%)",
      textAlign: "right",
      startPercent: 0.35,
      endPercent: 0.45,
    },
    // 4. Key Metric (Center Left)
    {
      id: "stats",
      label: data.stats.label,
      title: `${data.stats.items[0]?.prefix || ""}${data.stats.items[0]?.value || ""}${data.stats.items[0]?.suffix || ""} ${data.stats.items[0]?.label || ""}`,
      description: data.stats.title,
      top: "50%",
      left: "50%",
      transform: "translateX(-50%)",
      textAlign: "center",
      startPercent: 0.55,
      endPercent: 0.65,
    },
    // 5. Final CTA / Case Study (Scoreboard Center)
    {
      id: "cta",
      label: data.caseStudies.items[0] ? `Client: ${data.caseStudies.items[0].client}` : undefined,
      title: data.cta.headline,
      description: data.cta.subtext || "Request access to our owned audience infrastructure.",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      maxWidth: "800px",
      startPercent: 0.75,
      endPercent: null,
    }
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: data.title,
          slug: `/${slug}`,
          description: data.description,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", slug: "/" },
          { name: breadcrumbName, slug: `/${slug}` },
        ])}
      />

      <CinematicScroller blocks={blocks} />
    </>
  );
}
