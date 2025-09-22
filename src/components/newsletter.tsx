"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Newsletter() {
  return (
    <section className="w-full border-t bg-muted/20">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              Subscribe to our Newsletter
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get the latest news, articles, and updates from Debt & Dominion delivered straight to your inbox.
            </p>
          </div>
          <div className="flex w-full items-center justify-center md:justify-end">
            <Button asChild size="lg">
              <Link href="/newsletter">
                Subscribe Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
