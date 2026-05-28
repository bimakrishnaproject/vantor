import type { Metadata } from "next";
import { getVerticalPageBySlug } from "@/lib/cms";
import PremiumVerticalPage from "@/components/verticals/PremiumVerticalPage";

export const metadata: Metadata = {
  title: "Mobile App User Acquisition",
  description: "Driving high-LTV installs and post-install engagement at scale.",
};

export default async function MobileAppsPage() {
  const data = await getVerticalPageBySlug("mobile-apps");

  return (
    <PremiumVerticalPage data={data} slug="mobile-apps" breadcrumbName="Mobile Apps" />
  );
}
