import type { Metadata } from 'next';
import { getArticleBySlug, getArticles } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Pencil } from 'lucide-react';
import DeleteArticleButton from '@/components/delete-article-button';
import Link from 'next/link';
import ArticleAudioPlayer from '@/components/article-audio-player';
import ArticleShareBar from '@/components/article-share-bar';
import RelatedArticles from '@/components/related-articles';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/schema-org';
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

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const description =
    article.excerpt ||
    article.content.substring(0, 160).replace(/<[^>]*>/g, '').trim();
  const canonicalUrl = `/articles/${article.slug}`;

  return {
    title: article.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description,
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      authors: [article.author],
      section: article.category,
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(params.slug),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }
  
  const articleId = article._id;

  // Filter related articles from same category, with fallback to latest
  const categoryRelated = allArticles.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  );
  const otherRelated = allArticles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category
  );
  const relatedArticles = [...categoryRelated, ...otherRelated].slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        excerpt={article.excerpt || article.title}
        imageUrl={article.imageUrl}
        datePublished={article.publishedAt}
        authorName={article.author}
        authorSlug={article.authorSlug}
        slug={article.slug}
        category={article.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: article.category, item: `/?category=${encodeURIComponent(article.category)}` },
          { name: article.title, item: `/articles/${article.slug}` },
        ]}
      />
      <Header />
      <main className="flex-1 bg-background">
        <article className="container mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-4">
            <span className="inline-flex items-center rounded-md border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">
              {article.category}
            </span>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground md:text-5xl leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <Link href={`/author/${article.authorSlug}`} className="group flex items-center gap-2 font-medium text-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={article.authorImageUrl} alt={article.author} />
                    <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{article.author}</span>
                </Link>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="h-9 gap-1.5 border-border/80 text-xs font-medium hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400">
                  <Link href={`/edit-post/${article.slug}`}>
                    <Pencil className="h-3.5 w-3.5" />
                    <span>Edit Article</span>
                  </Link>
                </Button>
                <DeleteArticleButton articleId={articleId} />
              </div>
            </div>

            {/* Prominent Audio Narration Player */}
            <ArticleAudioPlayer 
              title={article.title} 
              content={article.content} 
              author={article.author} 
            />

            {/* Social Share & Citation Bar */}
            <ArticleShareBar
              title={article.title}
              slug={article.slug}
              author={article.author}
              publishedAt={article.publishedAt}
            />
          </div>

          <div className="relative mb-10 h-72 sm:h-96 md:h-[460px] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
              data-ai-hint={article.imageHint}
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-headings:font-bold prose-p:leading-relaxed prose-a:text-orange-600 dark:prose-a:text-orange-400 hover:prose-a:underline">
            <div className="whitespace-pre-wrap text-foreground/90 font-body leading-relaxed text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Contextual Related Stories */}
          <RelatedArticles articles={relatedArticles} category={article.category} />
        </article>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
