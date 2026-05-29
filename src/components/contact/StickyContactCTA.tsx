"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./StickyContactCTA.module.css";

export default function StickyContactCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        const nextVisible = window.scrollY > window.innerHeight * 0.5;
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
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`}>
      <span className={styles.text}>Need audience access?</span>
      <Button variant="primary" size="sm" href="#booking">Book Access Call</Button>
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
