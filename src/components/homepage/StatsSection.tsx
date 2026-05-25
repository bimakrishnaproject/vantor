import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";
import styles from "./StatsSection.module.css";

interface Stat {
  value: string;
  endValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

const STATS: Stat[] = [
  { value: "250M+", endValue: 250, suffix: "M+", label: "Monthly Impressions" },
  { value: "12K+",  endValue: 12,  suffix: "K+", label: "Campaigns Delivered" },
  { value: "98%",   endValue: 98,  suffix: "%",  label: "Client Retention Rate" },
  { value: "45+",   endValue: 45,  suffix: "+",  label: "Markets Reached" },
  { value: "3.2x",  endValue: 3.2, suffix: "x", decimals: 1, label: "Average ROAS" },
  { value: "$180M", endValue: 180, prefix: "$", suffix: "M", label: "Media Spend Managed" },
];

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <SectionHeading label="By The Numbers" title="Performance at Scale" />
        </div>
        <div className={styles.grid}>
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
      </div>
    </section>
  );
}
