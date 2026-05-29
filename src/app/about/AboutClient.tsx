import CinematicScroller, { CinematicBlockData } from "@/components/layout/CinematicScroller";

interface AboutClientProps {
  data: {
    hero: {
      headline: string;
      description: string;
    };
    mission: {
      description: string;
    };
    team: {
      title: string;
      members: {
        name: string;
        role: string;
      }[];
    };
    stats: {
      label: string;
      value: string;
      endValue?: number;
      prefix?: string;
      suffix?: string;
      decimals?: number;
    }[];
    partners: {
      title: string;
      logos: string[];
    };
    cta?: {
      headline: string;
      subtext: string;
      buttonText: string;
      buttonLink: string;
    };
  };
}

export default function AboutClient({ data }: AboutClientProps) {
  const blocks: CinematicBlockData[] = [
    // 1. Hero Block
    {
      id: "about-hero",
      label: "Vantor Ventures",
      title: data.hero.headline,
      description: data.hero.description,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      startPercent: 0,
      endPercent: 0.15,
    },
    // 2. The Mission Quote
    {
      id: "about-mission",
      title: "The Mission",
      description: data.mission.description,
      top: "50%",
      left: "10%",
      transform: "translateY(-50%)",
      textAlign: "left",
      startPercent: 0.20,
      endPercent: 0.35,
    },
    // 3. Exec Profile
    {
      id: "about-exec",
      label: data.team.members[0]?.role || "Leadership",
      title: data.team.members[0]?.name || "From the Desk",
      description: "Operating audience access, placement control, compliance, and hands-on execution across the network.",
      top: "50%",
      left: "auto",
      right: "10%",
      transform: "translateY(-50%)",
      textAlign: "right",
      startPercent: 0.45,
      endPercent: 0.60,
    },
    // 4. Scale/Stats
    {
      id: "about-scale",
      label: "Owned Scale",
      title: "The Audience Layer in Operation",
      description: data.stats.map(s => `${s.prefix || ""}${s.value}${s.suffix || ""} ${s.label}`).join(" | "),
      top: "50%",
      left: "50%",
      transform: "translateX(-50%)",
      textAlign: "center",
      maxWidth: "900px",
      startPercent: 0.70,
      endPercent: null, // Stays at the end inside the scoreboard
    }
  ];

  return <CinematicScroller blocks={blocks} />;
}
