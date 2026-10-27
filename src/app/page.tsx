import { Metadata } from 'next';
import { getArticles } from '@/app/actions';
import NewsFeed from '@/components/news-feed';
import { Suspense } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import Team from '@/components/team';
import AboutPublication from '@/components/about-publication';
import EditorialProducts from '@/components/editorial-products';
import { BreadcrumbJsonLd } from '@/components/schema-org';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Debt & Dominion — Geopolitics, Finance & Global Power Intelligence',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
  },
};

export default async function Home() {
  const articles = await getArticles();
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: 'Home', item: '/' }]}
      />
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="border-b border-border/60 pb-6 mb-8">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Debt & Dominion
            </h1>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg max-w-3xl leading-relaxed">
              Strategic analysis and data-driven journalism navigating global finance, macroeconomics, technology, and geopolitical power.
            </p>
          </header>
          <Suspense>
            <NewsFeed articles={articles} />
          </Suspense>
        </div>
        <EditorialProducts />
        <Team />
        <AboutPublication />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
