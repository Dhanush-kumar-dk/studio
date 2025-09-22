"use client";

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
import { createArticle, updateArticle } from '@/app/actions';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, X } from 'lucide-react';
import type { Article } from '@/lib/types';

const formSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  imageUrl: z.string().url('Please enter a valid image URL.').optional().or(z.literal('')),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
  focusKeywords: z.string().min(1, 'Please enter at least one focus keyword.'),
  slug: z.string().optional(),
  metaDescription: z.string().min(20, 'Meta description must be at least 20 characters.'),
  author: z.string().min(1, 'Author is required.'),
  category: z.enum(['Technology', 'Politics', 'Sports', 'World']),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters.'),
});

type CreateArticleFormProps = {
    article?: Article;
}

export default function CreateArticleForm({ article }: CreateArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!article;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || '',
      imageUrl: article?.imageUrl || '',
      content: article?.content.replace(/<[^>]+>/g, '') || '', // Strip html for textarea
      focusKeywords: article?.focusKeywords.join(', ') || '',
      slug: article?.slug || '',
      metaDescription: article?.metaDescription || '',
      author: article?.author || 'Anonymous',
      category: article?.category || 'Technology',
      excerpt: article?.excerpt || '',
    },
  });

  const watchedImageUrl = useWatch({
    control: form.control,
    name: 'imageUrl',
  });

  const [imageUrl, setImageUrl] = useState(article?.imageUrl || '');
  
  useEffect(() => {
    if (watchedImageUrl && (form.getFieldState('imageUrl').isDirty || isEditMode) && !form.getFieldState('imageUrl').error) {
      const timer = setTimeout(() => {
        setImageUrl(watchedImageUrl);
      }, 500);
      return () => clearTimeout(timer);
    } else if(!watchedImageUrl) {
        setImageUrl('');
    }
  }, [watchedImageUrl, form, isEditMode]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const input = { 
      ...values,
      slug: values.slug || '',
      imageUrl: values.imageUrl || '',
     };

    const result = isEditMode && article 
        ? await updateArticle(article.id, input)
        : await createArticle(input);

    if (result.error) {
      toast({
        title: `Error ${isEditMode ? 'updating' : 'creating'} article`,
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.slug) {
      toast({
        title: `Article ${isEditMode ? 'updated' : 'created'}!`,
        description: `Your article has been successfully ${isEditMode ? 'updated' : 'published'}.`,
      });
      router.push(`/articles/${result.slug}`);
      router.refresh();
    }
    setIsSubmitting(false);
  }

  const submitButtonText = isEditMode ? 'Update Article' : 'Publish Article';
  const submittingButtonText = isEditMode ? 'Updating...' : 'Publishing...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Featured Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
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
                  <FormLabel className="text-lg font-semibold">Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your full article content here. You can use HTML for formatting links, images, and videos."
                      rows={15}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="focusKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Focus Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AI, machine learning, tech (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., my-awesome-article (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A concise summary for search engine results"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <aside className="space-y-8 lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>{isEditMode ? 'Update' : 'Publish'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Author</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the author's name" {...field} />
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
                        <FormLabel className="font-semibold">Category</FormLabel>
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
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? (
                            <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {submittingButtonText}
                            </>
                        ) : (
                            submitButtonText
                        )}
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Featured Image Preview</CardTitle>
                </CardHeader>
                <CardContent>
                {imageUrl ? (
                    <div className="relative aspect-video w-full">
                        <Image src={imageUrl} alt="Featured image preview" fill className="rounded-md object-cover" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute bottom-2 right-2 h-7 w-7"
                            onClick={() => form.setValue('imageUrl', '')}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove image</span>
                        </Button>
                    </div>
                ) : (
                    <div className="flex aspect-video w-full items-center justify-center rounded-md border-2 border-dashed bg-muted">
                        <p className="text-sm text-muted-foreground">Image preview will appear here</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </aside>
      </form>
    </Form>
  );
}
