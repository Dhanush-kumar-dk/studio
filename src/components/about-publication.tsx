import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const deliverables = [
    'Original, long-form articles grounded in academic research',
    'Sharp editorial analysis of economic and political systems',
    'Design-led storytelling magazine that makes complex topics accessible',
    'A platform for global student collaboration',
];

export default function AboutPublication() {
  return (
    <section className="w-full border-t bg-background text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
              About Our Publication: Analysing Financial Systems and International Relations
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                Founded in 2025 by Vedika Joshi and her team at Debt & Dominion. This Publication is an international publication dedicated to exploring the dynamic intersections of economics, geopolitics, and global governance. Born in a time of rising uncertainty and fractured institutions, the magazine was created to give emerging voices a seat at the table—where power is negotiated, and policy is made.
                </p>
                <p>
                We offer a new kind of analysis: one that doesn’t just report on global affairs, but interrogates the systems behind them. From sovereign debt to sanctions, development diplomacy to energy economics, each issue uncovers how financial tools shape political decisions—and vice versa.
                </p>
                <p>
                What sets Debt & Dominion apart is our unique editorial structure: we are powered entirely by students, yet guided by the same rigour expected in policy circles and professional journalism. Our contributors include aspiring economists, diplomats, and scholars from leading global institutions—united by a shared desire to challenge surface-level narratives and produce writing that matters.
                </p>
                <p>
                Published bimonthly, our magazine features deeply researched, visually bold, and thematically sharp content that aims to inform, provoke, and elevate. Whether it’s analysing central bank influence, dissecting global trade deals, or mapping the political consequences of inflation, we write to make sense of the systems that shape our world.
                </p>
                <p>
                We don’t just follow the headlines. We explain what makes them possible.
                </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <div className="relative aspect-[3/4] w-full max-w-md self-center overflow-hidden rounded-lg shadow-lg">
                <Image 
                    src="https://picsum.photos/seed/publication-books/600/800"
                    alt="Stack of economics books"
                    fill
                    className="object-cover"
                    data-ai-hint="books stack"
                />
            </div>
            <div>
                <h3 className="mb-4 text-xl font-bold">Each issue of Debt & Dominion delivers:</h3>
                <ul className="space-y-3">
                    {deliverables.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 text-muted-foreground">
                We are not another opinion blog. We are not just a student magazine. We are building a new kind of publication—one that reflects the intelligence, urgency, and complexity of our time.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
