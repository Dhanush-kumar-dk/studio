import { getArticles } from '@/app/actions';
import NewsFeed from '@/components/news-feed';
import { Suspense } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import Team from '@/components/team';
import AboutPublication from '@/components/about-publication';

export default async function Home() {
  const articles = await getArticles();
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
