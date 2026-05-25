"use client";

import { useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Registers GSAP plugins once for the whole app.
 */
export default function GsapProvider({ children }: { children: ReactNode }) {
  useState(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, useGSAP);
    }
    return null;
  });

  return <>{children}</>;
}
