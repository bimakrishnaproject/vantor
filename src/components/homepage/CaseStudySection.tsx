import SectionHeading from "@/components/ui/SectionHeading";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import styles from "./CaseStudySection.module.css";

interface CaseStudy {
  title: string;
  client: string;
  category: string;
  slug: string;
  metrics: { label: string; value: string }[];
}

interface CaseStudySectionProps {
  data: CaseStudy[];
}

export default function CaseStudySection({ data }: CaseStudySectionProps) {
  return (
    <section id="case-studies" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading label="Proven Results" title="Case Studies" />
        <div className={styles.grid}>
          {data.map((s) => (
            <CaseStudyCard
              key={s.slug}
              title={s.title}
              client={s.client}
              category={s.category}
              slug={s.slug}
              metrics={s.metrics}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
