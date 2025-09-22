"use client";

import type { Article } from '@/lib/types';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useState, useTransition, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ArticleCard from './article-card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

const categories = ['All', 'Politics', 'Sports', 'Technology', 'World'];

export default function NewsFeed({ articles }: { articles: Article[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const selectedCategory = searchParams.get('category') ?? 'All';
  const searchQuery = searchParams.get('search') ?? '';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', value);
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
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  const isLoading = isPending;

  const renderSkeletons = () => (
    <>
       <Skeleton className="h-[400px] w-full rounded-lg" />
       <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
       </div>
    </>
  );

  return (
    <div>
      <Tabs value={selectedCategory} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-none sm:inline-flex">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {isLoading ? (
            renderSkeletons()
          ) : filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 py-24 text-center">
                <h3 className="text-2xl font-semibold tracking-tight">No articles found</h3>
                <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filters.
                </p>
            </div>
          ) : (
            <>
              {featuredArticle && (
                <div className="group relative mb-8 overflow-hidden rounded-lg bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <Link href={`/articles/${featuredArticle.slug}`}>
                    <div className="relative h-64 md:h-96">
                      <Image
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority
                        data-ai-hint={featuredArticle.imageHint}
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 p-6 text-white">
                       <Badge variant="secondary" className="mb-2">{featuredArticle.category}</Badge>
                      <h2 className="font-headline text-2xl font-bold md:text-4xl">{featuredArticle.title}</h2>
                      <p className="mt-2 hidden text-lg text-slate-300 md:block">{featuredArticle.excerpt}</p>
                    </div>
                  </Link>
                </div>
              )}
              {gridArticles.length > 0 && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {gridArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
