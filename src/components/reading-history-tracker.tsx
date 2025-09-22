"use client";

import { useEffect } from 'react';
import { useReadingHistory } from '@/hooks/use-reading-history';
import { useAuth } from '@/hooks/use-auth';

export default function ReadingHistoryTracker({ articleId }: { articleId: string }) {
  const { addArticleToHistory } = useReadingHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      addArticleToHistory(articleId);
    }
  }, [articleId, addArticleToHistory, user]);

  return null;
}
