import CreateArticleForm from '@/components/create-article-form';
import { articles } from '@/lib/data';
import { notFound } from 'next/navigation';

type EditPostPageProps = {
    params: {
        slug: string;
    }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
          Edit Article
        </h1>
        <p className="mt-2 text-muted-foreground">Refine your story.</p>
      </div>
      <CreateArticleForm article={article} />
    </div>
  );
}
