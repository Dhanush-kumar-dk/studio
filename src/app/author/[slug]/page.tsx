
import type { Metadata } from 'next';
import { getArticlesByAuthor, getAuthorSlugs } from '@/app/actions';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AuthorPageContent from '@/components/author-page-content';
import { AuthorJsonLd, BreadcrumbJsonLd } from '@/components/schema-org';

type AuthorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const authorArticles = await getArticlesByAuthor(params.slug);
  if (authorArticles.length === 0) {
    return {
      title: 'Author Not Found',
    };
  }

  const authorName = authorArticles[0].author;
  const canonicalUrl = `/author/${params.slug}`;
  const description = `Read authoritative reporting, macroeconomic research, and geopolitical intelligence by ${authorName} on Debt & Dominion.`;

  return {
    title: `${authorName} — Author & Analyst`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'profile',
      title: `${authorName} | Debt & Dominion`,
      description,
      url: canonicalUrl,
      images: [
        {
          url: authorArticles[0].authorImageUrl,
          alt: authorName,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${authorName} | Debt & Dominion`,
      description,
      images: [authorArticles[0].authorImageUrl],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const authorArticles = await getArticlesByAuthor(params.slug);

  if (authorArticles.length === 0) {
    notFound();
  }

  const first = authorArticles[0];

  return (
    <>
      <AuthorJsonLd
        name={first.author}
        imageUrl={first.authorImageUrl}
        slug={first.authorSlug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Authors', item: '/#team' },
          { name: first.author, item: `/author/${first.authorSlug}` },
        ]}
      />
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
