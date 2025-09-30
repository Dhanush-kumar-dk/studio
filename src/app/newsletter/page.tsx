
import Header from '@/components/header';
import Footer from '@/components/footer';
import NewsletterForm from '@/components/newsletter-form';

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
              Subscribe to Debt & Dominion
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get the latest news, articles, and updates delivered straight to your inbox. Stay ahead of the curve on finance and power.
            </p>
            <div className="mt-8 w-full max-w-sm">
                <NewsletterForm />
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
