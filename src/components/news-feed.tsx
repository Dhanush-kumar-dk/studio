
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
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const categories = ['All', 'Politics', 'Sports', 'Technology', 'World'];

// Function to shuffle an array
const shuffle = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export default function NewsFeed({ articles }: { articles: (Article & {_id: any})[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const selectedCategory = searchParams.get('category') ?? 'All';
  const searchQuery = searchParams.get('search') ?? '';

  const [carouselArticles, setCarouselArticles] = useState<(Article & {_id: any})[]>([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(articles.map(a => a.category))];
    const shuffledArticles = shuffle([...articles]);
    const carouselItems = uniqueCategories.map(category => {
        return shuffledArticles.find(article => article.category === category);
    }).filter((a): a is (Article & {_id: any}) => !!a);

    setCarouselArticles(shuffle(carouselItems).slice(0, 5));
  }, [articles]);

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
        !carouselArticles.some(ca => ca._id.toString() === article._id.toString())
      )
      .filter((article) =>
        selectedCategory === 'All' ? true : article.category === selectedCategory
      )
      .filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [articles, selectedCategory, searchQuery, carouselArticles]);

  const gridArticles = filteredArticles;

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
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {isLoading ? (
            renderSkeletons()
          ) : (
            <>
              {carouselArticles.length > 0 && (
                 <Carousel 
                    className="w-full mb-8"
                    opts={{
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                    >
                    <CarouselContent>
                        {carouselArticles.map((article) => (
                        <CarouselItem key={article._id.toString()}>
                            <div className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                <Link href={`/articles/${article.slug}`}>
                                    <div className="relative h-64 md:h-96">
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        priority
                                        data-ai-hint={article.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    </div>
                                    <div className="absolute bottom-0 p-6 text-white">
                                    <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                                    <h2 className="font-headline text-2xl font-bold md:text-4xl">{article.title}</h2>
                                    <p className="mt-2 hidden text-lg text-slate-300 md:block">{article.excerpt}</p>
                                    </div>
                                </Link>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
              )}
              {gridArticles.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {gridArticles.map((article) => (
                    <ArticleCard key={article._id.toString()} article={{...article, id: article._id.toString()}} />
                  ))}
                </div>
              ) : (
                 <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 py-24 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">No articles found</h3>
                    <p className="mt-2 text-muted-foreground">
                        Try adjusting your search or filters.
                    </p>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

