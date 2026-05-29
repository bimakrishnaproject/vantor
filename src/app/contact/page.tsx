import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { getContactData } from "@/lib/cms";
import ContactForm from "@/components/contact/ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Request Network Access",
  description: "Request direct placement inside Vantor Ventures owned audience network.",
};

export default async function ContactPage() {
  const data = await getContactData();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Contact", slug: "/contact" }])} />
      
      {/* Cinematic Background */}
      <div className={styles.fixedBackgroundLayer} aria-hidden="true">
        {/* We use a static frame from the sequence for the cinematic contact page */}
        <img src="/assets/frames/frame_0001.jpg" alt="" className={styles.bgImage} />
        <div className={styles.vignette} />
      </div>

      <section className={styles.splitSection}>
        <div className={styles.splitLeft}>
          <div className={styles.heroText}>
            <span className={styles.label}>{data.hero.label}</span>
            <h1 className={styles.headline}>{data.hero.headline}</h1>
            <p className={styles.subtext}>{data.hero.description}</p>
          </div>
          
          <div className={styles.contactInfo}>
            <h2 className={styles.asideTitle}>{data.info.title}</h2>
            {data.info.offices.map((office: any) => (
              <div key={office.city} className={styles.contactRow}>
                <span className={styles.contactLabel}>{office.city}</span>
                <span className={styles.contactValue}>{office.email}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.splitRight}>
          <div className={styles.glassPanel}>
            <h2 className={styles.panelTitle}>Request Access</h2>
            <ContactForm formConfig={data.form} />
          </div>
        </div>
      </section>
    </>
  );
}
