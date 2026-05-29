import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./StatsSection.module.css";

interface Stat {
  value: string;
  endValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

interface StatsProps {
  data: Stat[];
}

export default function StatsSection({ data }: StatsProps) {
  const [primary, ...supporting] = data;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal animation="fade-up">
          <div className={styles.header}>
            <span className={styles.kicker}>Think Bigger</span>
            <div className={styles.titleRow}>
              <h2>1B+ Monthly Views, 60M+ Followers</h2>
              <p>
                Owned sports and entertainment communities with direct access,
                hands-on placement, and measurable delivery.
              </p>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up" delay={0.08}>
          <div className={styles.readout}>
            {primary && (
              <div className={styles.primaryMetric}>
                <span className={styles.metricIndex}>01</span>
                <span className={styles.primaryValue}>{primary.value}</span>
                <span className={styles.primaryLabel}>{primary.label}</span>
                <span className={styles.signalLine} aria-hidden="true" />
              </div>
            )}

            <div className={styles.metricGrid}>
              {supporting.map((stat, index) => (
                <div key={stat.label} className={styles.metric}>
                  <span className={styles.metricIndex}>
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <span className={styles.metricValue}>{stat.value}</span>
                  <span className={styles.metricLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
