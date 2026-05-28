import { homepageData } from "@/data/homepage";
import { verticalsData } from "@/data/verticals";
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
  [key: string]: any;
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
  const acf: any = wpPage?.acf || {};

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
  const acf: any = wpPage?.acf || {};
  const localData = verticalsData[slug] || verticalsData.other;

  return {
    ...localData,
    title: wpPage?.title?.rendered || localData.title,
    hero: {
      ...localData.hero,
      headline: acf.hero_headline || localData.hero.headline,
      description: acf.hero_description || localData.hero.description,
      ctaText: acf.hero_cta_text || "Start a Campaign",
      accentColor: localData.themeColor || "#ffffff"
    },
    features: {
      label: "Capabilities",
      title: "Precision Targeting & Execution",
      items: localData.benefits.map((b: any) => ({
        icon: "🎯",
        title: b.title,
        text: b.description
      }))
    },
    process: {
      label: "Brand Alignment",
      title: localData.fit.title,
      steps: [
        { number: 1, title: "Alignment", description: localData.fit.description },
        { number: 2, title: "Execution", description: "We launch across premium inventory." },
        { number: 3, title: "Scale", description: "We optimize and scale winning creatives." }
      ]
    },
    stats: {
      label: "By The Numbers",
      title: "Proven Performance",
      items: localData.metrics || [
        { value: "3.2x", endValue: 3.2, suffix: "x", decimals: 1, label: "Average ROAS" },
        { value: "45+", endValue: 45, suffix: "+", label: "Markets Reached" }
      ]
    },
    caseStudies: {
      label: "Success Stories",
      title: "Client Results",
      items: localData.caseStudy ? [
        {
          title: localData.caseStudy.title,
          client: localData.caseStudy.client,
          category: localData.title,
          slug: `${slug}-case-study`,
          metrics: localData.caseStudy.metrics
        }
      ] : [
        {
          title: "Global Campaign Launch",
          client: "Top Tier Brand",
          category: localData.title,
          slug: "global-campaign",
          metrics: [
            { label: "ROAS", value: "4.8x" },
            { label: "CPA", value: "-32%" }
          ]
        }
      ]
    },
    cta: {
      headline: acf.cta_headline || localData.cta?.headline || "Ready to dominate your market?",
      subtext: acf.cta_subtext || localData.cta?.subtext || "Let's build your next high-performance campaign together.",
      ctaText: acf.cta_button_text || "Get in Touch"
    }
  };
}

export async function getAboutData() {
  const wpPage = await getPageBySlug('about');
  const acf: any = wpPage?.acf || {};

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
  const acf: any = wpPage?.acf || {};

  return {
    ...contactData,
    hero: {
      ...contactData.hero,
      headline: acf.hero_headline || contactData.hero.headline,
      description: acf.hero_description || contactData.hero.description
    }
  };
}
