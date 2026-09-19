import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/newsletter',
          '/articles/',
          '/author/',
          '/favicons/',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/create-post',
          '/create-post/',
          '/edit-post/',
          '/profile',
          '/profile/',
          '/api/',
          '/auth/',
        ],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'Anthropic-ai'],
        allow: ['/', '/articles/', '/about', '/author/', '/llms.txt'],
        disallow: ['/dashboard/', '/profile/', '/api/', '/create-post/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
