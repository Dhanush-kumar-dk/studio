import NewsletterForm from "./newsletter-form";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="w-full border-t border-border/60 bg-muted/30 py-16 transition-colors duration-200">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 sm:p-12 shadow-sm">
          <div className="absolute right-0 top-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="space-y-3 md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Mail className="h-3.5 w-3.5" />
                <span>Weekly Intelligence Digest</span>
              </div>
              <h2 className="font-headline text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Stay Ahead of Global Debt & Dominion
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Get our curated analyses, market insights, and geopolitical reports delivered straight to your inbox every week.
              </p>
            </div>

            <div className="w-full md:col-span-5">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
