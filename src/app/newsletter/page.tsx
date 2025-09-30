
import Header from '@/components/header';
import Footer from '@/components/footer';

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
            <div className="mt-8 w-full max-w-2xl">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd91TDrZ285pC6TTMQEc8gV8-qdxYO4ji9O2ATbtQseOyJ7pQ/viewform?embedded=true" width="100%" height="450" frameBorder="0" marginHeight={0} marginWidth={0}>Loading…</iframe>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
