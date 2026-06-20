"use client";

import { useState } from "react";
import styles from "./CaseStudyCard.module.css";

export interface CaseStudyMetric {
  label: string;
  value: string;
}

interface CaseStudyCardProps {
  title: string;
  client: string;
  image?: string;
  metrics: CaseStudyMetric[];
  slug: string;
  category: string;
}

export default function CaseStudyCard({
  title,
  client,
  metrics,
  category,
}: CaseStudyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={`${styles.card} card-3d ${isExpanded ? styles.expanded : ""}`}
      aria-expanded={isExpanded}
    >
      <div className={styles.body}>
        <div className={styles.headerRow}>
          <div>
            <span className={styles.badge}>{category}</span>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.client}>{client}</span>
          </div>
          <span className={styles.expandIcon} aria-hidden="true">
            {isExpanded ? "−" : "+"}
          </span>
        </div>
        
        <div className={styles.metrics}>
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Expandable Content Area */}
        <div className={`${styles.expandableContent} ${isExpanded ? styles.showContent : ""}`}>
          <p className={styles.caseStudyText}>
            We engineered a targeted network placement strategy across our owned {category.toLowerCase()} surfaces to achieve unprecedented results for this campaign. By engaging communities naturally within their own feeds, we bypassed traditional ad friction and delivered high-intent audiences directly to the conversion point.
          </p>
        </div>
      </div>
    </button>
  );
}
