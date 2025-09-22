"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FormEvent } from "react";

export default function NewsletterForm() {
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (email && e.currentTarget.checkValidity()) {
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
      });
      e.currentTarget.reset();
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2" noValidate>
      <Input type="email" name="email" placeholder="Enter your email" className="flex-1" required />
      <Button type="submit">
        Subscribe
      </Button>
    </form>
  );
}
