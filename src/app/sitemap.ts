import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantorventures.com";

interface Entry {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}

const ROUTES: Entry[] = [
  { path: "/",            priority: 1.0, changeFrequency: "weekly"  },
  { path: "/audio",       priority: 0.8, changeFrequency: "weekly"  },
  { path: "/ecommerce",   priority: 0.8, changeFrequency: "weekly"  },
  { path: "/mobile-apps", priority: 0.8, changeFrequency: "weekly"  },
  { path: "/casinos",     priority: 0.8, changeFrequency: "weekly"  },
  { path: "/other",       priority: 0.8, changeFrequency: "weekly"  },
  { path: "/about",       priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact",     priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
