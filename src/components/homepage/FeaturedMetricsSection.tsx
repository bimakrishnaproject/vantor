import SectionHeading from "@/components/ui/SectionHeading";
import MetricRow from "@/components/ui/MetricRow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./FeaturedMetricsSection.module.css";

interface Metric {
  label: string;
  value: string;
  trend: string;
  subtext?: string;
}

interface FeaturedMetricsProps {
  data: {
    title: string;
    metrics: Metric[];
  };
}

export default function FeaturedMetricsSection({ data }: FeaturedMetricsProps) {
  const formattedMetrics = data.metrics.map(m => ({
    label: m.label,
    value: m.value,
    subtext: m.subtext,
    maxValue: 100 // Updated mock max value for percentages
  }));

  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.inner}>
        <ScrollReveal animation="fade-up">
          <SectionHeading
            label="Performance Metrics"
            title={data.title}
          />
        </ScrollReveal>
        
        <ScrollReveal animation="3d-float" delay={0.1}>
          <MetricRow metrics={formattedMetrics} />
        </ScrollReveal>
      </div>
    </section>
  );
}
