export const contactData = {
  hero: {
    label: "Get in Touch",
    headline: "Book a Campaign",
    description: "Ready to fill the stadium? Tell us about your goals, audience, and budget, and our team will build a custom media ecosystem for your brand."
  },
  form: {
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Work Email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", required: true },
      { 
        name: "campaignType", 
        label: "Primary Vertical", 
        type: "select", 
        options: ["Audio", "eCommerce", "Mobile Apps", "Casinos & iGaming", "Other / Custom"],
        required: true 
      },
      { 
        name: "budget", 
        label: "Monthly Budget Range", 
        type: "select", 
        options: ["$10k - $50k", "$50k - $100k", "$100k - $500k", "$500k+"],
        required: true 
      },
      { name: "message", label: "Campaign Goals", type: "textarea", required: false }
    ],
    submitText: "Submit Request",
    successMessage: "Thank you. Your request has been received. Our team will contact you shortly to discuss your campaign."
  },
  info: {
    title: "Global Operations",
    offices: [
      {
        city: "New York",
        address: "HQ / Strategy & Media",
        email: "hello@vantorventures.com"
      },
      {
        city: "Los Angeles",
        address: "Creative & Entertainment",
        email: "la@vantorventures.com"
      }
    ]
  }
};
