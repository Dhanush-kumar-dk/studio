import { articles } from '@/lib/data';
import NewsFeed from '@/components/news-feed';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Suspense>
        <NewsFeed articles={articles} />
      </Suspense>
    </div>
  );
}
