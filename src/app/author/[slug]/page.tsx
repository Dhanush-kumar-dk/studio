
import { articles } from '@/lib/data';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AuthorPageContent from '@/components/author-page-content';

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

  return (
    <>
      <Header />
      <AuthorPageContent articles={authorArticles} />
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
