import CreateArticleForm from '@/components/create-article-form';
import { getArticleBySlug } from '@/app/actions';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';

type EditPostPageProps = {
    params: {
        slug: string;
    }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
              Edit Article
            </h1>
            <p className="mt-2 text-muted-foreground">Refine your story.</p>
          </div>
          <CreateArticleForm article={article} />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
