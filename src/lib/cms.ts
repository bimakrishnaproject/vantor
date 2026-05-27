export interface PageACFData {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
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

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const res = await fetch(`${WP_API_URL}/pages?slug=${slug}&_fields=id,slug,title,acf`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
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

export async function getVerticalPageBySlug(slug: string) {
  const wpPage = await getPageBySlug(slug);
  const acf: any = wpPage?.acf || {};

  const titles: Record<string, string> = {
    audio: "Audio Advertising",
    casinos: "Casino & iGaming",
    ecommerce: "eCommerce Growth",
    "mobile-apps": "Mobile App User Acquisition",
    other: "Custom Solutions"
  };

  const accentColors: Record<string, string> = {
    audio: "#00d4ff",
    casinos: "#f0c040",
    ecommerce: "#ff6b35",
    "mobile-apps": "#00e88f",
    other: "#a855f7"
  };

  return {
    title: wpPage?.title?.rendered || titles[slug] || "Vertical Solution",
    description: acf.hero_description || "Programmatic campaigns that drive measurable results.",
    hero: {
      label: acf.hero_label || titles[slug] || "Premium Media",
      headline: acf.hero_headline || `Scale Your ${titles[slug] || "Brand"}`,
      description: acf.hero_description || "Delivering immersive media buying solutions that connect with your audience.",
      accentColor: acf.hero_accent_color || accentColors[slug] || "#ffffff",
      ctaText: acf.hero_cta_text || "Start a Campaign"
    },
    features: {
      label: acf.features_label || "Capabilities",
      title: acf.features_title || "Precision Targeting & Execution",
      items: acf.features_items || [
        { icon: "🎯", title: "Audience Targeting", text: "Reach the right users at the right time." },
        { icon: "📈", title: "Performance Tracking", text: "Real-time analytics and reporting." },
        { icon: "⚡️", title: "Rapid Optimization", text: "Continuous A/B testing for better ROI." }
      ]
    },
    process: {
      label: acf.process_label || "Our Process",
      title: acf.process_title || "How We Deliver Results",
      steps: acf.process_steps || [
        { number: "01", title: "Strategy", text: "We analyze your audience and goals." },
        { number: "02", title: "Execution", text: "We launch across premium inventory." },
        { number: "03", title: "Scale", text: "We optimize and scale winning creatives." }
      ]
    },
    stats: {
      label: acf.stats_label || "By The Numbers",
      title: acf.stats_title || "Proven Performance",
      items: acf.stats_items || [
        { value: "3.2x", endValue: 3.2, suffix: "x", decimals: 1, label: "Average ROAS" },
        { value: "45+", endValue: 45, suffix: "+", label: "Markets Reached" }
      ]
    },
    caseStudies: {
      label: acf.case_studies_label || "Success Stories",
      title: acf.case_studies_title || "Client Results",
      items: acf.case_studies_items || [
        {
          title: "Global Campaign Launch",
          client: "Top Tier Brand",
          category: titles[slug] || "Media",
          slug: "global-campaign",
          metrics: [
            { label: "ROAS", value: "4.8x" },
            { label: "CPA", value: "-32%" }
          ]
        }
      ]
    },
    cta: {
      headline: acf.cta_headline || "Ready to dominate your market?",
      subtext: acf.cta_subtext || "Let's build your next high-performance campaign together.",
      ctaText: acf.cta_button_text || "Get in Touch"
    }
  };
}

export async function getAboutData() {
  const wpPage = await getPageBySlug('about');
  const acf: any = wpPage?.acf || {};

  return {
    hero: {
      description: acf.hero_description || "We are a full-spectrum media buying powerhouse."
    },
    mission: {
      description: acf.mission_description || "Our mission is to build campaigns that span continents while keeping every decision rooted in measurable performance."
    },
    team: {
      title: acf.team_title || "Meet the Team",
      members: acf.team_members || [
        { name: "John Doe", role: "CEO" }
      ]
    },
    stats: acf.stats || [
      { label: "Markets", value: "45+" },
      { label: "Employees", value: "120+" }
    ],
    partners: {
      title: acf.partners_title || "Our Partners",
      logos: acf.partner_logos ? acf.partner_logos.map((l: any) => l.logo_name) : [
        "Partner 1", "Partner 2"
      ]
    }
  };
}

export async function getContactData() {
  const wpPage = await getPageBySlug('contact');
  const acf: any = wpPage?.acf || {};

  return {
    hero: {
      label: acf.hero_label || "Get in Touch",
      headline: acf.hero_headline || "Let's work together",
      description: acf.hero_description || "Fill out the form below and we will get back to you shortly."
    },
    form: {
      submitText: acf.form_submit_text || "Send Message",
      successMessage: acf.form_success_message || "Thank you for contacting us."
    },
    info: {
      title: acf.offices_title || "Global Offices",
      offices: acf.offices || [
        {
          city: "New York",
          address: "123 Broadway",
          email: "ny@vantor.com"
        }
      ]
    }
  };
}
