// =============================================================================
// Vantor Ventures — CMS-Ready Type Definitions
// =============================================================================
// These types define the data structures used across the entire site.
// When connecting to WordPress CMS, API responses should be mapped to these types.

export type CTA = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  description?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  backgroundType?: 'stadium' | 'concert' | 'digital' | 'arena' | 'modular';
};

export type Metric = {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  numericValue?: number;
  description?: string;
};

export type PositioningBlock = {
  title: string;
  description: string;
};

export type ServicePreview = {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  theme: string;
  accentColor: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  vertical: string;
  challenge: string;
  solution: string;
  results: Metric[];
  testimonial?: string;
};

export type KeyPoint = {
  title: string;
  description: string;
};

export type VerticalPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: HeroContent;
  description: string;
  visualTheme: string;
  keyPoints: KeyPoint[];
  metrics: Metric[];
  caseStudies: CaseStudy[];
  whyFits: {
    title: string;
    points: string[];
  };
  cta: CTA;
};

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
};

export type Partner = {
  name: string;
  logoUrl?: string;
};

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
};

export type ContactInfo = {
  email: string;
  phone?: string;
  address?: string;
  socials?: { platform: string; url: string }[];
};

export type HomepageData = {
  hero: HeroContent;
  positioning: PositioningBlock[];
  metrics: Metric[];
  services: ServicePreview[];
  featuredCaseStudy: CaseStudy;
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

export type AboutData = {
  hero: HeroContent;
  companyBlurb: string;
  positioning: string;
  networkScale: Metric[];
  team: TeamMember[];
  partners: Partner[];
};

export type ContactData = {
  hero: HeroContent;
  intro: string;
  formFields: FormField[];
  contactInfo: ContactInfo;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type NavigationData = {
  mainNav: NavItem[];
  footerNav: {
    columns: { title: string; links: NavItem[] }[];
  };
  socialLinks: { platform: string; url: string; icon: string }[];
};
