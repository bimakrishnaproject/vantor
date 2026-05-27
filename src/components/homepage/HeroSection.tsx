import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import styles from "./HeroSection.module.css";

const PARTICLES = [
  { top: "18%", left: "12%", delay: "0s",   size: 5 },
  { top: "28%", left: "84%", delay: "1.2s", size: 4 },
  { top: "62%", left: "22%", delay: "0.6s", size: 3 },
  { top: "74%", left: "70%", delay: "2.4s", size: 6 },
  { top: "44%", left: "92%", delay: "1.8s", size: 3 },
  { top: "56%", left: "8%",  delay: "3.0s", size: 4 },
];

interface HeroProps {
  data: {
    label: string;
    headline: string;
    subtext: string;
    cta: {
      text: string;
      link: string;
    };
  };
}

export default function HeroSection({ data }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.stadiumGlow} />
        <div className={styles.floodlights} />
        <div className={styles.gridOverlay} />
        <div className={styles.grain} />
        <div className={styles.particles}>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <span className={styles.label}>{data.label}</span>
        <TextReveal tag="h1" className={styles.headline}>
          {data.headline}
        </TextReveal>
        <p className={styles.subtext}>
          {data.subtext}
        </p>
        <div className={styles.cta}>
          <Button variant="primary" size="lg" href={data.cta.link}>
            {data.cta.text}
          </Button>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <span className={styles.scrollChevron} aria-hidden="true">↓</span>
      </div>
    </section>
  );
}
