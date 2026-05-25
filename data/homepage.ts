import type { HomepageData } from '@/types';
import { globalMetrics } from './metrics';
import { caseStudies } from './caseStudies';

export const homepageData: HomepageData = {
  hero: {
    eyebrow: 'VANTOR VENTURES',
    title: 'Reach That Converts',
    subtitle:
      "The Home for Sports & Entertainment's Largest and Most Engaged Communities.",
    description:
      "Built at the intersection of organic and paid media, harnessing passionate fan communities for high-converting placements that make brands part of the culture.",
    primaryCta: {
      label: 'Book a Campaign',
      href: '/contact',
      variant: 'primary',
    },
    secondaryCta: {
      label: 'Explore Network',
      href: '/verticals/audio',
      variant: 'secondary',
    },
    backgroundType: 'stadium',
  },

  positioning: [
    {
      title: 'THINK BIGGER.',
      description:
        'Backed by 1B+ monthly views and 60M+ followers, our network gives brands access to the kind of reach that moves the needle.',
    },
    {
      title: 'UNPARALLELED ENGAGEMENT.',
      description:
        "Real communities engage differently. When audiences are built around genuine interest, 5-10% engagement isn't a target — it's our baseline.",
    },
    {
      title: 'SEAMLESS INTEGRATION.',
      description:
        'Audiences can smell inauthenticity and they scroll past it instantly. Every placement is crafted around the page it lives on, so the brand feels like a natural part of the feed — not an interruption.',
    },
    {
      title: 'RESULTS DRIVEN.',
      description:
        "Our CPM model ensures every campaign is accountable to real results — because reach that can't be measured isn't reach worth buying.",
    },
  ],

  metrics: globalMetrics,

  services: [
    {
      slug: 'audio',
      title: 'Audio',
      tagline: 'Where music fans actually live.',
      icon: '🎵',
      theme: 'concert',
      accentColor: '#ff6b35',
    },
    {
      slug: 'ecommerce',
      title: 'eCommerce',
      tagline: 'Put your product in the feed.',
      icon: '🛍️',
      theme: 'digital',
      accentColor: '#00d4ff',
    },
    {
      slug: 'mobile-apps',
      title: 'Mobile Apps',
      tagline: 'Mobile-first conversion paths.',
      icon: '📱',
      theme: 'mobile',
      accentColor: '#7c3aed',
    },
    {
      slug: 'casinos',
      title: 'Casinos',
      tagline: 'The audience already built.',
      icon: '🎰',
      theme: 'arena',
      accentColor: '#f59e0b',
    },
    {
      slug: 'other',
      title: 'Other / Clipping',
      tagline: 'If they watch it, we reach them.',
      icon: '🎯',
      theme: 'modular',
      accentColor: '#10b981',
    },
  ],

  featuredCaseStudy: caseStudies[0],

  finalCta: {
    title: 'Ready to Enter the Arena?',
    subtitle:
      'Join the brands already winning inside the Vantor network. Your audience is waiting.',
    cta: {
      label: 'Book a Campaign',
      href: '/contact',
      variant: 'primary',
    },
  },
};
