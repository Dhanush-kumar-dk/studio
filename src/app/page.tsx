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
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Suspense>
            <NewsFeed articles={articles} />
          </Suspense>
        </div>
        <Team />
      </main>
      <Newsletter />
      <AboutPublication />
      <Footer />
    </>
  );
}
