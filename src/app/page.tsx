import { Metadata } from 'next';
import { getArticles } from '@/app/actions';
import NewsFeed, { NewsFeedSkeleton } from '@/components/news-feed';
import { Suspense } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import Team from '@/components/team';
import AboutPublication from '@/components/about-publication';
import WptutsHero from '@/components/wptuts-hero';
import LeadMagnetBanner from '@/components/lead-magnet-banner';
import FeaturedDispatches from '@/components/featured-dispatches';
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
      <WptutsHero />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Suspense fallback={<NewsFeedSkeleton />}>
            <NewsFeed articles={articles} />
          </Suspense>

          {/* WPTuts Style Lead Magnet "Essential Documents" Banner */}
          <LeadMagnetBanner />

          {/* WPTuts Style "Featured Tutorials" Deep Dives */}
          <FeaturedDispatches articles={articles} />
        </div>

        <Team />
        <AboutPublication />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
