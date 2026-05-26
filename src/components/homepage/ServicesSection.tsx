import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import styles from "./ServicesSection.module.css";

const SERVICES = [
  {
    title: "Audio",
    description: "Programmatic audio, podcasts, streaming.",
    icon: <AudioIcon />,
    href: "/audio",
    accent: "#00d4ff",
  },
  {
    title: "eCommerce",
    description: "Turn ad spend into measurable revenue.",
    icon: <CommerceIcon />,
    href: "/ecommerce",
    accent: "#ff6b35",
  },
  {
    title: "Mobile Apps",
    description: "Downloads, engagement, retention.",
    icon: <MobileIcon />,
    href: "/mobile-apps",
    accent: "#00e88f",
    highlighted: true,
  },
  {
    title: "Casinos",
    description: "Compliant iGaming across regulated markets.",
    icon: <CasinoIcon />,
    href: "/casinos",
    accent: "#f0c040",
  },
  {
    title: "Other",
    description: "Beyond the verticals — modular campaigns.",
    icon: <NetworkIcon />,
    href: "/other",
    accent: "#a855f7",
  },
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
              highlighted={"highlighted" in s && s.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AudioIcon() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
      <path
        d="M26 46c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8Zm0 0V18l24-4v28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 42c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 14v28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CommerceIcon() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
      <path
        d="M14 18h5l4 20h22l4-14H25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="48" r="4" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="44" cy="48" r="4" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M19 18h3l2.5 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
      <rect
        x="19"
        y="10"
        width="26"
        height="44"
        rx="6"
        ry="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path d="M27 18h10" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M27 46h10" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <circle cx="32" cy="39" r="2" fill="currentColor" />
    </svg>
  );
}

function CasinoIcon() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
      <path
        d="M32 10 48 20v24L32 54 16 44V20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path d="M32 10v44M16 20l16 10 16-10" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
      <circle cx="25" cy="24" r="1.8" fill="currentColor" />
      <circle cx="39" cy="24" r="1.8" fill="currentColor" />
      <circle cx="32" cy="34" r="1.8" fill="currentColor" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
      <circle cx="32" cy="32" r="4" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M32 16v8M32 40v8M16 32h8M40 32h8M21 21l5 5M38 38l5 5M43 21l-5 5M26 38l-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="48" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="16" cy="48" r="3" fill="none" stroke="currentColor" strokeWidth="2.25" />
      <circle cx="48" cy="48" r="3" fill="none" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  );
}
