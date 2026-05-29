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
    let ticking = false;
    let frame: number | null = null;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const nextScrolled = y > 96;
        const scrollingDown = y > lastScrollY.current + 8;
        const scrollingUp = y < lastScrollY.current - 8;

        setScrolled((current) =>
          current === nextScrolled ? current : nextScrolled,
        );

        if (y > 320 && scrollingDown) {
          setHidden((current) => (current ? current : true));
        } else if (scrollingUp || y <= 240) {
          setHidden((current) => (current ? false : current));
        }

        lastScrollY.current = y;
        ticking = false;
        frame = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
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
    <>
      <header className={headerClass}>
      <BrandLogo
        variant="logo2"
        className={styles.logo}
        width={44}
        height={44}
      />

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
          Request Access
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
      </header>

      {menuOpen && (
        <div className={styles.overlay}>
          <div className={styles.overlayPanel}>
            <div className={styles.overlayTop}>
              <BrandLogo
                variant="logo2"
                className={styles.overlayLogo}
                width={34}
                height={34}
              />
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
              <p className={styles.overlayKicker}>
                Owned audience infrastructure
              </p>
              <p className={styles.overlayTitle}>Enter the network.</p>
              <p className={styles.overlayBody}>
                Explore owned audience layers, see how placement works, or
                request access.
              </p>
            </div>

            <nav className={styles.overlayNav} aria-label="Mobile primary">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.overlayLink} ${active ? styles.overlayLinkActive : ""}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    <span
                      className={styles.overlayLinkArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className={`${styles.cta} ${styles.overlayCta}`}
              onClick={() => setMenuOpen(false)}
            >
              Request Access
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
