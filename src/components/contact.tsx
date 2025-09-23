import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <section className="w-full border-t bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            Contact Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
        <div className="mt-12">
          <form action="#" method="POST" className="mx-auto max-w-xl">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <Label htmlFor="first-name" className="font-semibold">First name</Label>
                <div className="mt-2.5">
                  <Input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="last-name" className="font-semibold">Last name</Label>
                <div className="mt-2.5">
                  <Input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <div className="mt-2.5">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message" className="font-semibold">Message</Label>
                <div className="mt-2.5">
                  <Textarea
                    name="message"
                    id="message"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button type="submit" className="w-full">
                Let's talk
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
