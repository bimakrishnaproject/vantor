import type { CSSProperties } from "react";
import styles from "./ProcessFlow.module.css";

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  accentColor?: string;
}

export default function ProcessFlow({ steps, accentColor }: ProcessFlowProps) {
  const style = accentColor
    ? ({ "--pf-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <ol className={styles.flow} style={style}>
      {steps.map((step) => (
        <li key={step.number} className={styles.step}>
          <span className={styles.number} aria-hidden="true">
            {String(step.number).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.description}>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
