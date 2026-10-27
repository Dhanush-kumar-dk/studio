import { siteConfig } from '@/lib/site-config';

type BreadcrumbItem = {
  name: string;
  item: string;
};

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
      sameAs: [siteConfig.links.linkedin, siteConfig.links.tiktok],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: siteConfig.name,
    legalName: 'Debt & Dominion Media',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.links.email,
    founder: {
      '@type': 'Person',
      name: 'Miss Vedika Joshi',
      jobTitle: 'Founder & Editor-in-Chief',
      description: 'Economics & Finance researcher at University of Winchester, Royal Navy Cadet, and Model UN Chair.',
    },
    sameAs: [siteConfig.links.linkedin, siteConfig.links.tiktok],
    knowsAbout: [
      'Geopolitics',
      'Macroeconomics',
      'Global Financial Markets',
      'Sovereign Debt',
      'Artificial Intelligence & Technology',
      'Geopolitical Strategy',
      'Development Diplomacy',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  excerpt,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorSlug,
  slug,
  category,
}: {
  title: string;
  excerpt: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorSlug: string;
  slug: string;
  category: string;
}) {
  const articleUrl = `${siteConfig.url}/articles/${slug}`;
  const authorUrl = `${siteConfig.url}/author/${authorSlug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: title,
    description: excerpt,
    image: [imageUrl],
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    articleSection: category,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `${siteConfig.url}${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AuthorJsonLd({
  name,
  role,
  bio,
  imageUrl,
  slug,
}: {
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  slug: string;
}) {
  const authorUrl = `${siteConfig.url}/author/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: name,
      jobTitle: role || 'Journalist',
      description: bio,
      image: imageUrl,
      url: authorUrl,
      worksFor: {
        '@type': 'NewsMediaOrganization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductsJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Debt & Dominion Editorial & Research Offerings',
    description: 'Flagship publications, intelligence digests, and macro dossiers by Debt & Dominion.',
    itemListElement: [
      {
        '@type': 'Product',
        position: 1,
        name: 'Weekly Intelligence Briefing',
        description: 'Comprehensive weekly analytical briefing on sovereign debt restructuring, central bank policies, and geopolitical power shifts.',
        url: `${siteConfig.url}/newsletter`,
        category: 'Publications > Periodicals > Newsletters',
        image: `${siteConfig.url}/og.png`,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Product',
        position: 2,
        name: 'Sovereign Debt & Geopolitics Dossiers',
        description: 'Original long-form investigative research uncovering how financial systems and credit agreements dictate international statecraft.',
        url: `${siteConfig.url}/?category=Politics`,
        category: 'Publications > Research Reports',
        image: `${siteConfig.url}/og.png`,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Product',
        position: 3,
        name: 'AI & Technology Geopolitics Monitor',
        description: 'Strategic intelligence on frontier AI governance, sovereign compute infrastructure, semiconductor supply chains, and export sanctions.',
        url: `${siteConfig.url}/?category=Technology`,
        category: 'Publications > Tech Intelligence',
        image: `${siteConfig.url}/og.png`,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'Product',
        position: 4,
        name: 'World Affairs & Emerging Market Dispatches',
        description: 'Ground-level reporting and regional macroeconomic assessments powered by our international student and analyst network.',
        url: `${siteConfig.url}/?category=World`,
        category: 'Publications > International Affairs',
        image: `${siteConfig.url}/og.png`,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AboutPageJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Debt & Dominion — Mission, Leadership & Editorial Standards',
    description: 'Learn about Debt & Dominion, our editorial leadership, fact-checking methodology, and mission to decode global finance and geopolitics.',
    url: `${siteConfig.url}/about`,
    mainEntity: {
      '@type': 'NewsMediaOrganization',
      name: siteConfig.name,
      legalName: 'Debt & Dominion Media',
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
      founder: {
        '@type': 'Person',
        name: 'Miss Vedika Joshi',
        jobTitle: 'Founder & Editor-in-Chief',
        description: 'Economics & Finance researcher at University of Winchester, Royal Navy Cadet, and Model UN Chair.',
        sameAs: siteConfig.links.linkedin,
      },
      publishingPrinciples: `${siteConfig.url}/about#standards`,
      ethicsPolicy: `${siteConfig.url}/about#standards`,
      sameAs: [siteConfig.links.linkedin, siteConfig.links.tiktok],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
