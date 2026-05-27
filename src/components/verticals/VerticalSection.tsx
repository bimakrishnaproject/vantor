import type { ReactNode } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./VerticalSection.module.css";

interface VerticalSectionProps {
  label?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  background?: "primary" | "secondary";
  id?: string;
  children: ReactNode;
}

export default function VerticalSection({
  label,
  title,
  description,
  align = "left",
  background = "primary",
  id,
  children,
}: VerticalSectionProps) {
  const bgClass = background === "secondary" ? styles.bgSecondary : styles.bgPrimary;

  return (
    <section id={id} className={`${styles.section} ${bgClass}`}>
      <div className={styles.inner}>
        <ScrollReveal animation="fade-up">
          {(label || title) && (
            <SectionHeading
              label={label}
              title={title ?? ""}
              description={description}
              align={align}
            />
          )}
        </ScrollReveal>
        
        <ScrollReveal animation="3d-float" delay={0.1}>
          {children}
        </ScrollReveal>
      </div>
    </section>
  );
}

