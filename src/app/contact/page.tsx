import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { getContactData } from "@/lib/cms";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contact/ContactForm";
import StickyContactCTA from "@/components/contact/StickyContactCTA";
import styles from "./contact.module.css";

const SOCIALS = [
  { label: "LinkedIn",  href: "https://linkedin.com/company/vantorventures",  abbr: "in" },
  { label: "Twitter",   href: "https://twitter.com/vantorventures",            abbr: "X"  },
  { label: "Instagram", href: "https://instagram.com/vantorventures",          abbr: "IG" },
];

interface Office {
  city: string;
  address: string;
  email: string;
}

export const metadata: Metadata = {
  title: "Request Network Access",
  description: "Request direct placement inside Vantor Ventures owned audience network.",
};

export default async function ContactPage() {
  const data = await getContactData();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Contact", slug: "/contact" }])} />
      <section className={styles.section}>
        <div className={styles.inner}>
          <div>
            <div className={styles.hero}>
              <span className={styles.label}>{data.hero.label}</span>
              <h1 className={styles.headline}>{data.hero.headline}</h1>
              <p className={styles.subtext}>
                {data.hero.description}
              </p>
            </div>
            <div className={styles.formCard}>
              <ContactForm formConfig={data.form} />
            </div>
          </div>

          <aside className={styles.aside}>
            <div className={styles.signalCard} aria-hidden="true">
              <div className={styles.signalTop}>
                <span>Access Desk</span>
                <span>Open</span>
              </div>
              <div className={styles.signalScreen}>
                <span>Audience</span>
                <span>Creative</span>
                <span>Placement</span>
                <span>Scale</span>
              </div>
            </div>

            <h2 className={styles.asideTitle}>{data.info.title}</h2>
            <div className={styles.contactList}>
              {data.info.offices.map((office: Office) => (
                <div key={office.city} style={{ marginBottom: "1.5rem" }}>
                  <div className={styles.contactRow}>
                    <span className={styles.contactLabel}>{office.city}</span>
                    <span className={styles.contactValue}>{office.address}</span>
                  </div>
                  <div className={styles.contactRow}>
                    <span className={styles.contactLabel}>Email</span>
                    <a className={styles.contactValue} href={`mailto:${office.email}`}>
                      {office.email}
                    </a>
                  </div>
                </div>
              ))}
              
              <div className={styles.socials}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={styles.socialLink}
                  >
                    {s.abbr}
                  </a>
                ))}
              </div>
            </div>

            <div id="booking" className={styles.booking}>
              <span className={styles.bookingTitle}>Prefer a call?</span>
              <span className={styles.bookingHint}>
                Pick a time to map the audience surface you need.
              </span>
              <Button
                variant="outline"
                href="https://calendly.com/vantorventures/strategy"
              >
                Book an Access Call
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <StickyContactCTA />
    </>
  );
}
