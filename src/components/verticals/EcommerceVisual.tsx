import styles from "./EcommerceVisual.module.css";

export function EcommerceBackground() {
  return <div className={styles.gridBg} aria-hidden="true" />;
}

export default function EcommerceVisual() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={`${styles.card} ${styles.card1}`} />
      <div className={`${styles.card} ${styles.card2}`} />
      <div className={`${styles.card} ${styles.card3}`} />
    </div>
  );
}
