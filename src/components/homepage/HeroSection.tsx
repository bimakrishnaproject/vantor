import CinematicScroller, { CinematicBlockData } from "@/components/layout/CinematicScroller";

interface HeroProps {
  data: {
    label: string;
    headline: string;
    subtext: string;
    cta: { text: string; link: string };
    metrics?: { value: string; label: string }[];
  };
}

export default function HeroSection({ data }: HeroProps) {
  const blocks: CinematicBlockData[] = [
    {
      id: "hero",
      label: data.label,
      title: data.headline,
      description: data.subtext,
      top: "75%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      startPercent: 0,
      endPercent: 0.1,
    },
    {
      id: "pillar1",
      title: "Think Bigger",
      description: "Backed by 1B+ monthly views and 60M+ followers, our network gives brands access to the kind of reach that moves the needle.",
      top: "80%",
      left: "10%",
      transform: "translateY(-50%)",
      textAlign: "left",
      startPercent: 0.20,
      endPercent: 0.30,
    },
    {
      id: "pillar2",
      title: "Unparalleled Engagement",
      description: "Real communities engage differently. When audiences are built around genuine interest, 5-10% engagement isn't a target, it's our baseline.",
      top: "80%",
      left: "auto",
      right: "10%",
      transform: "translateY(-50%)",
      textAlign: "right",
      startPercent: 0.40,
      endPercent: 0.50,
    },
    {
      id: "pillar3",
      title: "Seamless Integration",
      description: "Audiences can smell inauthenticity and they scroll past it instantly. Every placement is crafted around the page it lives on, so the brand feels like a natural part of the feed, not an interruption.",
      top: "80%",
      left: "10%",
      transform: "translateY(-50%)",
      textAlign: "left",
      startPercent: 0.60,
      endPercent: 0.70,
    },
    {
      id: "pillar4",
      title: "Reach That Converts",
      description: "Our owned audience infrastructure gives brands direct access to the largest and most engaged fan communities in sports & entertainment.",
      metrics: [
        { value: "1B+", label: "Monthly Views" },
        { value: "60M+", label: "Followers" },
        { value: "5-10%", label: "Engagement" }
      ],
      cta: data.cta,
      top: "70%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      maxWidth: "900px",
      startPercent: 0.80,
      endPercent: null,
    }
  ];

  return <CinematicScroller blocks={blocks} />;
}
