"use client";

import { useEffect, useState } from 'react';
import { useReadingHistory } from '@/hooks/use-reading-history';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { getArticles } from '@/app/actions';
import type { Article } from '@/lib/types';
import ArticleCard from './article-card';
import { Skeleton } from './ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

export default function RecommendedArticles() {
  const { history } = useReadingHistory();
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!user) {
        setIsLoading(false);
        return;
      };

      setIsLoading(true);
      const allArticles = await getArticles();
      const readingHistoryText = history
        .map(id => {
            const article = allArticles.find(a => a.id === id);
            return article ? `${article.title} (${article.category})` : '';
        })
        .filter(Boolean)
        .join(', ');

      try {
        const result = await getPersonalizedRecommendations({
          readingHistory: readingHistoryText || 'No reading history yet.',
          preferences: 'Technology, Politics, Finance', 
          numberOfRecommendations: 3,
        });

        const recommendedArticles = result.recommendations
          .map(recTitle => allArticles.find(a => a.title.toLowerCase() === recTitle.toLowerCase()))
          .filter((a): a is Article => !!a);
        
        setRecommendations(recommendedArticles);
      } catch (error) {
        console.error('Failed to get recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [history, user]);

  if (!user) {
    return <p>Please log in to see your personalized recommendations.</p>
  }

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
             <div key={i} className="space-y-2">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      );
  }

  if (recommendations.length === 0) {
    return <p>No recommendations available at the moment. Start reading to get personalized suggestions!</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
