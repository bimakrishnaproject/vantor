"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        const nextVisible = window.scrollY > window.innerHeight;
        setVisible((current) => (current === nextVisible ? current : nextVisible));
        frame = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  if (dismissed) return null;

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ""}`}>
      <Link href="/contact" className={styles.cta}>
        Request Access
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
      >
        ✕
      </button>
    </div>
  );
}
