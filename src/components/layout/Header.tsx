"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import BrandLogo from "@/components/ui/BrandLogo";
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
      <BrandLogo variant="logo2" className={styles.logo} width={44} height={44} />

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
          <div className={styles.overlayPanel}>
            <div className={styles.overlayTop}>
              <BrandLogo variant="logo2" className={styles.overlayLogo} width={34} height={34} />
              <button
                type="button"
                className={styles.overlayClose}
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className={styles.overlayIntro}>
              <p className={styles.overlayKicker}>Premium media buying ecosystem</p>
              <p className={styles.overlayTitle}>Navigate with clarity.</p>
              <p className={styles.overlayBody}>
                Explore the core verticals, learn more about the team, or start a project.
              </p>
            </div>

            <nav className={styles.overlayNav} aria-label="Mobile primary">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.overlayLink} ${active ? styles.overlayLinkActive : ""}`}
                    style={{ animationDelay: `${i * 55}ms` }}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    <span className={styles.overlayLinkArrow} aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>

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
        </div>
      )}
    </header>
  );
}
