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
    sameAs: [siteConfig.links.linkedin, siteConfig.links.tiktok],
    knowsAbout: [
      'Geopolitics',
      'Macroeconomics',
      'Global Financial Markets',
      'Sovereign Debt',
      'Artificial Intelligence & Technology',
      'Geopolitical Strategy',
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
