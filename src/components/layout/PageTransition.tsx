"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<"idle" | "active" | "done">("idle");
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    setStage("active");
    const t1 = window.setTimeout(() => setStage("done"), 350);
    const t2 = window.setTimeout(() => setStage("idle"), 700);
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

  return (
    <>
      <div className={barClass} aria-hidden="true" />
      <div key={pathname} className={styles.wrapper}>
        {children}
      </div>
    </>
  );
}
