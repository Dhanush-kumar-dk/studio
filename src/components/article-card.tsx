import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User } from 'lucide-react';

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl dark:hover:border-orange-500/30">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={article.imageHint}
            />
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-md border border-orange-500/20 bg-background/90 px-2.5 py-1 text-xs font-semibold text-orange-700 backdrop-blur-sm dark:bg-slate-900/90 dark:text-orange-300">
                {article.category}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-5">
          <h3 className="font-headline text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400">
            {article.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/40 p-5 pt-3.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {article.author && (
              <span className="flex items-center gap-1 font-medium text-foreground/80">
                <User className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                {article.author}
              </span>
            )}
            {formattedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 font-semibold text-orange-600 transition-colors group-hover:translate-x-1 dark:text-orange-400">
            Read <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
