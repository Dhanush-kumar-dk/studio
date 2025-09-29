
import { getArticleBySlug, getArticles } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, Pencil } from 'lucide-react';
import SummarizeButton from '@/components/summarize-button';
import DeleteArticleButton from '@/components/delete-article-button';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }
  
  const articleId = article._id;


  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{article.category}</Badge>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <Link href={`/author/${article.authorSlug}`} className="flex items-center gap-2 hover:text-primary">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={article.authorImageUrl} alt={article.author} />
                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{article.author}</span>
              </Link>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={article.imageHint}
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline">
            <div className="mb-8 flex justify-end gap-2">
              <Button asChild variant="outline" size="icon">
                  <Link href={`/edit-post/${article.slug}`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit Article</span>
                  </Link>
              </Button>
              <SummarizeButton articleContent={article.content} />
              <DeleteArticleButton articleId={articleId} />
            </div>
            <div className="prose-p:leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

        </article>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}

