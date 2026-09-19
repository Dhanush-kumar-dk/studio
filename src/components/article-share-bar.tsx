"use client";

import * as React from 'react';
import { Share2, Link as LinkIcon, Check, Quote, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LinkedInFavicon } from './icons/favicons';

function TwitterXIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="X logo">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="WhatsApp logo">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.813 3.183 0 5.768-2.586 5.768-5.766 0-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.519-4.481 10-10 10-1.748 0-3.385-.45-4.818-1.238l-4.182 1.097 1.116-4.079c-.868-1.479-1.371-3.208-1.371-5.05 0-5.519 4.481-10 10-10s10 4.481 10 10z" />
    </svg>
  );
}

export default function ArticleShareBar({
  title,
  slug,
  author,
  publishedAt,
}: {
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  const [citationCopied, setCitationCopied] = React.useState<string | null>(null);

  const [currentUrl, setCurrentUrl] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl || window.location.href);
      setCopied(true);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this article directly.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Unable to copy",
        description: "Please copy the URL directly from your browser bar.",
        variant: "destructive",
      });
    }
  };

  const shareText = encodeURIComponent(`${title} via Debt & Dominion`);
  const shareUrl = encodeURIComponent(currentUrl);

  const pubDate = new Date(publishedAt);
  const year = isNaN(pubDate.getFullYear()) ? new Date().getFullYear() : pubDate.getFullYear();
  const formattedDate = isNaN(pubDate.getTime())
    ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const apaCitation = `${author} (${year}). "${title}." Debt & Dominion, ${formattedDate}. ${currentUrl}`;
  const bibtexCitation = `@article{debtdominion_${slug.replace(/[^a-zA-Z0-9]/g, '_')},
  title={{${title}}},
  author={{${author}}},
  journal={Debt & Dominion},
  year={${year}},
  url={${currentUrl}}
}`;

  const copyCitation = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCitationCopied(format);
      toast({
        title: `${format} Citation Copied`,
        description: "Ready to paste into your research, article, or bibliography.",
      });
      setTimeout(() => setCitationCopied(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5 text-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs sm:text-sm">
        <Share2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span>Share & Cite:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* LinkedIn Share */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-xs hover:border-[#0A66C2] hover:text-[#0A66C2]"
        >
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
          >
            <LinkedInFavicon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </Button>

        {/* X / Twitter Share */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-xs hover:border-foreground hover:text-foreground"
        >
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on X"
          >
            <TwitterXIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Post</span>
          </a>
        </Button>

        {/* WhatsApp Share */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-xs hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share via WhatsApp"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </Button>

        {/* Copy Link */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="h-8 gap-1.5 px-2.5 text-xs hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <LinkIcon className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </Button>

        {/* Cite Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 px-2.5 text-xs bg-background/50 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <Quote className="h-3.5 w-3.5" />
              <span>Cite</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span>Cite this Article</span>
              </DialogTitle>
              <DialogDescription>
                Use the citations below for academic publications, newsletters, policy briefs, or media references.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* APA */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span>APA Format</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs text-emerald-600 dark:text-emerald-400"
                    onClick={() => copyCitation(apaCitation, 'APA')}
                  >
                    {citationCopied === 'APA' ? 'Copied!' : 'Copy APA'}
                  </Button>
                </div>
                <div className="rounded-lg border border-border/80 bg-muted/40 p-3 text-xs font-mono text-muted-foreground break-all">
                  {apaCitation}
                </div>
              </div>

              {/* BibTeX */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span>BibTeX (LaTeX / Zotero)</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs text-emerald-600 dark:text-emerald-400"
                    onClick={() => copyCitation(bibtexCitation, 'BibTeX')}
                  >
                    {citationCopied === 'BibTeX' ? 'Copied!' : 'Copy BibTeX'}
                  </Button>
                </div>
                <pre className="rounded-lg border border-border/80 bg-muted/40 p-3 text-[11px] font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto">
                  {bibtexCitation}
                </pre>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
