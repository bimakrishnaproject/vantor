import SectionHeading from "@/components/ui/SectionHeading";
import MetricRow from "@/components/ui/MetricRow";
import styles from "./FeaturedMetricsSection.module.css";

const METRICS = [
  { label: "Click-through Rate",     value: "4.2%",  maxValue: 10 },
  { label: "Conversion Rate",        value: "12.8%", maxValue: 20 },
  { label: "Cost Per Acquisition",   value: "-34%",  maxValue: 50 },
  { label: "Return on Ad Spend",     value: "3.2x",  maxValue: 5  },
];

export default function FeaturedMetricsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.inner}>
        <SectionHeading
          label="Performance Metrics"
          title="Numbers That Define Excellence"
        />
        <MetricRow metrics={METRICS} />
      </div>
    </section>
  );
}
