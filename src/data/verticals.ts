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
      headline: "Owned Access to Music Fandom.",
      description: "Vantor controls music and culture pages inside a 60M+ follower, 1B+ monthly view network where fans already discover, debate, and replay what moves them. Audio placements enter music fandom as part of the feed, not as external ads."
    },
    benefits: [
      { title: "Owned Music Fandom", description: "Placement across pages Vantor operates where music fans already follow artists, sounds, clips, and culture." },
      { title: "Fan-Aligned Timing", description: "Posts are matched to the audience moment, release window, and feed behavior instead of dropped into generic inventory." },
      { title: "Direct Listening Paths", description: "Attention moves from trusted fan context to Spotify, Apple Music, DSPs, platforms, and sign-up flows." }
    ],
    fit: {
      title: "Why this is different",
      description: "Most media buys sit around music content. Vantor owns the fan surfaces where music attention is already concentrated, then places releases inside the communities that set the soundtrack."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "Release Entered Music Fandom",
      client: "Audio Network Placement",
      metrics: [
        { label: "Fan Reach", value: "+340%" },
        { label: "Cost Per View", value: "$0.03" }
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
      headline: "Commerce Placement Inside Trusted Feeds.",
      description: "Vantor gives products native placement inside owned sports, culture, and entertainment feeds across 60M+ followers and 1B+ monthly views. The offer appears where attention already exists, not beside it."
    },
    benefits: [
      { title: "Native Product Placement", description: "Product visibility inside audience channels Vantor controls directly, shaped to feel natural in the feed." },
      { title: "Trusted Feed Context", description: "The placement is built around page format, audience behavior, discovery rhythm, and content cadence." },
      { title: "Conversion-Ready Attention", description: "Traffic comes from communities already used to acting on what they discover inside sports and entertainment media." }
    ],
    fit: {
      title: "Why this is different",
      description: "Instead of competing in auction inventory, the product enters a live audience environment Vantor already owns, manages, and places by hand."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "Product Drop Entered the Feed",
      client: "Commerce Network Placement",
      metrics: [
        { label: "Observed ROAS", value: "4.8x" },
        { label: "CPA", value: "-40%" }
      ]
    },
    cta: {
      headline: "Place Products Where Attention Already Lives",
      subtext: "Open a commerce path through owned audience surfaces."
    }
  },
  "mobile-apps": {
    title: "Mobile Apps",
    slug: "mobile-apps",
    themeColor: "#00e88f",
    hero: {
      headline: "Mobile Installs From Owned Attention.",
      description: "Vantor's 60M+ follower network is already mobile-first, already scrolling, and already reacting. Apps enter trusted feed environments where the next action is one tap away."
    },
    benefits: [
      { title: "App Install Ecosystem", description: "Access audiences already engaging from the same device where installs, sign-ups, and reactivations happen." },
      { title: "Placement-Led Creative", description: "App messaging is built for the owned feed it enters, not forced into a generic acquisition unit." },
      { title: "High-Intent Audience Pockets", description: "Apps are routed into sports, entertainment, gaming, and culture communities with relevant behavior and action." }
    ],
    fit: {
      title: "Why this is different",
      description: "Most user acquisition buys chase people across platforms. Vantor brings the app into owned communities already primed to respond across a 1B+ monthly view attention layer."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "App Entered Mobile Fan Feeds",
      client: "Mobile App Network Placement",
      metrics: [
        { label: "Installs", value: "2M+" },
        { label: "CPI", value: "-60%" }
      ]
    },
    cta: {
      headline: "Put the App Inside the Feed",
      subtext: "Reach mobile audiences from channels they already trust."
    }
  },
  casinos: {
    title: "Casinos & iGaming",
    slug: "casinos",
    themeColor: "#f0c040",
    hero: {
      headline: "Sports and Gaming Audiences, Already Assembled.",
      description: "Vantor operates audience surfaces where sports, odds, competition, and entertainment already overlap across 60M+ followers and 1B+ monthly views. Regulated brands enter those pockets through controlled, context-aware placement."
    },
    benefits: [
      { title: "Audience Targeting Layer", description: "Direct reach into communities where game outcomes, betting behavior, fandom, and entertainment intent are already visible." },
      { title: "Compliance-Aware Placement", description: "Messaging is handled with regulatory, platform, and market restrictions in view." },
      { title: "Geo-Controlled Reach", description: "Audience access can be narrowed to the states, regions, and windows where operators are live." }
    ],
    fit: {
      title: "Why this is different",
      description: "The audience is not inferred from third-party targeting. It is visible in the network through the content they follow and the moments they engage with."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Monthly Network Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Owned Follower Base" }
    ],
    caseStudy: {
      title: "Operator Entered Sports Audience Pockets",
      client: "Casino Network Placement",
      metrics: [
        { label: "Targeted Reach", value: "15M+" },
        { label: "Placement Control", value: "100%" }
      ]
    },
    cta: {
      headline: "Enter the Sports Audience Layer",
      subtext: "Secure controlled placement where gaming intent already exists."
    }
  },
  other: {
    title: "Other / Clipping",
    slug: "other",
    themeColor: "#a855f7",
    hero: {
      headline: "Custom Audience Surfaces, Built and Operated.",
      description: "When one vertical is not enough, Vantor routes the message through owned clipping, culture, sports, music, and entertainment surfaces across 60M+ followers and 1B+ monthly views."
    },
    benefits: [
      { title: "Owned Clipping Networks", description: "Attention can be routed through pages and formats Vantor controls directly." },
      { title: "Cross-Vertical Reach", description: "Sports, music, entertainment, commerce, gaming, and culture audiences can be combined with intent." },
      { title: "Hands-On Integration", description: "Placement is handled manually around audience fit, format, timing, and message." }
    ],
    fit: {
      title: "Why this is different",
      description: "This is not a menu of ad products. It is direct routing through audience infrastructure Vantor owns and operates."
    },
    metrics: [
      { value: "1B+", endValue: 1, suffix: "B+", label: "Total Monthly Views" },
      { value: "60M+", endValue: 60, suffix: "M+", label: "Global Followers" }
    ],
    caseStudy: {
      title: "Message Routed Across Audience Surfaces",
      client: "Cross-Vertical Network Placement",
      metrics: [
        { label: "Verified Impressions", value: "45M" },
        { label: "Engagement Rate", value: "8.5%" }
      ]
    },
    cta: {
      headline: "Route Through the Right Audience Surface",
      subtext: "Tell us who you need to reach and we will identify the owned path in."
    }
  }
};
