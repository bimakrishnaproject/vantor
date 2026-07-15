import dynamic from "next/dynamic";
import HeroScrollSequence from "./components/HeroScrollSequence";

// Dynamically import all sections below the fold for performance
const PositioningSection = dynamic(() => import("./components/PositioningSection"), { ssr: true });
const NetworkScale = dynamic(() => import("./components/NetworkScale"), { ssr: true });
const VerticalsSection = dynamic(() => import("./components/VerticalsSection"), { ssr: true });
const ProcessSection = dynamic(() => import("./components/ProcessSection"), { ssr: true });
const CampaignShowcase = dynamic(() => import("./components/CampaignShowcase"), { ssr: true });
const AboutAndContact = dynamic(() => import("./components/AboutAndContact"), { ssr: true });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-clip w-full">
      {/* Hero loaded eagerly */}
      <HeroScrollSequence />
      
      {/* Sections loaded dynamically as they approach viewport */}
      <PositioningSection />
      <NetworkScale />
      <VerticalsSection />
      <ProcessSection />
      <CampaignShowcase />
      <AboutAndContact />
    </main>
  );
}
