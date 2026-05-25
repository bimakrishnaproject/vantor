import GlowCard from "@/components/ui/GlowCard";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./PositioningSection.module.css";

const PILLARS = [
  { icon: "⌬", title: "Data-Driven",  hint: "Every decision modelled, every dollar tracked." },
  { icon: "⇡", title: "Full-Funnel",  hint: "Awareness through retention, on one P&L." },
  { icon: "⌖", title: "Multi-Vertical", hint: "Audio, eCommerce, Mobile, iGaming — one team." },
];

export default function PositioningSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.label}>Who We Are</span>
          <TextReveal tag="h2" className={styles.headline}>
            Strategic by Scale, Precise by Nature
          </TextReveal>
          <p className={styles.body}>
            We are a full-spectrum media buying powerhouse — building campaigns
            that span continents, channels, and verticals while keeping every
            decision rooted in measurable performance.
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
