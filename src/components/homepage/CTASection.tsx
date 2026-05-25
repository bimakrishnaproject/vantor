import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./CTASection.module.css";

const STREAKS = [
  { left: "12%", top: "20%", delay: "0s"   },
  { left: "28%", top: "70%", delay: "1.2s" },
  { left: "46%", top: "30%", delay: "0.6s" },
  { left: "68%", top: "75%", delay: "2.0s" },
  { left: "84%", top: "25%", delay: "1.6s" },
];

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.streaks} aria-hidden="true">
        {STREAKS.map((s, i) => (
          <span
            key={i}
            className={styles.streak}
            style={{ left: s.left, top: s.top, animationDelay: s.delay }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <span className={styles.label}>Let&apos;s Build Together</span>
        <TextReveal tag="h2" className={styles.headline}>
          Ready to Fill the Stadium?
        </TextReveal>
        <p className={styles.subtext}>
          Let&apos;s build your next high-performance campaign together.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" href="/contact">
            Start a Project
          </Button>
          <Button variant="outline" size="lg" href="#case-studies">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}
