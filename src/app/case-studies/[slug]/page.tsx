import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const CASE_STUDIES = [
  {
    slug: "streaming-launch",
    title: "Streaming Platform Launch",
    summary:
      "A multi-platform audio campaign that drove record reach and efficient CPV.",
  },
  {
    slug: "fashion-roas",
    title: "Fashion Brand ROAS Boost",
    summary:
      "Full-funnel performance creative that improved ROAS and lifted revenue.",
  },
  {
    slug: "podcast-takeover",
    title: "Podcast Network Takeover",
    summary:
      "A host-read sponsorship strategy that scaled listens across top shows.",
  },
  {
    slug: "marketplace-expansion",
    title: "Marketplace Expansion",
    summary:
      "A marketplace rollout that increased sessions and lifted average order value.",
  },
  {
    slug: "eu-sportsbook",
    title: "EU Sportsbook Scale-Up",
    summary:
      "Compliance-first growth that improved FTDs while lowering CPA.",
  },
  {
    slug: "latam-launch",
    title: "LATAM Casino Launch",
    summary:
      "Regional localization and channel mix optimization that delivered ROAS.",
  },
  {
    slug: "saas-leadgen",
    title: "B2B SaaS Lead Gen",
    summary:
      "Lead-gen velocity improved with tighter audience segmentation and creative.",
  },
  {
    slug: "ctv-brand-lift",
    title: "CTV Brand Lift",
    summary:
      "Brand lift measured via a CTV-heavy mix with validated recall gains.",
  },
] as const;

function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug) ?? null;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Case Study" };

  return {
    title: study.title,
    description: study.summary,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <section style={{ padding: "var(--section-padding)" }}>
      <div
        style={{
          maxWidth: 900,
          marginInline: "auto",
          display: "grid",
          gap: "1.5rem",
        }}
      >
        <SectionHeading
          label="Case Study"
          title={study.title}
          description={study.summary}
        />
        <p style={{ color: "var(--text-secondary)" }}>
          This page is a placeholder for the full case study. Tell us what detail
          you want to showcase and we can build out the full story.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button variant="primary" size="md" href="/contact">
            Talk to Us
          </Button>
          <Link href="/" style={{ alignSelf: "center" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
