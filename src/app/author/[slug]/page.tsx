import { articles } from '@/lib/data';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ArticleCard from '@/components/article-card';

type AuthorPageProps = {
  params: {
    slug: string;
  };
};

export default function AuthorPage({ params }: AuthorPageProps) {
  const authorArticles = articles.filter((a) => a.authorSlug === params.slug);

  if (authorArticles.length === 0) {
    notFound();
  }

  const author = authorArticles[0];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-muted/20 py-16">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={author.authorImageUrl} alt={author.author} />
              <AvatarFallback>{author.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
                {author.author}
              </h1>
              <p className="text-lg text-muted-foreground">
                Articles by {author.author}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {authorArticles.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {authorArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 py-24 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">No articles found</h3>
                    <p className="mt-2 text-muted-foreground">
                        This author has not published any articles yet.
                    </p>
                </div>
             )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
    const authorSlugs = [...new Set(articles.map((article) => article.authorSlug))];
    return authorSlugs.map((slug) => ({
      slug: slug,
    }));
}
