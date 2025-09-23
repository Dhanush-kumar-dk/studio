
import { getArticlesByAuthor, getAuthorSlugs } from '@/app/actions';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AuthorPageContent from '@/components/author-page-content';

type AuthorPageProps = {
  params: {
    slug: string;
  };
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const authorArticles = await getArticlesByAuthor(params.slug);

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
    const authorSlugs = await getAuthorSlugs();
    return authorSlugs.map((slug) => ({
      slug: slug,
    }));
}
