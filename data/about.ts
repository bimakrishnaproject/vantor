import type { AboutData } from '@/types';
import { globalMetrics } from './metrics';

export const aboutData: AboutData = {
  hero: {
    eyebrow: 'ABOUT VANTOR VENTURES',
    title: 'The Network Behind the Numbers.',
    subtitle: 'Building the largest media ecosystem in sports and entertainment.',
    backgroundType: 'stadium',
    primaryCta: { label: 'Book a Campaign', href: '/contact', variant: 'primary' },
  },

  companyBlurb:
    'Vantor Ventures operates at the intersection of organic media and performance marketing. We\'ve built a network of 60M+ followers across sports, music, entertainment, and culture — creating the kind of reach that brands can\'t build on their own. Our pages aren\'t just audiences. They\'re communities. And communities convert differently.',

  positioning:
    'We don\'t sell impressions. We sell integration. Every placement in our network is designed to feel native to the page it lives on, because authenticity isn\'t just a buzzword — it\'s our entire business model. When brands become part of the culture instead of interrupting it, engagement rates climb, conversions follow, and campaigns become investments instead of expenses.',

  networkScale: globalMetrics,

  team: [
    {
      name: 'Executive Team Member',
      role: 'Chief Executive Officer',
      bio: 'Placeholder bio for the CEO. Client will provide final copy.',
    },
    {
      name: 'Executive Team Member',
      role: 'Chief Operating Officer',
      bio: 'Placeholder bio for the COO. Client will provide final copy.',
    },
    {
      name: 'Executive Team Member',
      role: 'VP of Partnerships',
      bio: 'Placeholder bio for the VP of Partnerships. Client will provide final copy.',
    },
    {
      name: 'Executive Team Member',
      role: 'Head of Sales',
      bio: 'Placeholder bio for the Head of Sales. Client will provide final copy.',
    },
    {
      name: 'Executive Team Member',
      role: 'Creative Director',
      bio: 'Placeholder bio for the Creative Director. Client will provide final copy.',
    },
    {
      name: 'Executive Team Member',
      role: 'Head of Analytics',
      bio: 'Placeholder bio for the Head of Analytics. Client will provide final copy.',
    },
  ],

  partners: [
    { name: 'Partner Brand 1' },
    { name: 'Partner Brand 2' },
    { name: 'Partner Brand 3' },
    { name: 'Partner Brand 4' },
    { name: 'Partner Brand 5' },
    { name: 'Partner Brand 6' },
    { name: 'Partner Brand 7' },
    { name: 'Partner Brand 8' },
  ],
};
