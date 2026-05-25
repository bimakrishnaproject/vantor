import type { CaseStudy } from '@/types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-audio-001',
    title: 'Breaking a Debut Single into Viral Territory',
    client: 'Emerging Artist Management Group',
    vertical: 'audio',
    challenge:
      'A rising artist needed to break through the noise on release week. Traditional ads weren\'t reaching the right audience, and organic growth was too slow to capitalize on the launch window.',
    solution:
      'We deployed native placements across 40+ music-focused pages, integrating the track into fan-curated content. Each post was designed to feel like a genuine recommendation, not a sponsored push.',
    results: [
      { label: 'Streams Generated', value: '2.4M', numericValue: 2400000, suffix: '+' },
      { label: 'Engagement Rate', value: '8.7%', numericValue: 8.7, suffix: '%' },
      { label: 'Shazam Increase', value: '340%', numericValue: 340, suffix: '%' },
      { label: 'Spotify Saves', value: '180K', numericValue: 180000, suffix: '+' },
    ],
    testimonial:
      'Vantor understood our audience better than any agency we\'ve worked with. The results spoke for themselves.',
  },
  {
    id: 'cs-ecom-001',
    title: 'Driving Impulse Purchases Through Fan Communities',
    client: 'Premium Lifestyle Brand',
    vertical: 'ecommerce',
    challenge:
      'The brand needed to move seasonal inventory quickly. Traditional display ads had low click-through rates, and influencer partnerships were too expensive for the margin targets.',
    solution:
      'We created native product integrations across sports and entertainment pages, positioning the product as part of the culture rather than an interruption. Each placement was tailored to the page\'s visual identity.',
    results: [
      { label: 'Revenue Generated', value: '$420K', numericValue: 420000, prefix: '$' },
      { label: 'ROAS', value: '5.2x', numericValue: 5.2, suffix: 'x' },
      { label: 'CTR', value: '4.1%', numericValue: 4.1, suffix: '%' },
      { label: 'Inventory Sold', value: '92%', numericValue: 92, suffix: '%' },
    ],
  },
  {
    id: 'cs-mobile-001',
    title: 'Scaling App Installs with Mobile-First Communities',
    client: 'Sports Betting App',
    vertical: 'mobile-apps',
    challenge:
      'The app needed to acquire high-quality users at scale while maintaining a target CPI under $2.00. Previous campaigns through standard channels had CPIs averaging $3.50.',
    solution:
      'We leveraged our network of sports fan communities to deliver install-driven creative that felt native to the feed. Mobile-first content ensured frictionless conversion paths.',
    results: [
      { label: 'Installs Driven', value: '185K', numericValue: 185000, suffix: '+' },
      { label: 'Avg. CPI', value: '$1.15', numericValue: 1.15, prefix: '$' },
      { label: '30-Day Retention', value: '38%', numericValue: 38, suffix: '%' },
      { label: 'Cost Savings', value: '67%', numericValue: 67, suffix: '%' },
    ],
    testimonial:
      'The quality of users from Vantor\'s network outperformed every other channel we tested.',
  },
  {
    id: 'cs-casino-001',
    title: 'Reaching High-Intent Sports Bettors at Scale',
    client: 'Licensed Online Casino',
    vertical: 'casinos',
    challenge:
      'The casino needed to reach sports fans in key geo markets during the NFL season while maintaining full regulatory compliance across all placements.',
    solution:
      'We deployed geo-targeted, compliance-reviewed placements across our sports network, reaching fans in approved markets with native content that drove sign-ups without compromising brand safety.',
    results: [
      { label: 'First-Time Deposits', value: '12.4K', numericValue: 12400, suffix: '+' },
      { label: 'Avg. FTD Cost', value: '$38', numericValue: 38, prefix: '$' },
      { label: 'Geo Accuracy', value: '99.2%', numericValue: 99.2, suffix: '%' },
      { label: 'Compliance Score', value: '100%', numericValue: 100, suffix: '%' },
    ],
  },
  {
    id: 'cs-other-001',
    title: 'Cross-Vertical Campaign for Entertainment Platform',
    client: 'Streaming Platform',
    vertical: 'other',
    challenge:
      'A major streaming platform wanted to promote a new series across multiple audience segments simultaneously — sports fans, music enthusiasts, and pop culture communities.',
    solution:
      'We designed a cross-vertical campaign spanning our entire network, with each placement customized for its audience segment. The campaign ran simultaneously across 100+ pages.',
    results: [
      { label: 'Total Reach', value: '45M', numericValue: 45000000, suffix: '+' },
      { label: 'Engagement Rate', value: '6.3%', numericValue: 6.3, suffix: '%' },
      { label: 'Sign-Up Lift', value: '28%', numericValue: 28, suffix: '%' },
      { label: 'Pages Activated', value: '120+', numericValue: 120, suffix: '+' },
    ],
    testimonial:
      'No other partner could activate this many audience segments simultaneously with this level of quality.',
  },
];
