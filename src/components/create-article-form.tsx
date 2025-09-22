"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createArticle } from '@/app/actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
  category: z.enum(['Technology', 'Politics', 'Sports', 'World']),
});

export default function CreateArticleForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: 'Technology',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await createArticle({ ...values, author: 'Anonymous' });

    if (result.error) {
      toast({
        title: 'Error creating article',
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.slug) {
      toast({
        title: 'Article created!',
        description: 'Your article has been successfully published.',
      });
      router.push(`/articles/${result.slug}`);
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Article Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a catchy title for your article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Politics">Politics</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="World">World</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short summary to grab the reader's attention"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your full article content here. You can use HTML for formatting."
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            'Publish Article'
          )}
        </Button>
      </form>
    </Form>
  );
}
