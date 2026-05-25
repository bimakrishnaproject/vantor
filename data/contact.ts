import type { ContactData } from '@/types';

export const contactData: ContactData = {
  hero: {
    eyebrow: 'GET STARTED',
    title: 'Book a Campaign',
    subtitle: 'Tell us about your brand and we\'ll show you where you fit in the stadium.',
    backgroundType: 'stadium',
    primaryCta: { label: 'Submit Inquiry', href: '#contact-form', variant: 'primary' },
  },

  intro:
    'Ready to put your brand in front of the most engaged communities in sports, music, and entertainment? Fill out the form below and our team will get back to you within 24 hours with a custom campaign proposal.',

  formFields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Your full name',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'you@company.com',
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
      placeholder: 'Your company name',
    },
    {
      name: 'campaignType',
      label: 'Campaign Type',
      type: 'select',
      required: true,
      options: [
        'Audio / Music',
        'eCommerce / Product',
        'Mobile App Install',
        'Casino / Gaming',
        'Cross-Vertical / Custom',
        'Other',
      ],
    },
    {
      name: 'budget',
      label: 'Budget Range',
      type: 'select',
      required: false,
      options: [
        'Under $10,000',
        '$10,000 - $25,000',
        '$25,000 - $50,000',
        '$50,000 - $100,000',
        '$100,000+',
        'Not sure yet',
      ],
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: false,
      placeholder: 'Tell us about your campaign goals...',
    },
  ],

  contactInfo: {
    email: 'campaigns@vantorventures.com',
    phone: '+1 (555) 000-0000',
    socials: [
      { platform: 'Instagram', url: '#' },
      { platform: 'LinkedIn', url: '#' },
      { platform: 'Twitter', url: '#' },
    ],
  },
};
