"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, ArrowRight } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    toast({
      title: "Subscribed!",
      description: "You've been added to our weekly intelligence digest.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-0">
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  className="h-11 border-border/80 text-sm focus-visible:ring-emerald-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-destructive mt-1" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 bg-emerald-600 font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            <span className="flex items-center gap-1.5">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
