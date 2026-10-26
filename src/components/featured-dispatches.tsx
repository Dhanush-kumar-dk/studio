"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { ArrowRight, BookOpen, Star, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function FeaturedDispatches({ articles }: { articles: (Article & {_id: any})[] }) {
  // Pick 2 articles for the featured tutorials/deep-dives section
  const featured = articles.slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="my-16 scroll-mt-24">
      {/* WPTuts Style Center Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e95f3c]">
          <Star className="h-3.5 w-3.5 fill-[#e95f3c]" />
          <span>Editor's Selection</span>
        </div>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-[#152333] dark:text-white uppercase">
          Featured Deep Dives
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Comprehensive investigations and macroeconomic masterclasses unpacking the machinery of global power.
        </p>
      </div>

      {/* 2-Column Side-by-Side Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featured.map((article) => {
          const formattedDate = article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : null;

          return (
            <Link
              key={article._id.toString()}
              href={`/articles/${article.slug}`}
              className="group block h-full"
            >
              <Card className="overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#e95f3c]/40 dark:border-white/10 flex flex-col h-full">
                {/* Large 16:9 Thumbnail with Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded bg-[#e95f3c] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                      {article.category}
                    </span>
                  </div>

                  {formattedDate && (
                    <div className="absolute bottom-3 left-4 text-xs font-medium text-white/90 flex items-center gap-1.5 drop-shadow">
                      <Calendar className="h-3.5 w-3.5 text-[#e95f3c]" />
                      <span>{formattedDate}</span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#152333] group-hover:text-[#e95f3c] dark:text-white dark:group-hover:text-[#e95f3c] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-bold text-[#e95f3c]">
                    <span className="uppercase tracking-wider">Read Complete Analysis</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
