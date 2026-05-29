import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "Custom Audience Surfaces",
  description: "Owned clipping, culture, and niche media surfaces for audiences standard buys cannot reach.",
};

export default async function OtherPage() {
  const data = await getVerticalPageBySlug("other");

  return (
    <PremiumVerticalPage data={data} slug="other" breadcrumbName="Custom Audience Surfaces" />
  );
}
