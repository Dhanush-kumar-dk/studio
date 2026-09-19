import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import AboutTeamCarousel from '@/components/about-team-carousel';
import { BreadcrumbJsonLd } from '@/components/schema-org';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About Us — Editorial Mission & Leadership',
  description:
    'Discover the mission, editorial standards, and leadership behind Debt & Dominion. Analyzing the intricate connections between wealth, technology, and global power.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Debt & Dominion | Editorial Mission & Leadership',
    description:
      'Discover the mission, editorial standards, and leadership behind Debt & Dominion.',
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
        ]}
      />
      <Header />
      <main className="flex-1">
        <section className="bg-muted/20 py-16 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
              About Debt & Dominion
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Navigating the complex worlds of finance, technology, and power with clarity and strategic insight.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-4">
                Our Editorial Foundation
              </h2>
              <p>
                <strong>Debt & Dominion</strong> was founded on a simple yet powerful premise: to demystify
                the intricate connections between wealth, power, and influence that shape our world.
              </p>
              <p>
                Our coverage spans from the boardrooms of multinational corporations to the halls of
                government, from the dynamics of global financial markets to the strategic economics of technology and
                geopolitics.
              </p>
              <p>
                Whether you're an institutional investor, a policy analyst, an economics scholar, or
                an engaged citizen, Debt & Dominion is your essential guide to the structural forces that drive modern
                civilization.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/20 py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet Our Leadership
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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