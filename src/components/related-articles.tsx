import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Article } from '@/lib/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function RelatedArticles({
  articles,
  category,
}: {
  articles: (Article & { _id: string })[];
  category: string;
}) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border/60 pt-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Keep Reading
          </span>
          <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Related Stories in {category}
          </h2>
        </div>
        <Link
          href={`/?category=${encodeURIComponent(category)}`}
          className="group hidden items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground sm:flex"
        >
          <span>View all in {category}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const formattedDate = article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : null;

          return (
            <Link key={article._id} href={`/articles/${article.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={article.imageHint}
                    />
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center rounded-md border border-orange-500/20 bg-background/90 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 backdrop-blur-sm dark:bg-slate-900/90 dark:text-orange-300">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    {formattedDate && (
                      <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formattedDate}</span>
                      </div>
                    )}
                    <h3 className="font-headline text-base font-bold leading-snug text-foreground transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                    <span>Read Article</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
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
