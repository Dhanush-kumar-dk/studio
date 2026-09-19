import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import NewsletterForm from '@/components/newsletter-form';
import { BreadcrumbJsonLd } from '@/components/schema-org';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Subscribe to Newsletter | Strategic Intelligence Briefing',
  description:
    'Join institutional investors, policymakers, and analysts receiving Debt & Dominion’s intelligence briefings on global macroeconomics, technology, and geopolitical power.',
  alternates: {
    canonical: '/newsletter',
  },
  openGraph: {
    title: 'Subscribe to Debt & Dominion Newsletter',
    description:
      'Intelligence briefings on global macroeconomics, technology, and geopolitics.',
    url: `${siteConfig.url}/newsletter`,
  },
};

export default function NewsletterPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Newsletter', item: '/newsletter' },
        ]}
      />
      <Header />
      <main className="flex-1 bg-background">
        <section className="container mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-md border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 mb-4">
            Intelligence Briefings
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Subscribe to Debt & Dominion
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
            Essential analysis on global finance, technology disruptions, and geopolitical shifts delivered directly to your inbox.
          </p>
          <div className="mt-8 w-full max-w-md">
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
