import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[#e95f3c]/40 hover:shadow-xl dark:border-white/10 dark:hover:border-[#e95f3c]/40">
        
        {/* 16:9 Thumbnail (WPTuts Enhanced-Grid Style) */}
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={article.imageHint}
            />
            {/* WPTuts Vibrant Category Badge */}
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded bg-[#e95f3c] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                {article.category}
              </span>
            </div>
          </div>
        </CardHeader>

        {/* Card Body */}
        <CardContent className="flex flex-1 flex-col p-5">
          <h3 className="font-headline text-lg font-bold leading-snug text-[#152333] transition-colors group-hover:text-[#e95f3c] dark:text-white dark:group-hover:text-[#e95f3c] line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {article.excerpt}
          </p>
        </CardContent>

        {/* WPTuts Style Card Divider & Meta Footer */}
        <div className="mx-5 border-t border-border/50" />
        <CardFooter className="flex items-center justify-between p-5 pt-3.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {formattedDate && (
              <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-[#e95f3c]" />
                <time dateTime={article.publishedAt}>{formattedDate}</time>
              </span>
            )}
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 hover:text-[#e95f3c]">
              {article.category}
            </span>
          </div>

          <span className="flex items-center gap-1 font-bold text-[#e95f3c] transition-transform group-hover:translate-x-1">
            <span>Read</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
