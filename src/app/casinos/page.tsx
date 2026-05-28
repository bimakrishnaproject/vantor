import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "Casino & iGaming Media",
  description: "Compliance-first performance marketing for real-money gaming and social casinos.",
};

export default async function CasinosPage() {
  const data = await getVerticalPageBySlug("casinos");

  return (
    <PremiumVerticalPage data={data} slug="casinos" breadcrumbName="Casinos" />
  );
}
