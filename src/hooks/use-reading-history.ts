"use client";

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'newsflash-reading-history';
const MAX_HISTORY_SIZE = 20;

export const useReadingHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Could not load reading history", error);
    }
  }, []);

  const addArticleToHistory = useCallback((articleId: string) => {
    setHistory(prevHistory => {
      // Remove article if it exists to move it to the front
      const newHistory = prevHistory.filter(id => id !== articleId);
      // Add article to the front
      newHistory.unshift(articleId);
      // Limit history size
      const limitedHistory = newHistory.slice(0, MAX_HISTORY_SIZE);
      
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
      } catch (error) {
        console.error("Could not save reading history", error);
      }
      return limitedHistory;
    });
  }, []);

  return { history, addArticleToHistory };
};
