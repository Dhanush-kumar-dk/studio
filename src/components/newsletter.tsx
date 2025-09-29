"use client";

import NewsletterForm from "./newsletter-form";

export default function Newsletter() {
  return (
    <section className="w-full border-t bg-muted/20">
      <div className="container mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Subscribe to Debt & Dominion
            </h2>
            <p className="text-lg text-muted-foreground">
              Get the latest news, articles, and updates delivered straight to your inbox. Stay ahead of the curve on finance and power.
            </p>
        </div>
        <div className="mt-8 max-w-md mx-auto">
            <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
