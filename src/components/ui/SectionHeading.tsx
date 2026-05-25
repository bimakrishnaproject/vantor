import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  gradient?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  gradient = false,
  className = "",
}: SectionHeadingProps) {
  const classes = [styles.heading, styles[align], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {label && (
        <span className={styles.label} data-animate="label">
          {label}
        </span>
      )}
      <h2
        className={`${styles.title} ${gradient ? styles.gradient : ""}`}
        data-animate="title"
      >
        {title}
      </h2>
      {description && (
        <p className={styles.description} data-animate="description">
          {description}
        </p>
      )}
    </div>
  );
}
