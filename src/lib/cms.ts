import { homepageData } from "@/data/homepage";
import { verticalsData } from "@/data/verticals";
import type { VerticalData } from "@/data/verticals";
import { aboutData } from "@/data/about";
import { contactData } from "@/data/contact";

export interface PageACFData {
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  primary_cta_text?: string;
  primary_cta_url?: string;
  secondary_cta_text?: string;
  secondary_cta_url?: string;
  cta_headline?: string;
  cta_subtext?: string;
  cta_button_text?: string;
  hero_headline?: string;
  hero_cta_text?: string;
  [key: string]: unknown;
}

export interface PageData {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: PageACFData;
}

const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://kols.io/wp-json/wp/v2';
const USE_WP = process.env.USE_WORDPRESS === 'true'; // Feature flag for future integration
const CASE_STUDY_SLUGS: Record<string, string> = {
  audio: "streaming-launch",
  ecommerce: "fashion-roas",
  "mobile-apps": "marketplace-expansion",
  casinos: "eu-sportsbook",
  other: "global-network-placement",
};

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  if (!USE_WP) return null; // Force fallback to local data for now

  try {
    const res = await fetch(`${WP_API_URL}/pages?slug=${slug}&_fields=id,slug,title,acf`, {
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch page data: ${res.statusText}`);
    }

    const data: PageData[] = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(`Error fetching WordPress data for slug "${slug}":`, error);
    return null;
  }
}

export async function getHomepageData() {
  const wpPage = await getPageBySlug('home');
  const acf: PageACFData = wpPage?.acf ?? {};

  return {
    ...homepageData,
    // Override local data with WP data if it exists
    hero: {
      ...homepageData.hero,
      headline: acf.hero_title || homepageData.hero.headline,
      subtext: acf.hero_description || homepageData.hero.subtext,
    },
    cta: {
      ...homepageData.cta,
      buttonText: acf.secondary_cta_text || homepageData.cta.buttonText,
      buttonLink: acf.secondary_cta_url || homepageData.cta.buttonLink,
    }
  };
}

export async function getVerticalPageBySlug(slug: string) {
  const wpPage = await getPageBySlug(slug);
  const acf: PageACFData = wpPage?.acf ?? {};
  const localData: VerticalData = verticalsData[slug] || verticalsData.other;

  return {
    ...localData,
    title: wpPage?.title?.rendered || localData.title,
    description: localData.hero.description,
    hero: {
      ...localData.hero,
      headline: acf.hero_headline || localData.hero.headline,
      description: acf.hero_description || localData.hero.description,
      ctaText: acf.hero_cta_text || "Request Placement",
      accentColor: localData.themeColor || "#ffffff"
    },
    features: {
      label: "Audience Ownership",
      title: "Direct Access Inside the Network",
      items: localData.benefits.map((b) => ({
        icon: "•",
        title: b.title,
        text: b.description
      }))
    },
    process: {
      label: "Seamless Integration",
      title: localData.fit.title,
      steps: [
        { number: 1, title: "Audience Map", description: localData.fit.description },
        { number: 2, title: "Network Placement", description: "We place the message inside owned sports and entertainment channels where the audience already gathers." },
        { number: 3, title: "Hands-On Control", description: "We manage timing, format, audience fit, and follow-through from inside the 60M+ follower network." }
      ]
    },
    stats: {
      label: "Think Bigger",
      title: "Network Scale",
      items: localData.metrics || [
        { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
        { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
      ]
    },
    caseStudies: {
      label: "Results Driven",
      title: "Placement Records From Owned Audience Surfaces",
      items: localData.caseStudy ? [
        {
          title: localData.caseStudy.title,
          client: localData.caseStudy.client,
          category: localData.title,
          slug: CASE_STUDY_SLUGS[slug] || "global-network-placement",
          metrics: localData.caseStudy.metrics
        }
      ] : [
        {
          title: "Global Network Placement",
          client: "Cross-Vertical Network Access",
          category: localData.title,
          slug: "global-network-placement",
          metrics: [
            { label: "Monthly Views", value: "1B+" },
            { label: "Followers", value: "60M+" }
          ]
        }
      ]
    },
    cta: {
      headline: acf.cta_headline || localData.cta?.headline || "Request access to the network",
      subtext: acf.cta_subtext || localData.cta?.subtext || "Tell us the audience you need. We will identify the owned path across 1B+ monthly views and 60M+ followers.",
      ctaText: acf.cta_button_text || "Request Placement"
    }
  };
}

export async function getAboutData() {
  const wpPage = await getPageBySlug('about');
  const acf: PageACFData = wpPage?.acf ?? {};

  return {
    ...aboutData,
    hero: {
      ...aboutData.hero,
      description: acf.hero_description || aboutData.hero.description
    }
  };
}

export async function getContactData() {
  const wpPage = await getPageBySlug('contact');
  const acf: PageACFData = wpPage?.acf ?? {};

  return {
    ...contactData,
    hero: {
      ...contactData.hero,
      headline: acf.hero_headline || contactData.hero.headline,
      description: acf.hero_description || contactData.hero.description
    }
  };
}
