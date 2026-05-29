import GlowCard from "@/components/ui/GlowCard";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./PositioningSection.module.css";

const PILLARS = [
  { icon: "⌬", title: "Audience Ownership",  hint: "Sports and entertainment surfaces operated directly by Vantor." },
  { icon: "⇡", title: "Seamless Integration",  hint: "Messages placed by hand into the right feed context." },
  { icon: "⌖", title: "Results Driven", hint: "CPM accountability across 1B+ monthly network views." },
];

interface PositioningProps {
  data: {
    headline: string;
    description: string;
  };
}

export default function PositioningSection({ data }: PositioningProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.label}>Why Vantor Is Different</span>
          <TextReveal tag="h2" className={styles.headline}>
            {data.headline}
          </TextReveal>
          <p className={styles.body}>
            {data.description}
          </p>
        </div>

        <GlowCard glowColor="#00d4ff">
          <div className={styles.pillars}>
            {PILLARS.map((p) => (
              <div key={p.title} className={styles.pillar}>
                <span className={styles.pillarIcon} aria-hidden="true">{p.icon}</span>
                <div className={styles.pillarText}>
                  <span className={styles.pillarTitle}>{p.title}</span>
                  <span className={styles.pillarHint}>{p.hint}</span>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
