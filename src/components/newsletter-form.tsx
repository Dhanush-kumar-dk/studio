"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import { subscribeToNewsletter } from "@/app/actions";
import { Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (email && e.currentTarget.checkValidity()) {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        toast({
          title: "Subscribed!",
          description: "You've been successfully subscribed to our newsletter.",
        });
        e.currentTarget.reset();
      } else {
        toast({
          title: "Subscription Failed",
          description: result.error || "Could not subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2" noValidate>
      <Input type="email" name="email" placeholder="Enter your email" className="flex-1" required disabled={isSubmitting} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
