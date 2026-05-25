"use client";

import { useRef } from "react";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import styles from "./ParallaxImage.module.css";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.2,
  className = "",
  priority = false,
}: ParallaxImageProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  useParallax(innerRef, speed);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div ref={innerRef} className={styles.inner}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={styles.image}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
