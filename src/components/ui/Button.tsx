import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  children,
  className = "",
  onClick,
  showArrow = true,
  type = "button",
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {showArrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
