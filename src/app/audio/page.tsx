import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "Audio Audience Access",
  description: "Owned music and culture audience surfaces for direct audio placement.",
};

export default async function AudioPage() {
  const data = await getVerticalPageBySlug("audio");

  return (
    <PremiumVerticalPage data={data} slug="audio" breadcrumbName="Audio" />
  );
}
