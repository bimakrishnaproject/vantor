import type { CSSProperties } from "react";
import styles from "./GeoMap.module.css";

interface Marker {
  label: string;
  stat: string;
  /** Percentage position relative to the wrapper (0–100). */
  x: number;
  y: number;
}

const MARKERS: Marker[] = [
  { label: "North America", stat: "$18M",   x: 22, y: 38 },
  { label: "LATAM",         stat: "$4.2M",  x: 30, y: 70 },
  { label: "Europe",        stat: "$11M",   x: 50, y: 34 },
  { label: "Africa",        stat: "$1.8M",  x: 52, y: 62 },
  { label: "Asia",          stat: "$6.4M",  x: 72, y: 44 },
  { label: "Oceania",       stat: "$0.6M",  x: 82, y: 76 },
];

interface GeoMapProps {
  accentColor?: string;
}

export default function GeoMap({ accentColor }: GeoMapProps) {
  const style = accentColor
    ? ({ "--gm-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <div className={styles.wrap} style={style}>
      <svg className={styles.map} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        {/* Highly simplified continent silhouettes (decorative only) */}
        <path strokeWidth="1.2" d="M120 110 L210 95 L260 130 L240 190 L160 220 L110 200 Z" />
        <path strokeWidth="1.2" d="M240 250 L300 240 L320 320 L260 360 L210 340 Z" />
        <path strokeWidth="1.2" d="M360 110 L430 95 L470 140 L440 195 L390 215 L355 175 Z" />
        <path strokeWidth="1.2" d="M400 230 L460 230 L500 320 L420 360 L380 290 Z" />
        <path strokeWidth="1.2" d="M520 130 L640 120 L680 200 L600 240 L520 220 Z" />
        <path strokeWidth="1.2" d="M620 280 L700 280 L720 340 L640 350 Z" />
      </svg>

      <div className={styles.dotWrap}>
        {MARKERS.map((m) => (
          <button
            type="button"
            key={m.label}
            className={styles.dot}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            aria-label={`${m.label}: ${m.stat}`}
          >
            <span className={styles.tooltip}>{m.label} · {m.stat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
