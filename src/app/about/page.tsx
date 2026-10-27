import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import AboutTeamCarousel from '@/components/about-team-carousel';
import { BreadcrumbJsonLd, AboutPageJsonLd } from '@/components/schema-org';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, BookOpen, Scale, ArrowRight, Award } from 'lucide-react';

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: 'About Us — Editorial Mission, Research Products & Leadership',
  description:
    'Discover the mission, editorial standards, research products, and leadership behind Debt & Dominion. Analyzing the intricate connections between sovereign debt, technology, and global power.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    title: 'About Debt & Dominion | Editorial Mission, Products & Leadership',
    description:
      'Discover the mission, editorial standards, research products, and leadership behind Debt & Dominion.',
    url: `${baseUrl}/about`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'About Debt & Dominion — Mission & Leadership',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Debt & Dominion | Editorial Mission & Leadership',
    description:
      'Analyzing the structural forces of global debt, finance, technology, and geopolitical power.',
    images: [`${baseUrl}/og.png`],
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'About Us', item: '/about' },
        ]}
      />
      <AboutPageJsonLd />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/60 bg-muted/20 py-16 sm:py-24 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300 mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Independent Geopolitical & Financial Journalism</span>
            </div>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              About Debt & Dominion
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base sm:text-xl text-muted-foreground leading-relaxed">
              Decoding the financial architecture and geopolitical dynamics that shape modern international power.
            </p>
          </div>
        </section>

        {/* Editorial Foundation */}
        <section className="py-16 border-b border-border/60">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-foreground/90">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Our Editorial Foundation & Philosophy
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground font-semibold">Debt & Dominion</strong> was founded on a simple yet critical premise: you cannot understand modern geopolitics without interrogating the global financial systems underpinning it.
                </p>
                <p>
                  While conventional media treats international relations and economics as separate disciplines, our publication analyzes them as a unified ecosystem. From sovereign credit restructurings in emerging markets to multilateral sanctions, sovereign wealth fund allocations to frontier AI compute controls, financial tools have become the primary instruments of geopolitical statecraft.
                </p>
                <p>
                  Whether you are an institutional policymaker, macroeconomic investor, university researcher, or informed reader, Debt & Dominion provides uncompromised clarity, rigorous citations, and deep structural analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Products & Intelligence Offerings */}
        <section className="py-16 bg-muted/20 border-b border-border/60">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Publications & Editorial Offerings
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-extrabold text-foreground">
                Our Research Products & Formats
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                How we deliver actionable research to global analysts, students, and readers worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="font-headline text-lg font-bold text-foreground">
                  Weekly Intelligence Briefing
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our premier newsletter delivered every Monday morning, synthesizing central bank policy decisions, debt distress, and diplomatic maneuvers.
                </p>
                <Link
                  href="/newsletter"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline pt-2"
                >
                  <span>Subscribe to Newsletter</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="font-headline text-lg font-bold text-foreground">
                  In-Depth Research Dispatches
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Peer-researched long-form investigations into sovereign debt, multilateral governance (IMF, World Bank), and foreign currency reserve politics.
                </p>
                <Link
                  href="/?category=Politics"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline pt-2"
                >
                  <span>Read Geopolitical Dispatches</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="font-headline text-lg font-bold text-foreground">
                  Technology & Compute Monitor
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Analytical assessments of artificial intelligence policies, export restriction regimes, and national strategies for technological supremacy.
                </p>
                <Link
                  href="/?category=Technology"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline pt-2"
                >
                  <span>Explore Tech & AI Intelligence</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Standards & E-E-A-T */}
        <section id="standards" className="py-16 border-b border-border/60 scroll-mt-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Editorial Integrity & Standards</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-foreground">
                Rigorous Methodology & Fact-Checking
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border/60 bg-card p-6 space-y-3">
                <div className="flex items-center gap-2 font-headline font-bold text-base text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Primary Source Verification</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Our reporting relies directly on primary documentation: central bank balance sheets, treaty texts, legislative filings, and peer-reviewed economic research papers.
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-6 space-y-3">
                <div className="flex items-center gap-2 font-headline font-bold text-base text-foreground">
                  <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Editorial Independence</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Debt & Dominion maintains strict editorial independence. We do not accept sponsored editorial influence, pay-for-play coverage, or undisclosed corporate lobbying.
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-6 space-y-3">
                <div className="flex items-center gap-2 font-headline font-bold text-base text-foreground">
                  <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Academic Collaboration</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Founded by student leaders and researchers across the University of Winchester, Oxford summer scholars, and Model UN chairs, we marry academic depth with dynamic publishing.
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-6 space-y-3">
                <div className="flex items-center gap-2 font-headline font-bold text-base text-foreground">
                  <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Transparent Citations & Corrections</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every published analysis features structured BibTeX and APA academic citations, enabling researchers to cite, verify, and cross-reference our work freely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="bg-muted/20 py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet Our Leadership
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-lg text-muted-foreground">
                The dedicated analysts and researchers driving our global reporting.
              </p>
            </div>
            <AboutTeamCarousel />
          </div>
        </section>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
