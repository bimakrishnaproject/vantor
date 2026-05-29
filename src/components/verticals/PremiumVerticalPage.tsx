import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import VerticalHero from "@/components/verticals/VerticalHero";
import VerticalHeroVisual from "@/components/verticals/VerticalHeroVisual";
import VerticalSection from "@/components/verticals/VerticalSection";
import VerticalCTA from "@/components/verticals/VerticalCTA";
import FeatureGrid from "@/components/verticals/FeatureGrid";
import ProcessFlow from "@/components/verticals/ProcessFlow";
import StatCard from "@/components/ui/StatCard";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import styles from "./PremiumVerticalPage.module.css";

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
  const accentColor = data.hero.accentColor;
  const topMetrics = data.stats.items.slice(0, 2);
  const featureItems = data.features.items.map((item) => ({
    title: item.title,
    description: item.description ?? item.text ?? "",
    icon: item.icon ?? "•",
  }));

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

      <VerticalHero
        label={data.hero.label ?? "Media Network"}
        headline={data.hero.headline}
        description={data.hero.description}
        accentColor={accentColor}
        ctaText={data.hero.ctaText}
        visual={<VerticalHeroVisual slug={slug} />}
      />

      {['audio', 'other'].includes(slug) && (
        <VerticalSection
          label={data.features.label}
          title={data.features.title}
          align="center"
          background="secondary"
        >
          <FeatureGrid items={featureItems} accentColor={accentColor} />
        </VerticalSection>
      )}

      {['ecommerce', 'mobile-apps', 'casinos'].includes(slug) && (
        <VerticalSection
          label={data.process.label}
          title="From Access to Placement"
          background="primary"
        >
          <div className={styles.processShell}>
            <ProcessFlow steps={data.process.steps} accentColor={accentColor} />
          </div>
        </VerticalSection>
      )}

      <VerticalSection
        label={data.stats.label}
        title={data.stats.title}
        align="center"
        background="secondary"
      >
        <div className={styles.statsGrid}>
          {data.stats.items.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              endValue={stat.endValue}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              label={stat.label}
              delay={index * 100}
            />
          ))}
        </div>
      </VerticalSection>

      <VerticalSection
        label={data.caseStudies.label}
        title={data.caseStudies.title}
      >
        <div className={styles.caseGrid}>
          {data.caseStudies.items.map((study) => (
            <CaseStudyCard key={study.slug} {...study} />
          ))}
        </div>
      </VerticalSection>

      <VerticalCTA
        headline={data.cta.headline}
        subtext={data.cta.subtext}
        ctaText={data.cta.ctaText}
        accentColor={accentColor}
      />
    </>
  );
}
