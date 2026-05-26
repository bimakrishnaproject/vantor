import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  accentColor?: string;
  highlighted?: boolean;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  accentColor,
  highlighted = false,
}: ServiceCardProps) {
  const style = accentColor
    ? ({ "--card-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <Link
      href={href}
      className={styles.card}
      style={style}
      data-highlighted={highlighted ? "true" : undefined}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <span className={styles.iconGlow} />
        <span className={styles.iconGlass}>
          <span className={styles.icon}>{icon}</span>
        </span>
      </span>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path
            d="M5 10h9m-3.5-3.5 3.5 3.5-3.5 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
