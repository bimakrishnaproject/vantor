"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Track whether this is a route change (not initial mount)
  const isFirstMount = useRef(true);
  const [animating, setAnimating] = useState(false);
  const prevPath = useRef(pathname);

  const [stage, setStage] = useState<"idle" | "active" | "done">("idle");

  useEffect(() => {
    // Skip the very first mount — do NOT fade in on initial page load.
    // The hero section's position:fixed children inherit opacity from
    // ancestor stacking contexts, so opacity:0 here = invisible hero.
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    setAnimating(true);
    setStage("active");
    const t1 = window.setTimeout(() => setStage("done"), 350);
    const t2 = window.setTimeout(() => {
      setStage("idle");
      setAnimating(false);
    }, 700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  const barClass = stage === "active"
    ? `${styles.bar} ${styles.barActive}`
    : stage === "done"
    ? `${styles.bar} ${styles.barDone}`
    : styles.bar;

  // On initial load: use plain .wrapper (opacity:1, no animation)
  // On route change: use .wrapperAnimate (fades in from 0)
  const wrapperClass = animating ? styles.wrapperAnimate : styles.wrapper;

  return (
    <>
      <div className={barClass} aria-hidden="true" />
      <div key={pathname} className={wrapperClass}>
        {children}
      </div>
    </>
  );
}
