import { Metadata } from 'next';
import { getArticles } from '@/app/actions';
import NewsFeed from '@/components/news-feed';
import { Suspense } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import Team from '@/components/team';
import AboutPublication from '@/components/about-publication';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default async function Home() {
  const articles = await getArticles();
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="border-b border-border/60 pb-8 mb-8">
            <div className="flex flex-col gap-4">
              <div className="inline-block w-fit overflow-hidden rounded-xl bg-[#002a5c] p-1.5 shadow-md border border-white/10">
                <Image
                  src="/title-logo.png"
                  alt="Debt & Dominion"
                  width={360}
                  height={116}
                  priority
                  className="h-14 sm:h-18 md:h-20 w-auto object-contain rounded-lg"
                />
              </div>
              <h1 className="sr-only">Debt & Dominion</h1>
              <p className="text-base text-muted-foreground sm:text-lg max-w-3xl leading-relaxed">
                Strategic analysis and data-driven journalism navigating global finance, macroeconomics, technology, and geopolitical power.
              </p>
            </div>
          </header>
          <Suspense>
            <NewsFeed articles={articles} />
          </Suspense>
        </div>
        <Team />
        <AboutPublication />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
