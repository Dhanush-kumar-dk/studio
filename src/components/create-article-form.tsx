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
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, X, Link as LinkIcon } from 'lucide-react';
import type { Article } from '@/lib/types';
import LinkEditor from './link-editor';

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
    article?: Article & { _id: any };
}

export default function CreateArticleForm({ article }: CreateArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!article;
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState<[number, number] | null>(null);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [linkEditorPosition, setLinkEditorPosition] = useState({ top: 0, left: 0 });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || '',
      imageUrl: article?.imageUrl || '',
      content: article?.content || '',
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
        ? await updateArticle(article._id.toString(), input)
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

  const handleSelection = () => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
        setSelection([start, end]);

        // Create a dummy div to find the position of the selected text
        const dummy = document.createElement('div');
        dummy.style.position = 'absolute';
        dummy.style.visibility = 'hidden';
        dummy.style.whiteSpace = 'pre-wrap';
        dummy.style.font = window.getComputedStyle(textarea).font;
        dummy.style.width = textarea.clientWidth + 'px';
        dummy.style.padding = window.getComputedStyle(textarea).padding;
        dummy.style.border = window.getComputedStyle(textarea).border;
        dummy.style.letterSpacing = window.getComputedStyle(textarea).letterSpacing;
        dummy.style.lineHeight = window.getComputedStyle(textarea).lineHeight;

        const textBefore = textarea.value.substring(0, start);
        const selectedText = textarea.value.substring(start, end);

        dummy.textContent = textBefore;

        const span = document.createElement('span');
        span.textContent = selectedText;
        dummy.appendChild(span);
        
        document.body.appendChild(dummy);
        
        const textareaRect = textarea.getBoundingClientRect();
        const spanRect = span.getBoundingClientRect();
        
        let top = textareaRect.top - textarea.scrollTop + span.offsetTop - 30; // 30px to position above
        let left = textareaRect.left - textarea.scrollLeft + span.offsetLeft;

        // Clamp position
        top = Math.max(textareaRect.top, top);
        left = Math.min(Math.max(textareaRect.left, left), textareaRect.right - 120); // 120 is button width

        setLinkEditorPosition({ top, left });
        
        document.body.removeChild(dummy);

    } else {
        setSelection(null);
        setShowLinkEditor(false);
    }
};

  const applyLink = (url: string, target: string) => {
    const textarea = contentRef.current;
    if (!textarea || !selection) return;

    const [start, end] = selection;
    const currentContent = form.getValues('content');
    const selectedText = currentContent.substring(start, end);
    const link = `<a href="${url}" target="${target}">${selectedText}</a>`;
    const newContent = `${currentContent.substring(0, start)}${link}${currentContent.substring(end)}`;
    
    form.setValue('content', newContent, { shouldValidate: true, shouldDirty: true });
    setShowLinkEditor(false);
    setSelection(null);
  };

  const submitButtonText = isEditMode ? 'Update Article' : 'Publish Article';
  const submittingButtonText = isEditMode ? 'Updating...' : 'Publishing...';

  return (
    <>
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
            <div className="relative">
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Body</FormLabel>
                    <FormControl>
                        <Textarea
                        {...field}
                        ref={contentRef}
                        placeholder="Write your full article content here. You can use HTML for formatting links, images, and videos."
                        rows={15}
                        onSelect={handleSelection}
                        onScroll={() => setSelection(null)}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 {selection && !showLinkEditor && (
                     <Button
                        type="button"
                        variant="secondary"
                        className="absolute h-8"
                        style={{ top: `${linkEditorPosition.top}px`, left: `${linkEditorPosition.left}px`, zIndex: 10 }}
                        onClick={() => setShowLinkEditor(true)}
                     >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Add Link
                     </Button>
                 )}
            </div>
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

    {showLinkEditor && selection && (
        <LinkEditor
          onSetLink={applyLink}
          onClose={() => setShowLinkEditor(false)}
        />
      )}
    </>
  );
}
