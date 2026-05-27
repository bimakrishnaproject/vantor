import type { CSSProperties, ReactNode } from "react";
import styles from "./FeatureGrid.module.css";

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeatureGridProps {
  items: FeatureItem[];
  accentColor?: string;
}

export default function FeatureGrid({ items, accentColor }: FeatureGridProps) {
  const style = accentColor
    ? ({ "--fg-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <div className={styles.grid} style={style}>
      {items.map((item) => (
        <div key={item.title} className={`${styles.feature} card-3d`}>
          <span className={styles.icon} aria-hidden="true">{item.icon}</span>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

