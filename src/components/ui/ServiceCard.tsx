import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  accentColor?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  accentColor,
}: ServiceCardProps) {
  const style = accentColor
    ? ({ "--card-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <Link href={href} className={styles.card} style={style}>
      <span className={styles.iconWrap} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
