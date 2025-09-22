"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { summarizeArticle } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

export default function SummarizeButton({ articleContent }: { articleContent: string }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');

    const result = await summarizeArticle(articleContent);

    if (result.error) {
      toast({
        title: 'Summarization Failed',
        description: result.error,
        variant: 'destructive',
      });
      setIsOpen(false);
    } else if (result.summary) {
      setSummary(result.summary);
    }
    
    setIsLoading(false);
  };
  
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if(open && !summary && !isLoading) {
      handleSummarize();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Wand2 className="mr-2 h-4 w-4" />
          Summarize with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Article Summary</DialogTitle>
          <DialogDescription>
            An AI-generated summary of the article.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating summary...</p>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto rounded-md border p-4">
            <p>{summary}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
