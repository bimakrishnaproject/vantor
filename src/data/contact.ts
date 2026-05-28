export const contactData = {
  hero: {
    label: "Activate the Network",
    headline: "Book a Campaign",
    description: "Ready to reach millions? Tell us about your brand, your goals, and your target audience. Our team will show you exactly where you fit inside our network."
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
