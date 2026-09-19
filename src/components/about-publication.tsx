import Image from 'next/image';
import { CheckCircle2, BookOpen } from 'lucide-react';

const deliverables = [
  'Original, long-form articles grounded in academic research',
  'Sharp editorial analysis of economic and political systems',
  'Design-led storytelling magazine that makes complex topics accessible',
  'A platform for global student collaboration',
];

export default function AboutPublication() {
  return (
    <section className="w-full border-t border-border/60 bg-background py-20 text-foreground transition-colors duration-200">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <BookOpen className="h-3.5 w-3.5" />
              <span>About Our Mission</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight text-foreground">
              Analysing Financial Systems and International Relations
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                Founded in 2025 by Vedika Joshi and her team, <strong className="text-foreground font-semibold">Debt & Dominion</strong> is an international publication dedicated to exploring the dynamic intersections of economics, geopolitics, and global governance.
              </p>
              <p>
                We offer a new kind of analysis: one that doesn't just report on global affairs, but interrogates the financial systems behind them. From sovereign debt to sanctions, development diplomacy to energy economics, each issue uncovers how financial tools shape political decisions.
              </p>
              <p>
                Powered by students and early-career thinkers from leading global institutions, we combine academic rigor with visually bold, design-forward storytelling.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4">
              <h3 className="font-headline text-base font-bold text-foreground">Each issue delivers:</h3>
              <ul className="space-y-2.5">
                {deliverables.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-muted-foreground">
                    <CheckCircle2 className="mr-2.5 mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-md">
              <Image 
                src="https://picsum.photos/seed/publication-books/600/800"
                alt="Stack of economics and political science publications"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
                data-ai-hint="books stack"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Monthly Edition</span>
                <h4 className="font-headline text-lg font-bold">Debt & Dominion Intelligence Digest</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
