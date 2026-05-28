import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "Custom Media Buying Solutions",
  description: "Bespoke media strategies for unique verticals, high-ticket items, and specialized markets.",
};

export default async function OtherPage() {
  const data = await getVerticalPageBySlug("other");

  return (
    <PremiumVerticalPage data={data} slug="other" breadcrumbName="Other Solutions" />
  );
}
