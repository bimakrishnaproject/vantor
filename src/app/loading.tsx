import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrap} role="status" aria-label="Loading">
      <span className={styles.logo} aria-hidden="true">V</span>
      <div className={styles.bar} aria-hidden="true" />
    </div>
  );
}
