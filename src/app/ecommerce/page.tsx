import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "eCommerce Performance Marketing",
  description: "Data-driven eCommerce campaigns delivering 4.8x ROAS. Social commerce, search, marketplace, and retargeting at scale.",
};

export default async function EcommercePage() {
  const data = await getVerticalPageBySlug("ecommerce");

  return (
    <PremiumVerticalPage data={data} slug="ecommerce" breadcrumbName="eCommerce" />
  );
}
