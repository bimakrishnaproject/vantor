import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import styles from "./about.module.css";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";

const TEAM = [
  { name: "Maya Aldenrott", role: "Chief Strategy Officer" },
  { name: "Liam Carrington", role: "Head of Audio" },
  { name: "Priya Vellanki",  role: "Head of eCommerce" },
  { name: "Tomas Riihelä",   role: "Head of Mobile" },
  { name: "Idris Okafor",    role: "Head of iGaming" },
  { name: "Sofia Bianchi",   role: "Head of Creative" },
  { name: "Rashid Asker",    role: "Head of Analytics" },
  { name: "Elena Vargas",    role: "Head of Operations" },
];

const VALUES = [
  { icon: "◇", title: "Performance",  description: "Measurable outcomes, not vanity dashboards." },
  { icon: "◈", title: "Craft",        description: "Strategy and creative held to the same bar." },
  { icon: "◆", title: "Partnership",  description: "Long-term collaboration, short feedback loops." },
];

const PARTNERS = Array.from({ length: 10 }, (_, i) => `Partner ${i + 1}`);

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Vantor Ventures. A full-spectrum media buying powerhouse operating across 45+ markets and 5 continents.",
};

export default function AboutPage() {
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
              <h1 className={styles.execName}>Alex Vantor</h1>
              <span className={styles.execTitle}>Founder &amp; CEO</span>
              <p className={styles.execBio}>
                Vantor Ventures was built on a simple bet: that the next generation of
                media buying lives at the intersection of cinematic creative, hard
                performance science, and operational rigour.
              </p>
              <p className={styles.execBio}>
                Today we operate across five continents, run four core verticals, and
                obsess about one thing — the unit economics of every dollar our clients
                spend with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`${styles.section} ${styles.bgSecondary}`}>
        <div className={styles.inner}>
          <SectionHeading label="Our Team" title="The People Behind the Numbers" />
          <div className={styles.teamGrid}>
            {TEAM.map((m) => (
              <div key={m.name} className={styles.member}>
                <div className={styles.memberPhoto} aria-hidden="true" />
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
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.value}>
                <span className={styles.valueIcon} aria-hidden="true">{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Scale */}
      <section className={`${styles.section} ${styles.bgSecondary}`}>
        <div className={styles.inner}>
          <SectionHeading label="Network" title="Operating at Scale" align="center" />
          <div className={styles.scaleGrid}>
            <StatCard value="5"     endValue={5}    suffix="" label="Continents" />
            <StatCard value="45+"   endValue={45}   suffix="+" label="Markets" />
            <StatCard value="200+"  endValue={200}  suffix="+" label="Active Partners" />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionHeading label="Partners" title="We Build Alongside" align="center" />
          <div className={styles.partnerGrid}>
            {PARTNERS.map((p, i) => (
              <div key={p} className={styles.partnerLogo} aria-label={p} style={{
                background: `linear-gradient(${135 + i * 18}deg, #2a3a55, #1a253a)`,
              }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
