
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import { subscribeToNewsletter } from "@/ai/flows/subscribe-to-newsletter";
import { Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (email) {
      const result = await subscribeToNewsletter({ email });
      if (result.status === 'subscribed') {
        toast({
          title: "Subscribed!",
          description: "You've been successfully subscribed to our newsletter.",
        });
        setEmail('');
      } else {
        toast({
          title: "Subscription Failed",
          description: "Could not subscribe. Please try again.",
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
      <Input 
        type="email" 
        name="email" 
        placeholder="Enter your email" 
        className="flex-1" 
        required 
        disabled={isSubmitting}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
