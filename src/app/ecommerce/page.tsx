import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "eCommerce Audience Placement",
  description: "Direct product placement inside owned sports, culture, and entertainment feeds.",
};

export default async function EcommercePage() {
  const data = await getVerticalPageBySlug("ecommerce");

  return (
    <PremiumVerticalPage data={data} slug="ecommerce" breadcrumbName="eCommerce" />
  );
}
