import styles from "./WaveformAnimation.module.css";

const BARS = Array.from({ length: 32 }, (_, i) => i);

export default function WaveformAnimation() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg className={`${styles.svg} ${styles.wave1}`} viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0 100 Q150 40 300 100 T600 100 T900 100 T1200 100" fill="none" stroke="#00d4ff" strokeWidth="2" opacity="0.08" />
      </svg>
      <svg className={`${styles.svg} ${styles.wave2}`} viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0 100 Q200 160 400 100 T800 100 T1200 100" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.05" />
      </svg>
      <svg className={`${styles.svg} ${styles.wave3}`} viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0 100 Q100 60 200 100 T400 100 T600 100 T800 100 T1000 100 T1200 100" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.04" />
      </svg>

      <div className={styles.equalizer}>
        {BARS.map((i) => (
          <span
            key={i}
            className={styles.bar}
            style={{ animationDelay: `${(i % 8) * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}
