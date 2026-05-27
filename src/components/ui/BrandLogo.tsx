import Image from "next/image";
import Link from "next/link";
import styles from "./BrandLogo.module.css";

interface BrandLogoProps {
  className?: string;
  variant?: "logo1" | "logo2"; // Allows switching to find the best fit
  width?: number;
  height?: number;
}

export default function BrandLogo({
  className = "",
  variant = "logo2", // Using logo2 as default based on suggestion, can switch later
  width = 180,
  height = 50,
}: BrandLogoProps) {
  const logoSrc = `/assets/${variant}.png`;

  return (
    <Link href="/" className={`${styles.logoContainer} ${className}`} aria-label="Vantor Ventures home">
      <div className={styles.imageWrapper}>
        <Image
          src={logoSrc}
          alt="Vantor Ventures"
          width={width}
          height={height}
          className={styles.logoImage}
          priority
        />
      </div>
    </Link>
  );
}
