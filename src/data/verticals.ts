export interface VerticalMetric {
  value: string;
  endValue: number;
  suffix: string;
  decimals?: number;
  label: string;
}

export interface VerticalData {
  title: string;
  slug: string;
  themeColor: string;
  hero: {
    headline: string;
    description: string;
  };
  benefits: { title: string; description: string }[];
  fit: {
    title: string;
    description: string;
  };
  metrics: VerticalMetric[];
  caseStudy: {
    title: string;
    client: string;
    metrics: { label: string; value: string }[];
  };
  cta: {
    headline: string;
    subtext: string;
  };
}

export const verticalsData: Record<string, VerticalData> = {
  audio: {
    title: "Audio",
    slug: "audio",
    themeColor: "#00d4ff",
    hero: {
      headline: "Where music fans actually live.",
      description: "From global superstars to emerging artists, our pages sit at the center of music fandom on Instagram. Whether you're promoting a release, growing streams, or driving platform sign-ups, KOLS puts audio brands inside the communities that set the soundtrack."
    },
    benefits: [
      { title: "Create trending audio", description: "" },
      { title: "Artist aligned pages", description: "" },
      { title: "Increase streams", description: "" }
    ],
    fit: {
      title: "Why this is a fit for Audio",
      description: "We don't just place ads next to music content; we own the surfaces where fans actively seek out new sounds and artists."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "Release Entered Music Fandom",
      client: "Major Record Label",
      metrics: [
        { label: "Fan Reach", value: "+340%" },
        { label: "Streams Driven", value: "2.5M+" }
      ]
    },
    cta: {
      headline: "Place Audio Inside the Network",
      subtext: "Bring the release to audiences already listening."
    }
  },
  ecommerce: {
    title: "eCommerce",
    slug: "ecommerce",
    themeColor: "#ff6b35",
    hero: {
      headline: "Put your product in the feed they're already scrolling.",
      description: "Fan communities are passionate, loyal, and impulse-driven. When a placement feels native to the content around it, audiences don't just notice, they act."
    },
    benefits: [
      { title: "Impulse ready audiences", description: "" },
      { title: "Native product integration", description: "" },
      { title: "Ability to amplify retargeting", description: "" }
    ],
    fit: {
      title: "Why this is a fit for eCommerce",
      description: "Conversion requires trust. By placing products natively within communities the audience already follows and trusts, we shorten the path to purchase."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "Product Drop Entered the Feed",
      client: "DTC Streetwear Brand",
      metrics: [
        { label: "Observed ROAS", value: "4.8x" },
        { label: "CPA Reduction", value: "40%" }
      ]
    },
    cta: {
      headline: "Drive Sales with Native Placement",
      subtext: "Put your products in front of our highly-engaged audience."
    }
  },
  "mobile-apps": {
    title: "Mobile App",
    slug: "mobile-apps",
    themeColor: "#00e88f",
    hero: {
      headline: "Fan communities are mobile-first by nature.",
      description: "When your app is introduced through content an audience already trusts, the conversion path shortens dramatically. Our network drives installs, not just impressions and our CPM model means you're paying for reach that can prove itself."
    },
    benefits: [
      { title: "Mobile first communities", description: "" },
      { title: "Install driven creative", description: "" },
      { title: "High engagement baseline", description: "" }
    ],
    fit: {
      title: "Why this is a fit for Mobile Apps",
      description: "Friction kills app installs. By reaching users while they are actively scrolling on mobile, the journey from discovery to download is instantaneous."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "App Entered Mobile Fan Feeds",
      client: "Top 10 Utility App",
      metrics: [
        { label: "Installs", value: "2M+" },
        { label: "CPI", value: "-60%" }
      ]
    },
    cta: {
      headline: "Acquire Users at Scale",
      subtext: "Reach mobile-first audiences from channels they already trust."
    }
  },
  casinos: {
    title: "Casinos",
    slug: "casinos",
    themeColor: "#f0c040",
    hero: {
      headline: "The audience every gaming and casino brand is looking for, already built.",
      description: "Tap into our diverse network of sports fans, entertainment audiences, and high-intent adults placed in front of your brand natively and at scale. Compliance-conscious placements, geo-targeting capability, and a CPM model that keeps every campaign accountable to real numbers."
    },
    benefits: [
      { title: "Audiences already placing bets", description: "" },
      { title: "Compliance conscious placements", description: "" },
      { title: "Geo targeted reach", description: "" }
    ],
    fit: {
      title: "Why this is a fit for Casinos",
      description: "Sports fans and entertainment followers form the core of the iGaming market. We own those audiences and provide the infrastructure to reach them compliantly."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "Operator Entered Sports Audience Pockets",
      client: "Major US Sportsbook",
      metrics: [
        { label: "Targeted Reach", value: "15M+" },
        { label: "FTDs Driven", value: "12,000+" }
      ]
    },
    cta: {
      headline: "Reach High-Intent Gaming Audiences",
      subtext: "Secure controlled placement where betting intent already exists."
    }
  },
  other: {
    title: "Other / Clipping",
    slug: "other",
    themeColor: "#a855f7",
    hero: {
      headline: "If your audience watches, follows, or cares we can reach them.",
      description: "Our network spans sports, entertainment, music, and culture. Tell us your goals and we'll show you where your brand fits inside the stadium."
    },
    benefits: [
      { title: "Cross-vertical reach", description: "" },
      { title: "Custom placement strategy", description: "" },
      { title: "Built around your goals", description: "" }
    ],
    fit: {
      title: "Why this is a fit for Custom Campaigns",
      description: "Because we own and manage the audience surfaces, we have the flexibility to design bespoke campaigns that rented ad inventory cannot match."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Total Monthly Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Global Followers" }
    ],
    caseStudy: {
      title: "Message Routed Across Audience Surfaces",
      client: "Global Streaming Platform",
      metrics: [
        { label: "Verified Impressions", value: "45M" },
        { label: "Engagement Rate", value: "8.5%" }
      ]
    },
    cta: {
      headline: "Build a Custom Campaign",
      subtext: "Tell us who you need to reach and we will identify the owned path in."
    }
  }
};
