import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contact/ContactForm";
import StickyContactCTA from "@/components/contact/StickyContactCTA";
import styles from "./contact.module.css";

const SOCIALS = [
  { label: "LinkedIn",  href: "https://linkedin.com/company/vantorventures",  abbr: "in" },
  { label: "Twitter",   href: "https://twitter.com/vantorventures",            abbr: "X"  },
  { label: "Instagram", href: "https://instagram.com/vantorventures",          abbr: "IG" },
];

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start your next high-performance campaign. Contact Vantor Ventures for a strategy session.",
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "Contact", slug: "/contact" }])} />
      <section className={styles.section}>
        <div className={styles.inner}>
          <div>
            <div className={styles.hero}>
              <span className={styles.label}>Contact</span>
              <h1 className={styles.headline}>Let&apos;s Build Together</h1>
              <p className={styles.subtext}>
                Tell us a little about your project. We respond within one business day.
              </p>
            </div>
            <div className={styles.formCard}>
              <ContactForm />
            </div>
          </div>

          <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>Get in Touch</h2>
            <div className={styles.contactList}>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>Email</span>
                <a className={styles.contactValue} href="mailto:hello@vantorventures.com">
                  hello@vantorventures.com
                </a>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>+1 (555) 000-0000</span>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>Address</span>
                <span className={styles.contactValue}>
                  100 Performance Blvd, Suite 400, New York, NY 10001
                </span>
              </div>
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
                Pick a time that works — we&apos;ll meet you there.
              </span>
              <Button
                variant="outline"
                href="https://calendly.com/vantorventures/strategy"
              >
                Book a Strategy Session
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <StickyContactCTA />
    </>
  );
}
