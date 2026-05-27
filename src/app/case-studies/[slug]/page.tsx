import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const CASE_STUDIES = [
  {
    slug: "streaming-launch",
    title: "Streaming Platform Launch",
    summary: "A multi-platform audio campaign that drove record reach and efficient CPV.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "Reach", value: "+340%"}, {label: "Impressions", value: "2.1M"}]
  },
  {
    slug: "fashion-roas",
    title: "Fashion Brand ROAS Boost",
    summary: "Full-funnel performance creative that improved ROAS and lifted revenue.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "ROAS", value: "4.8x"}, {label: "Revenue", value: "+127%"}]
  },
  {
    slug: "podcast-takeover",
    title: "Podcast Network Takeover",
    summary: "A host-read sponsorship strategy that scaled listens across top shows.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "Listens", value: "1.5M+"}, {label: "CPA", value: "-25%"}]
  },
  {
    slug: "marketplace-expansion",
    title: "Marketplace Expansion",
    summary: "A marketplace rollout that increased sessions and lifted average order value.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "AOV", value: "+45%"}, {label: "Sessions", value: "3.2M"}]
  },
  {
    slug: "eu-sportsbook",
    title: "EU Sportsbook Scale-Up",
    summary: "Compliance-first growth that improved FTDs while lowering CPA.",
    image: "https://images.unsplash.com/photo-1518091043644-c1d445f412c6?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "FTDs", value: "+180%"}, {label: "CPA", value: "-40%"}]
  },
  {
    slug: "latam-launch",
    title: "LATAM Casino Launch",
    summary: "Regional localization and channel mix optimization that delivered ROAS.",
    image: "https://images.unsplash.com/photo-1596245195341-b49a7338c642?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "ROAS", value: "3.5x"}, {label: "Signups", value: "50k+"}]
  },
  {
    slug: "saas-leadgen",
    title: "B2B SaaS Lead Gen",
    summary: "Lead-gen velocity improved with tighter audience segmentation and creative.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "Leads", value: "+210%"}, {label: "CPL", value: "-55%"}]
  },
  {
    slug: "ctv-brand-lift",
    title: "CTV Brand Lift",
    summary: "Brand lift measured via a CTV-heavy mix with validated recall gains.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "Brand Lift", value: "+42%"}, {label: "Recall", value: "+65%"}]
  },
  {
    slug: "global-campaign",
    title: "Global Campaign Launch",
    summary: "Our flagship media buying strategy applied at a global scale for maximum impact.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    metrics: [{label: "ROAS", value: "4.8x"}, {label: "CPA", value: "-32%"}]
  }
] as const;

function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug) ?? null;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const study = getCaseStudy(resolvedParams.slug);
  if (!study) return { title: "Case Study" };

  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const study = getCaseStudy(resolvedParams.slug);
  if (!study) notFound();

  return (
    <>
      <section style={{ 
        position: "relative", 
        height: "60vh", 
        minHeight: "500px",
        display: "flex",
        alignItems: "flex-end",
        padding: "var(--section-padding)",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
          <Image 
            src={study.image}
            alt={study.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, var(--bg-primary) 0%, rgba(10, 15, 25, 0.5) 50%, transparent 100%)"
          }} />
        </div>
        
        <div style={{ maxWidth: 1200, marginInline: "auto", width: "100%", position: "relative", zIndex: 1 }}>
          <h1 style={{ 
            fontFamily: "var(--font-heading)", 
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
            fontWeight: 300, 
            lineHeight: 1,
            color: "var(--text-primary)",
            textShadow: "0 4px 24px rgba(0,0,0,0.8)"
          }}>
            {study.title}
          </h1>
        </div>
      </section>

      <section style={{ padding: "var(--section-padding)" }}>
        <div
          style={{
            maxWidth: 1200,
            marginInline: "auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-2xl)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-md)" }}>
            {study.metrics.map((m, i) => (
              <div key={i} className="card-3d" style={{ 
                padding: "var(--space-lg)", 
                background: "rgba(10, 15, 25, 0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "var(--radius-lg)"
              }}>
                <div style={{ fontSize: "var(--text-hero)", color: "var(--accent-primary)", fontWeight: 300, lineHeight: 1 }}>{m.value}</div>
                <div style={{ color: "var(--text-secondary)", marginTop: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.85rem" }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>
            <h2 style={{ fontSize: "var(--text-h2)", fontFamily: "var(--font-heading)", fontWeight: 300 }}>The Challenge & Strategy</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
              {study.summary} We deployed a multi-faceted approach leveraging our proprietary data layer and extensive media network to reach the target audience across premium inventory. By focusing on algorithmic alignment and high-impact creative, we successfully moved the needle on all primary KPIs.
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
              Vantor Ventures managed the entire lifecycle of the campaign, ensuring brand safety while aggressively scaling spend into winning pockets of performance.
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "var(--space-xl)" }}>
            <Button variant="primary" size="lg" href="/contact">
              Start a Similar Campaign
            </Button>
            <Button variant="outline" size="lg" href="/">
              Return Home
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
