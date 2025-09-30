
export default function Newsletter() {
  return (
    <section className="w-full border-t bg-muted/20">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Subscribe to Debt & Dominion
            </h2>
            <p className="text-lg text-muted-foreground">
              Get the latest news, articles, and updates delivered straight to your inbox. Stay ahead of the curve on finance and power.
            </p>
        </div>
        <div className="mt-8 w-full max-w-2xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd91TDrZ285pC6TTMQEc8gV8-qdxYO4ji9O2ATbtQseOyJ7pQ/viewform?embedded=true" width="100%" height="450" frameBorder="0" marginHeight={0} marginWidth={0}>Loading…</iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
