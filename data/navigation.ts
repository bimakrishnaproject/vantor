import type { NavigationData } from '@/types';

export const navigationData: NavigationData = {
  mainNav: [
    { label: 'Home', href: '/' },
    { label: 'Audio', href: '/verticals/audio' },
    { label: 'eCommerce', href: '/verticals/ecommerce' },
    { label: 'Mobile Apps', href: '/verticals/mobile-apps' },
    { label: 'Casinos', href: '/verticals/casinos' },
    { label: 'Other', href: '/verticals/other' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: {
    columns: [
      {
        title: 'Network',
        links: [
          { label: 'Audio', href: '/verticals/audio' },
          { label: 'eCommerce', href: '/verticals/ecommerce' },
          { label: 'Mobile Apps', href: '/verticals/mobile-apps' },
          { label: 'Casinos', href: '/verticals/casinos' },
          { label: 'Other', href: '/verticals/other' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'Book a Campaign', href: '/contact' },
          { label: 'Explore Network', href: '/verticals/audio' },
        ],
      },
    ],
  },
  socialLinks: [
    { platform: 'Instagram', url: '#', icon: 'instagram' },
    { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
    { platform: 'Twitter', url: '#', icon: 'twitter' },
  ],
};
