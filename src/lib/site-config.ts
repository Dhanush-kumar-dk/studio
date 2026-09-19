export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://debtanddominion.com';
}

export const siteConfig = {
  name: 'Debt & Dominion',
  shortName: 'Debt & Dominion',
  title: 'Debt & Dominion | Geopolitics, Finance & Global Power Intelligence',
  description:
    'Navigating the complex worlds of global finance, tech, and geopolitics with uncompromised clarity, data-driven journalism, and strategic insight.',
  url: getBaseUrl(),
  ogImage: '/og.png',
  locale: 'en_US',
  author: 'Debt & Dominion Editorial Board',
  creator: 'Debt & Dominion',
  publisher: 'Debt & Dominion Publishing',
  links: {
    email: 'debtdominionofficial@gmail.com',
    linkedin: 'https://www.linkedin.com/company/debt-dominion/',
    tiktok: 'https://www.tiktok.com/@debtanddominion',
  },
  categories: ['Technology', 'Politics', 'Sports', 'World'] as const,
};
