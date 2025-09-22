import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
          <form className="flex w-full items-center space-x-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
