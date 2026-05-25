import Button from "@/components/ui/Button";
import styles from "./not-found.module.css";

const PARTICLES = [
  { top: "12%", left: "8%",  delay: "0s"   },
  { top: "22%", left: "82%", delay: "1.4s" },
  { top: "68%", left: "16%", delay: "0.7s" },
  { top: "74%", left: "74%", delay: "2.1s" },
  { top: "44%", left: "92%", delay: "1.8s" },
];

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          />
        ))}
      </div>
      <span className={styles.code}>404</span>
      <h1 className={styles.message}>This page is out of play</h1>
      <p className={styles.subtext}>
        The play you ran doesn&apos;t exist on the field. Head back to the home stadium.
      </p>
      <Button variant="primary" size="lg" href="/">
        Return Home
      </Button>
    </div>
  );
}
