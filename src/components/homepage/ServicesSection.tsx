import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import styles from "./ServicesSection.module.css";

const SERVICES = [
  { title: "Audio",       description: "Programmatic audio, podcasts, streaming.", icon: "🎵", href: "/audio",       accent: "#00d4ff" },
  { title: "eCommerce",   description: "Turn ad spend into measurable revenue.",   icon: "🛒", href: "/ecommerce",   accent: "#ff6b35" },
  { title: "Mobile Apps", description: "Downloads, engagement, retention.",        icon: "📱", href: "/mobile-apps", accent: "#00e88f" },
  { title: "Casinos",     description: "Compliant iGaming across regulated markets.", icon: "🎰", href: "/casinos",  accent: "#f0c040" },
  { title: "Other",       description: "Beyond the verticals — modular campaigns.", icon: "📡", href: "/other",      accent: "#a855f7" },
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
