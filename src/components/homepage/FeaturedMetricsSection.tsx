import SectionHeading from "@/components/ui/SectionHeading";
import MetricRow from "@/components/ui/MetricRow";
import styles from "./FeaturedMetricsSection.module.css";

interface Metric {
  label: string;
  value: string;
  trend: string;
}

interface FeaturedMetricsProps {
  data: {
    title: string;
    metrics: Metric[];
  };
}

// Convert string trend to number based on some logic, or change MetricRow to accept strings. 
// Wait, let's see MetricRow first or just mock the maxValue for now since it expects maxValue.
// Or we just map the data to the format MetricRow expects.

export default function FeaturedMetricsSection({ data }: FeaturedMetricsProps) {
  const formattedMetrics = data.metrics.map(m => ({
    label: m.label,
    value: m.value,
    maxValue: 10 // Mock max value since MetricRow expects it
  }));

  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.inner}>
        <SectionHeading
          label="Performance Metrics"
          title={data.title}
        />
        <MetricRow metrics={formattedMetrics} />
      </div>
    </section>
  );
}
