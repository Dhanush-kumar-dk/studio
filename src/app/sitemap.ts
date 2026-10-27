import { MetadataRoute } from 'next';
import { getArticles, getAuthorSlugs } from '@/app/actions';
import { getBaseUrl, siteConfig } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = siteConfig.categories.map((cat) => ({
    url: `${baseUrl}/?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  try {
    const [articles, authorSlugs] = await Promise.all([
      getArticles().catch(() => []),
      getAuthorSlugs().catch(() => []),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
      let lastMod = now;
      try {
        if (article.publishedAt) {
          const parsed = new Date(article.publishedAt);
          if (!isNaN(parsed.getTime())) {
            lastMod = parsed;
          }
        }
      } catch {
        // Fallback to now
      }

      return {
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    });

    const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
      url: `${baseUrl}/author/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes, ...authorRoutes];
  } catch (error) {
    console.error('Error compiling dynamic sitemap entries:', error);
    return [...staticRoutes, ...categoryRoutes];
  }
}
