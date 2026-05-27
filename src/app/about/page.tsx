import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { getAboutData } from "@/lib/cms";
import styles from "./about.module.css";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind Vantor Ventures. A full-spectrum media buying powerhouse operating across 45+ markets and 5 continents.",
};

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "About", slug: "/about" }])} />
      {/* Executive */}
      <section className={`${styles.section} ${styles.execSection}`}>
        <div className={styles.inner}>
          <div className={styles.exec}>
            <div className={styles.execPhoto} aria-hidden="true" />
            <div className={styles.execCopy}>
              <span className={styles.label}>Letter from the CEO</span>
              <h1 className={styles.execName}>{data.team.members[0].name}</h1>
              <span className={styles.execTitle}>{data.team.members[0].role}</span>
              <p className={styles.execBio}>
                {data.mission.description}
              </p>
              <p className={styles.execBio}>
                {data.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`${styles.section} ${styles.bgSecondary}`}>
        <div className={styles.inner}>
          <SectionHeading label="Our Team" title={data.team.title} />
          <div className={styles.teamGrid}>
            {data.team.members.map((m: any) => (
              <div key={m.name} className={styles.member}>
                <div className={styles.memberPhoto} aria-hidden="true">{m.imagePlaceholder}</div>
                <h3 className={styles.memberName}>{m.name}</h3>
                <span className={styles.memberRole}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.centered}`}>
          <blockquote className={styles.quote}>
            &ldquo;Strategic by scale, precise by nature.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Network Scale */}
      <section className={`${styles.section} ${styles.bgSecondary}`}>
        <div className={styles.inner}>
          <SectionHeading label="Network" title="Operating at Scale" align="center" />
          <div className={styles.scaleGrid}>
            {data.stats.map((s: any) => (
              <StatCard
                key={s.label}
                value={s.value}
                endValue={s.endValue}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                label={s.label}
                delay={0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading label="Partners" title={data.partners.title} align="center" />
          <div className={styles.partnerGrid}>
            {data.partners.logos.map((p: any, i: number) => (
              <div key={p} className={styles.partnerLogo} aria-label={p} style={{
                background: `linear-gradient(${135 + i * 18}deg, #2a3a55, #1a253a)`,
              }}>
                <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem'}}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
