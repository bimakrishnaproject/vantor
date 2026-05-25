"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./StickyContactCTA.module.css";

export default function StickyContactCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`}>
      <span className={styles.text}>Ready to start?</span>
      <Button variant="primary" size="sm" href="#booking">Book a Call</Button>
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
