"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);

      if (y > 300 && y > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const headerClass = [
    styles.header,
    scrolled ? styles.scrolled : "",
    hidden && !menuOpen ? styles.hidden : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <Link href="/" className={styles.logo} aria-label="Vantor Ventures home">
        <span className={styles.logoMain}>VANTOR</span>
        <span className={styles.logoSub}>VENTURES</span>
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
              {active && <span className={styles.activeDot} />}
            </Link>
          );
        })}
      </nav>

      <div className={styles.ctaWrap}>
        <Link href="/contact" className={styles.cta}>
          Get Started
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <button
        type="button"
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      />

      {menuOpen && (
        <div className={styles.overlay}>
          {NAV_ITEMS.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.overlayLink} ${active ? styles.overlayLinkActive : ""}`}
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`${styles.cta} ${styles.overlayCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Get Started
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
