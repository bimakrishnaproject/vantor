import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { getAboutData } from "@/lib/cms";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind Vantor Ventures. A full-spectrum media buying powerhouse operating across 45+ markets and 5 continents.",
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

