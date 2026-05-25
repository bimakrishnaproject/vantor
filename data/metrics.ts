import type { Metric } from '@/types';

export const globalMetrics: Metric[] = [
  {
    label: 'Monthly Views',
    value: '1B+',
    numericValue: 1000000000,
    suffix: '+',
    description: 'Across our entire network of premium entertainment pages',
  },
  {
    label: 'Followers',
    value: '60M+',
    numericValue: 60000000,
    suffix: '+',
    description: 'Engaged followers across sports, music, and entertainment',
  },
  {
    label: 'Engagement Baseline',
    value: '5-10%',
    numericValue: 10,
    suffix: '%',
    description: 'Organic engagement rate across all verticals',
  },
  {
    label: 'Native Placements',
    value: 'High-Converting',
    description: 'Every placement crafted to feel native to the content',
  },
  {
    label: 'CPM Accountability',
    value: '100%',
    numericValue: 100,
    suffix: '%',
    description: 'Every campaign accountable to real, measurable results',
  },
];

export const audioMetrics: Metric[] = [
  { label: 'Music Pages', value: '200+', numericValue: 200, suffix: '+' },
  { label: 'Monthly Music Views', value: '350M+', numericValue: 350000000, suffix: '+' },
  { label: 'Artist Partnerships', value: '50+', numericValue: 50, suffix: '+' },
  { label: 'Avg. Engagement', value: '7.2%', numericValue: 7.2, suffix: '%' },
];

export const ecommerceMetrics: Metric[] = [
  { label: 'Conversion Rate', value: '3.8%', numericValue: 3.8, suffix: '%' },
  { label: 'Avg. ROAS', value: '4.2x', numericValue: 4.2, suffix: 'x' },
  { label: 'Products Promoted', value: '500+', numericValue: 500, suffix: '+' },
  { label: 'Purchase Intent', value: '62%', numericValue: 62, suffix: '%' },
];

export const mobileAppsMetrics: Metric[] = [
  { label: 'App Installs Driven', value: '2M+', numericValue: 2000000, suffix: '+' },
  { label: 'Avg. CPI', value: '$1.20', numericValue: 1.2, prefix: '$' },
  { label: 'Retention Rate', value: '34%', numericValue: 34, suffix: '%' },
  { label: 'Active Users', value: '890K+', numericValue: 890000, suffix: '+' },
];

export const casinoMetrics: Metric[] = [
  { label: 'Sports Fan Reach', value: '25M+', numericValue: 25000000, suffix: '+' },
  { label: 'Geo Markets', value: '40+', numericValue: 40, suffix: '+' },
  { label: 'Compliance Rate', value: '100%', numericValue: 100, suffix: '%' },
  { label: 'Avg. FTD Cost', value: '$45', numericValue: 45, prefix: '$' },
];

export const otherMetrics: Metric[] = [
  { label: 'Verticals Covered', value: '15+', numericValue: 15, suffix: '+' },
  { label: 'Custom Campaigns', value: '300+', numericValue: 300, suffix: '+' },
  { label: 'Audience Segments', value: '50+', numericValue: 50, suffix: '+' },
  { label: 'Cross-Vertical Reach', value: '800M+', numericValue: 800000000, suffix: '+' },
];
