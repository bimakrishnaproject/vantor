import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import styles from "./ServicesSection.module.css";

const AudioIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M9 18a2 2 0 1 1-2-2v-7l10-2v6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
    <circle cx="7" cy="18" r="1.4" fill="currentColor" opacity="0.15" />
    <circle cx="17" cy="15" r="1.4" fill="currentColor" opacity="0.15" />
  </svg>
);

const CommerceIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 6h14l-1.5 8H7.5L5 6Z"
      fill="currentColor"
      opacity="0.12"
    />
    <path
      d="M3.5 4.5h2l1.5 9h10l2-7H6.2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
    <circle cx="9" cy="18.5" r="1.4" fill="currentColor" opacity="0.2" />
    <circle cx="16" cy="18.5" r="1.4" fill="currentColor" opacity="0.2" />
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="7"
      y="3.5"
      width="10"
      height="17"
      rx="2.5"
      fill="currentColor"
      opacity="0.12"
    />
    <rect
      x="7"
      y="3.5"
      width="10"
      height="17"
      rx="2.5"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="17.2" r="0.9" fill="currentColor" />
  </svg>
);

const CasinoIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="3"
      fill="currentColor"
      opacity="0.12"
    />
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="3"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
    <circle cx="9" cy="9" r="1.2" fill="currentColor" opacity="0.8" />
    <circle cx="15" cy="9" r="1.2" fill="currentColor" opacity="0.6" />
    <circle cx="9" cy="15" r="1.2" fill="currentColor" opacity="0.6" />
    <circle cx="15" cy="15" r="1.2" fill="currentColor" opacity="0.8" />
  </svg>
);

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M7 7l5 5m0 0 5-5m-5 5v6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
    <circle cx="7" cy="7" r="2" fill="currentColor" opacity="0.2" />
    <circle cx="17" cy="7" r="2" fill="currentColor" opacity="0.2" />
    <circle cx="12" cy="18" r="2" fill="currentColor" opacity="0.25" />
  </svg>
);

const SERVICES = [
  { title: "Audio",       description: "Programmatic audio, podcasts, streaming.", icon: <AudioIcon />,   href: "/audio",       accent: "#00d4ff" },
  { title: "eCommerce",   description: "Turn ad spend into measurable revenue.",   icon: <CommerceIcon />, href: "/ecommerce",   accent: "#ff6b35" },
  { title: "Mobile Apps", description: "Downloads, engagement, retention.",        icon: <MobileIcon />,  href: "/mobile-apps", accent: "#00e88f", highlight: true },
  { title: "Casinos",     description: "Compliant iGaming across regulated markets.", icon: <CasinoIcon />,  href: "/casinos",  accent: "#f0c040" },
  { title: "Other",       description: "Beyond the verticals — modular campaigns.", icon: <NetworkIcon />, href: "/other",      accent: "#a855f7" },
];

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <SectionHeading
            label="Our Ecosystem"
            title="Five Verticals, One Vision"
            align="center"
          />
        </div>
        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              description={s.description}
              icon={s.icon}
              href={s.href}
              accentColor={s.accent}
              highlight={s.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
