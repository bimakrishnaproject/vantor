import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { getAboutData } from "@/lib/cms";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About the Network",
  description: "Vantor Ventures owns audience access across 45+ markets, operating media surfaces directly rather than renting attention from third parties.",
};

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", slug: "/" }, { name: "About", slug: "/about" }])} />
      <AboutClient data={data} />
    </>
  );
}
