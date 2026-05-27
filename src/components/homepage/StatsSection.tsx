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

interface StatsProps {
  data: Stat[];
}

export default function StatsSection({ data }: StatsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <SectionHeading label="By The Numbers" title="Performance at Scale" />
        </div>
        <div className={styles.grid}>
          {data.map((s, i) => (
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
