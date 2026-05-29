const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantorventures.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vantor Ventures",
    url: SITE_URL,
    description: "Owned audience infrastructure for direct media placement",
    sameAs: [
      "https://linkedin.com/company/vantorventures",
      "https://twitter.com/vantorventures",
    ],
  };
}

export function serviceSchema(opts: {
  name: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    url: `${SITE_URL}${opts.slug}`,
    description: opts.description,
    provider: {
      "@type": "Organization",
      name: "Vantor Ventures",
      url: SITE_URL,
    },
  };
}

export function breadcrumbSchema(
  trail: { name: string; slug: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.slug}`,
    })),
  };
}

interface JsonLdProps {
  data: unknown;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
