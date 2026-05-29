import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "Casino & iGaming Audience Access",
  description: "Controlled placement inside owned sports, gaming, and entertainment audience surfaces.",
};

export default async function CasinosPage() {
  const data = await getVerticalPageBySlug("casinos");

  return (
    <PremiumVerticalPage data={data} slug="casinos" breadcrumbName="Casinos" />
  );
}
