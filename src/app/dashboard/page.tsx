import RecommendedArticles from '@/components/recommended-articles';
import { सस्पेंस } from 'react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here are some articles we think you'll like.
        </p>
      </div>
      <Suspense fallback={<p>Loading recommendations...</p>}>
        <RecommendedArticles />
      </Suspense>
    </div>
  );
}
