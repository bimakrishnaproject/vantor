"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, SERVICE_ITEMS } from "@/lib/navigation";
import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/vantorventures", abbr: "in" },
  { label: "Twitter", href: "https://twitter.com/vantorventures", abbr: "X" },
  { label: "Instagram", href: "https://instagram.com/vantorventures", abbr: "IG" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={`${styles.footer} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Company */}
          <div>
            <Link href="/" aria-label="Vantor Ventures home">
              <span className={styles.logoMain}>VANTOR</span>
              <span className={styles.logoSub}>VENTURES</span>
            </Link>
            <p className={styles.tagline}>
              Premium media buying ecosystem delivering performance at scale.
            </p>
            <div className={styles.social}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className={styles.colTitle}>Navigation</h2>
            <ul className={styles.linkList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className={styles.colTitle}>Services</h2>
            <ul className={styles.linkList}>
              {SERVICE_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className={styles.colTitle}>Contact</h2>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:hello@vantorventures.com" className={styles.link}>
                  hello@vantorventures.com
                </a>
              </li>
              <li className={styles.contactItem}>+1 (555) 000-0000</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Vantor Ventures. All rights reserved.
          </span>
          <div className={styles.legal}>
            <Link href="/" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
