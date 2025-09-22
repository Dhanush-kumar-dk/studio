import { articles } from '@/lib/data';
import NewsFeed from '@/components/news-feed';
import { Suspense } from 'react';
import Header from '@/components/header';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Suspense>
            <NewsFeed articles={articles} />
          </Suspense>
        </div>
      </main>
      <Contact />
      <Footer />
    </>
  );
}
