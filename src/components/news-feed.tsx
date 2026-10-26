"use client";

import type { Article } from '@/lib/types';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useState, useTransition, Suspense } from 'react';
import ArticleCard from './article-card';
import { Skeleton } from './ui/skeleton';
import { ChevronRight, Filter } from 'lucide-react';

const categories = ['All', 'Politics', 'Sports', 'Technology', 'World'];
const ARTICLES_PER_PAGE = 6;

function NewsFeedContent({ articles }: { articles: (Article & {_id: any})[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const selectedCategory = searchParams.get('category') ?? 'All';
  const searchQuery = searchParams.get('search') ?? '';
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.delete('page'); // Reset to page 1
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage <= 1) {
      params.delete('page');
    } else {
      params.set('page', newPage.toString());
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}#dispatches`, { scroll: true });
    });
  };

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) =>
        selectedCategory === 'All' ? true : article.category === selectedCategory
      )
      .filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [articles, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const renderSkeletons = () => (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-border/70 p-4">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <section id="dispatches" className="space-y-8 scroll-mt-20">
      {/* WPTuts Style Section Header with Accent Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border/60 pb-6">
        <div className="border-l-4 border-[#e95f3c] pl-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#e95f3c]">
            Continuous Intelligence
          </div>
          <h2 className="font-headline text-2xl font-extrabold tracking-tight sm:text-3xl text-[#152333] dark:text-white uppercase mt-0.5">
            {selectedCategory === 'All' ? 'Latest Dispatches' : `${selectedCategory} Dispatches`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            In-depth reporting, sovereign debt tracking, and policy intelligence updated throughout the week.
          </p>
        </div>

        {/* WPTuts Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#e95f3c] text-white shadow-md"
                    : "bg-muted/60 text-slate-600 hover:bg-muted hover:text-foreground dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {searchQuery && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground border border-border/50">
          <Filter className="h-4 w-4 text-[#e95f3c]" />
          <span>Showing results for search term:</span>
          <span className="font-bold text-[#e95f3c]">"{searchQuery}"</span>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('search');
              router.replace(`${pathname}?${params.toString()}`);
            }}
            className="ml-auto underline hover:text-foreground"
          >
            Clear Search
          </button>
        </div>
      )}

      {isPending ? (
        renderSkeletons()
      ) : (
        <>
          {/* Article Enhanced Grid */}
          {paginatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article._id.toString()} article={{...article, id: article._id.toString()}} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 py-20 text-center">
              <div className="h-12 w-12 rounded-full bg-[#e95f3c]/10 p-3 text-[#e95f3c] mb-3 flex items-center justify-center font-bold text-lg">
                !
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">No Dispatches Found</h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-sm">
                No articles matched your criteria. Try selecting another category or resetting the search.
              </p>
              <button
                onClick={() => handleCategoryChange('All')}
                className="mt-4 rounded bg-[#e95f3c] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#ad3b1e]"
              >
                Show All Dispatches
              </button>
            </div>
          )}

          {/* WPTuts Style Numeric Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-1.5 pt-8 border-t border-border/50" aria-label="Pagination">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`flex h-9 w-9 items-center justify-center rounded text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#e95f3c] text-white shadow-sm"
                        : "border border-border/70 bg-card text-foreground hover:border-[#e95f3c] hover:text-[#e95f3c]"
                    }`}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex h-9 items-center gap-1 rounded border border-border/70 bg-card px-3 text-xs font-bold text-foreground transition-all hover:border-[#e95f3c] hover:text-[#e95f3c]"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </nav>
          )}
        </>
      )}
    </section>
  );
}

export default function NewsFeed(props: { articles: (Article & {_id: any})[] }) {
  return (
    <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-xl bg-muted" />}>
      <NewsFeedContent {...props} />
    </Suspense>
  );
}
