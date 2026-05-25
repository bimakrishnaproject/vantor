import styles from "./FloatingDevice.module.css";

export default function FloatingDevice() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.device}>
        <div className={styles.notch} />
        <div className={styles.screen}>
          <span className={styles.screenLabel}>Installs Today</span>
          <span className={styles.screenBig}>+15M</span>
          <span className={styles.screenSub}>3.2x ROAS · $0.42 CPI</span>
        </div>
      </div>
    </div>
  );
}
