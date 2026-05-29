export const contactData = {
  hero: {
    label: "Network Access Desk",
    headline: "Request Placement",
    description: "Tell us the audience you need to reach, the market you need to enter, and the action you need from the feed. Vantor will identify where that audience already lives across 60M+ followers, 1B+ monthly views, and owned sports and entertainment communities."
  },
  form: {
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Work Email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", required: true },
      { 
        name: "campaignType", 
        label: "Audience Layer", 
        type: "select", 
        options: ["Audio", "eCommerce", "Mobile Apps", "Casinos & iGaming", "Other / Custom"],
        required: true 
      },
      { 
        name: "budget", 
        label: "Monthly Placement Range", 
        type: "select", 
        options: ["$10k - $50k", "$50k - $100k", "$100k - $500k", "$500k+"],
        required: true 
      },
      { name: "message", label: "Audience, Market, and Placement Need", type: "textarea", required: false }
    ],
    submitText: "Request Access",
    successMessage: "Thank you. Your request has been received. Our team will contact you shortly to map the right owned audience surface."
  },
  info: {
    title: "Network Operations",
    offices: [
      {
        city: "New York",
        address: "HQ / Audience Access",
        email: "hello@vantorventures.com"
      },
      {
        city: "Los Angeles",
        address: "Placement & Entertainment",
        email: "la@vantorventures.com"
      }
    ]
  }
};
