import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import NewsletterForm from '@/components/newsletter-form';
import { BreadcrumbJsonLd } from '@/components/schema-org';
import { siteConfig } from '@/lib/site-config';
import { ShieldCheck, Mail, Sparkles } from 'lucide-react';

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: 'Subscribe to Newsletter | Strategic Intelligence Briefing',
  description:
    'Join institutional investors, policymakers, and analysts receiving Debt & Dominion’s intelligence briefings on global macroeconomics, sovereign debt, technology, and geopolitical power.',
  alternates: {
    canonical: '/newsletter',
  },
  openGraph: {
    type: 'website',
    title: 'Subscribe to Debt & Dominion Newsletter | Weekly Strategic Intelligence',
    description:
      'Weekly intelligence briefings decoding global macroeconomics, sovereign debt markets, and geopolitical shifts.',
    url: `${baseUrl}/newsletter`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Debt & Dominion Newsletter — Weekly Intelligence Briefing',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscribe to Debt & Dominion Intelligence Briefing',
    description:
      'Weekly analysis on sovereign debt, macroeconomics, tech governance, and global power shifts.',
    images: [`${baseUrl}/og.png`],
  },
};

export default function NewsletterPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Weekly Newsletter', item: '/newsletter' },
        ]}
      />
      <Header />
      <main className="flex-1 bg-background">
        <section className="container mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300 mb-4">
            <Mail className="h-3.5 w-3.5" />
            <span>Weekly Editorial Publication</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Subscribe to Debt & Dominion
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Join thousands of analysts, university researchers, and policy thinkers who rely on Debt & Dominion’s Monday intelligence briefings to anticipate shifts in sovereign debt, global markets, and geopolitical power.
          </p>

          <div className="mt-8 w-full max-w-md">
            <NewsletterForm />
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-border/60 pt-8 w-full">
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 font-bold text-xs uppercase text-orange-600 dark:text-orange-400">
                <Sparkles className="h-3.5 w-3.5" /> Every Monday
              </span>
              <p className="text-xs text-muted-foreground">Directly to your inbox before European & US market open.</p>
            </div>
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 font-bold text-xs uppercase text-orange-600 dark:text-orange-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Zero Spam
              </span>
              <p className="text-xs text-muted-foreground">Uncompromising editorial standards. Unsubscribe at any time with one click.</p>
            </div>
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 font-bold text-xs uppercase text-orange-600 dark:text-orange-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Free & Accessible
              </span>
              <p className="text-xs text-muted-foreground">Independent research open to students, scholars, and professionals globally.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
