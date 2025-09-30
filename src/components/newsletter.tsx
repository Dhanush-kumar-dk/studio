
import NewsletterForm from "./newsletter-form";

export default function Newsletter() {
  return (
    <section className="w-full border-t bg-muted/20">
      <div className="container mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 px-4 py-16 text-center md:grid-cols-2 md:text-left">
        <div className="space-y-4">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Subscribe to Debt & Dominion
            </h2>
            <p className="text-lg text-muted-foreground">
              Get the latest news, articles, and updates delivered straight to your inbox. Stay ahead of the curve on finance and power.
            </p>
        </div>
        <div className="w-full max-w-md md:justify-self-end">
            <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
