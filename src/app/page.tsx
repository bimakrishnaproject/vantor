import { getHomepageData } from "@/lib/cms";
import HeroSection from "@/components/homepage/HeroSection";
import FloatingCTA from "@/components/ui/FloatingCTA";

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <main>
      <div id="hero-section">
        <HeroSection data={data.hero} />
      </div>
      <FloatingCTA />
    </main>
  );
}
