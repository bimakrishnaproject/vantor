import SectionHeading from "@/components/ui/SectionHeading";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import styles from "./CaseStudySection.module.css";

const STUDIES = [
  {
    title: "Streaming Platform Launch",
    client: "Audio Campaign",
    category: "Audio",
    slug: "streaming-launch",
    metrics: [
      { label: "Reach", value: "+340%" },
      { label: "Impressions", value: "2.1M" },
      { label: "CPV", value: "$0.03" },
    ],
  },
  {
    title: "Fashion Brand ROAS Boost",
    client: "eCommerce",
    category: "eCommerce",
    slug: "fashion-roas",
    metrics: [
      { label: "ROAS", value: "4.8x" },
      { label: "Revenue", value: "+127%" },
      { label: "CPA", value: "-62%" },
    ],
  },
];

export default function CaseStudySection() {
  return (
    <section id="case-studies" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading label="Proven Results" title="Case Studies" />
        <div className={styles.grid}>
          {STUDIES.map((s) => (
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
