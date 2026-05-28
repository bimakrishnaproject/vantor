import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "Audio & Podcasting Media Buying",
  description: "Performance audio campaigns spanning podcasts, streaming, and terrestrial radio.",
};

export default async function AudioPage() {
  const data = await getVerticalPageBySlug("audio");

  return (
    <PremiumVerticalPage data={data} slug="audio" breadcrumbName="Audio" />
  );
}
