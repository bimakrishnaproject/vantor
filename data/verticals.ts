import type { VerticalPage } from '@/types';
import {
  audioMetrics,
  ecommerceMetrics,
  mobileAppsMetrics,
  casinoMetrics,
  otherMetrics,
} from './metrics';
import { caseStudies } from './caseStudies';

export const verticalPages: VerticalPage[] = [
  {
    slug: 'audio',
    title: 'Audio',
    metaTitle: 'Audio | Vantor Ventures — Music Fan Communities at Scale',
    metaDescription:
      'Reach music fans where they actually live. From global superstars to emerging artists, our pages sit at the center of music fandom on Instagram.',
    hero: {
      eyebrow: 'AUDIO NETWORK',
      title: 'Where Music Fans Actually Live.',
      subtitle: 'The center of music fandom on Instagram.',
      backgroundType: 'concert',
      primaryCta: { label: 'Book a Campaign', href: '/contact', variant: 'primary' },
    },
    description:
      "From global superstars to emerging artists, our pages sit at the center of music fandom on Instagram. Whether you're promoting a release, growing streams, or driving platform sign-ups, KOLS puts audio brands inside the communities that set the soundtrack.",
    visualTheme: 'concert',
    keyPoints: [
      {
        title: 'Create Trending Audio',
        description:
          'Leverage our music communities to make your audio go viral. Our pages set the trends that fans follow.',
      },
      {
        title: 'Artist Aligned Pages',
        description:
          'Every page in our audio network is built around genuine music fandom, ensuring authentic connections with your audience.',
      },
      {
        title: 'Increase Streams',
        description:
          'Drive measurable streaming growth through native placements that fans engage with naturally.',
      },
    ],
    metrics: audioMetrics,
    caseStudies: caseStudies.filter((cs) => cs.vertical === 'audio'),
    whyFits: {
      title: 'Why Audio Fits Your Brand',
      points: [
        'Access to 200+ curated music fan pages',
        'Native placements that feel like organic content',
        'Direct impact on streaming metrics and Shazam discovery',
        'CPM model ensures measurable ROI on every campaign',
        'Reach fans across all genres from hip-hop to pop to electronic',
      ],
    },
    cta: { label: 'Launch an Audio Campaign', href: '/contact', variant: 'primary' },
  },
  {
    slug: 'ecommerce',
    title: 'eCommerce',
    metaTitle: 'eCommerce | Vantor Ventures — Convert Fans into Customers',
    metaDescription:
      'Put your product in the feed they\'re already scrolling. Impulse-driven audiences, native product integration, and amplified retargeting.',
    hero: {
      eyebrow: 'ECOMMERCE NETWORK',
      title: 'Put Your Product in the Feed.',
      subtitle: 'They\'re already scrolling. Make them stop.',
      backgroundType: 'digital',
      primaryCta: { label: 'Book a Campaign', href: '/contact', variant: 'primary' },
    },
    description:
      "Fan communities are passionate, loyal, and impulse-driven. When a placement feels native to the content around it, audiences don't just notice — they act.",
    visualTheme: 'digital',
    keyPoints: [
      {
        title: 'Impulse-Ready Audiences',
        description:
          'Our communities are built around passion. Passionate audiences are impulse-driven buyers.',
      },
      {
        title: 'Native Product Integration',
        description:
          'Each product placement is designed to feel like a natural part of the content, not an ad.',
      },
      {
        title: 'Amplify Retargeting',
        description:
          'Our placements warm up audiences for your retargeting campaigns, dramatically improving conversion rates.',
      },
    ],
    metrics: ecommerceMetrics,
    caseStudies: caseStudies.filter((cs) => cs.vertical === 'ecommerce'),
    whyFits: {
      title: 'Why eCommerce Fits Your Brand',
      points: [
        'Reach impulse-driven buyers in their native environment',
        'Product placements that blend seamlessly with organic content',
        'Warm audiences for retargeting with 4x+ ROAS potential',
        'CPM accountability on every placement',
        'Scale from hundreds to millions of impressions on demand',
      ],
    },
    cta: { label: 'Launch an eCommerce Campaign', href: '/contact', variant: 'primary' },
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps',
    metaTitle: 'Mobile Apps | Vantor Ventures — Drive Installs, Not Just Impressions',
    metaDescription:
      'Fan communities are mobile-first. When your app is introduced through trusted content, the conversion path shortens dramatically.',
    hero: {
      eyebrow: 'MOBILE APPS NETWORK',
      title: 'Mobile-First Communities.',
      subtitle: 'Drive installs, not just impressions.',
      backgroundType: 'digital',
      primaryCta: { label: 'Book a Campaign', href: '/contact', variant: 'primary' },
    },
    description:
      "Fan communities are mobile-first by nature. When your app is introduced through content an audience already trusts, the conversion path shortens dramatically. Our network drives installs, not just impressions — and our CPM model means you're paying for reach that can prove itself.",
    visualTheme: 'mobile',
    keyPoints: [
      {
        title: 'Mobile-First Communities',
        description:
          'Our audiences consume content on mobile. Your app meets them exactly where they are.',
      },
      {
        title: 'Install-Driven Creative',
        description:
          'Every placement is optimized for the install journey, from awareness to download.',
      },
      {
        title: 'High Engagement Baseline',
        description:
          'With 5-10% engagement rates, your app gets noticed by audiences who actually interact.',
      },
    ],
    metrics: mobileAppsMetrics,
    caseStudies: caseStudies.filter((cs) => cs.vertical === 'mobile-apps'),
    whyFits: {
      title: 'Why Mobile Apps Fit Your Brand',
      points: [
        'Mobile-first audiences with high install intent',
        'Average CPI significantly below industry benchmarks',
        'Strong retention rates from quality user acquisition',
        'Native creative that drives action, not just awareness',
        'CPM model with full install attribution',
      ],
    },
    cta: { label: 'Launch a Mobile Campaign', href: '/contact', variant: 'primary' },
  },
  {
    slug: 'casinos',
    title: 'Casinos',
    metaTitle: 'Casinos | Vantor Ventures — Sports Betting & Gaming Audiences at Scale',
    metaDescription:
      'The audience every gaming brand is looking for, already built. Compliance-conscious, geo-targeted placements at scale.',
    hero: {
      eyebrow: 'CASINOS NETWORK',
      title: 'The Audience Already Built.',
      subtitle: 'Sports fans, entertainment audiences, high-intent adults.',
      backgroundType: 'arena',
      primaryCta: { label: 'Book a Campaign', href: '/contact', variant: 'primary' },
    },
    description:
      "Tap into our diverse network of sports fans, entertainment audiences, and high-intent adults — placed in front of your brand natively and at scale. Compliance-conscious placements, geo-targeting capability, and a CPM model that keeps every campaign accountable to real numbers.",
    visualTheme: 'arena',
    keyPoints: [
      {
        title: 'Audiences Already Placing Bets',
        description:
          'Our sports communities are filled with active bettors who engage with gaming content naturally.',
      },
      {
        title: 'Compliance-Conscious Placements',
        description:
          'Every placement is reviewed for regulatory compliance across all target markets.',
      },
      {
        title: 'Geo-Targeted Reach',
        description:
          'Precision targeting by geography ensures you only reach audiences in approved markets.',
      },
    ],
    metrics: casinoMetrics,
    caseStudies: caseStudies.filter((cs) => cs.vertical === 'casinos'),
    whyFits: {
      title: 'Why Casinos Fit Your Brand',
      points: [
        'Access to 25M+ sports fans already engaged with betting content',
        'Full regulatory compliance review on every placement',
        'Geo-targeting across 40+ approved markets',
        'CPM model with FTD attribution',
        'Brand-safe placements that protect your reputation',
      ],
    },
    cta: { label: 'Launch a Casino Campaign', href: '/contact', variant: 'primary' },
  },
  {
    slug: 'other',
    title: 'Other / Clipping',
    metaTitle: 'Other | Vantor Ventures — Cross-Vertical Reach for Any Audience',
    metaDescription:
      'If your audience watches, follows, or cares — we can reach them. Cross-vertical campaigns built around your goals.',
    hero: {
      eyebrow: 'FLEXIBLE NETWORK',
      title: 'If They Watch It, We Reach Them.',
      subtitle: 'Cross-vertical campaigns built around your goals.',
      backgroundType: 'modular',
      primaryCta: { label: 'Book a Campaign', href: '/contact', variant: 'primary' },
    },
    description:
      "Our network spans sports, entertainment, music, and culture. Tell us your goals and we'll show you where your brand fits inside the stadium.",
    visualTheme: 'modular',
    keyPoints: [
      {
        title: 'Cross-Vertical Reach',
        description:
          'Activate audiences across multiple interest verticals simultaneously.',
      },
      {
        title: 'Custom Placement Strategy',
        description:
          'Every campaign is architected around your specific goals, audience, and KPIs.',
      },
      {
        title: 'Built Around Your Goals',
        description:
          'Whether it\'s awareness, conversions, or community building — we design the campaign to deliver.',
      },
    ],
    metrics: otherMetrics,
    caseStudies: caseStudies.filter((cs) => cs.vertical === 'other'),
    whyFits: {
      title: 'Why This Fits Your Brand',
      points: [
        'Access to the full Vantor network across all verticals',
        'Custom campaign architecture for unique objectives',
        'Audience segmentation across 50+ interest groups',
        'Flexible CPM model with custom KPI tracking',
        'Single point of contact for multi-vertical campaigns',
      ],
    },
    cta: { label: 'Build a Custom Campaign', href: '/contact', variant: 'primary' },
  },
];
