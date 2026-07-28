"use client";

import type { Article } from '@/lib/types';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useState, useTransition, useEffect, Suspense } from 'react';
import ArticleCard from './article-card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Calendar, User, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const categories = ['All', 'Politics', 'Sports', 'Technology', 'World'];

function NewsFeedContent({ articles }: { articles: (Article & {_id: any})[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const selectedCategory = searchParams.get('category') ?? 'All';
  const searchQuery = searchParams.get('search') ?? '';

  const [carouselArticles, setCarouselArticles] = useState<(Article & {_id: any})[]>([]);

  useEffect(() => {
    const sortedArticles = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setCarouselArticles(sortedArticles.slice(0, 5));
  }, [articles]);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
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

  const renderSkeletons = () => (
    <div className="space-y-8">
      <Skeleton className="h-[400px] w-full rounded-2xl" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border/60 p-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="space-y-8">
      {/* Minimalist Category Tabs */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500 dark:text-slate-950"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        {searchQuery && (
          <div className="text-xs text-muted-foreground">
            Filter: <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{searchQuery}"</span>
          </div>
        )}
      </div>

      {isPending ? (
        renderSkeletons()
      ) : (
        <>
          {/* Featured Hero Carousel */}
          {!searchQuery && selectedCategory === 'All' && carouselArticles.length > 0 && (
            <div className="relative mb-10">
              <Carousel
                className="w-full"
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 6000 })]}
              >
                <CarouselContent>
                  {carouselArticles.map((article) => (
                    <CarouselItem key={article._id.toString()}>
                      <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300">
                        <Link href={`/articles/${article.slug}`}>
                          <div className="relative h-72 sm:h-96 md:h-[440px] w-full">
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              priority
                              data-ai-hint={article.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                          </div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="inline-flex items-center rounded-md bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-sm">
                                {article.category}
                              </span>
                              <span className="text-xs text-slate-300 flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>

                            <h2 className="font-headline text-2xl font-extrabold sm:text-3xl md:text-4xl leading-tight text-white transition-colors group-hover:text-emerald-300">
                              {article.title}
                            </h2>

                            <p className="mt-3 line-clamp-2 max-w-3xl text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                              {article.excerpt}
                            </p>

                            <div className="mt-5 flex items-center gap-2 font-semibold text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">
                              <span>Read Full Article</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-background/80 border-border backdrop-blur hover:bg-background text-foreground" />
                <CarouselNext className="right-4 bg-background/80 border-border backdrop-blur hover:bg-background text-foreground" />
              </Carousel>
            </div>
          )}

          {/* Article Grid */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-headline text-xl font-bold tracking-tight text-foreground">
                {selectedCategory === 'All' ? 'Latest Stories' : `${selectedCategory} Articles`}
              </h3>
              <span className="text-xs text-muted-foreground">
                Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article._id.toString()} article={{...article, id: article._id.toString()}} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/30 py-20 text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400 mb-3 flex items-center justify-center font-bold">
                  !
                </div>
                <h4 className="font-headline text-lg font-semibold text-foreground">No articles found</h4>
                <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                  We couldn't find any articles matching your search criteria. Try resetting filters.
                </p>
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
                >
                  Show All Articles
                </button>
              </div>
            )}
          </div>
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
