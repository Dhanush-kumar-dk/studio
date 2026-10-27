import Link from 'next/link';
import { Mail, Shield, Cpu, Globe, ArrowRight, BookOpen } from 'lucide-react';
import { ProductsJsonLd } from './schema-org';

const products = [
  {
    title: 'Weekly Intelligence Briefing',
    category: 'Newsletter Digest',
    badge: 'Weekly Edition',
    description:
      'A curated Monday synthesis delivering actionable intelligence on sovereign debt restructuring, central bank rate cycles, sanction developments, and macroeconomic indicators.',
    href: '/newsletter',
    cta: 'Subscribe Free',
    icon: Mail,
    color: 'emerald',
  },
  {
    title: 'Sovereign Debt & Geopolitics Dossiers',
    category: 'Long-Form Dispatches',
    badge: 'In-Depth Research',
    description:
      'Original investigations examining how international credit arrangements, IMF bailouts, and debt-for-nature swaps dictate sovereignty and political outcomes in emerging markets.',
    href: '/?category=Politics',
    cta: 'Explore Geopolitics',
    icon: Shield,
    color: 'orange',
  },
  {
    title: 'AI & Tech Sovereign Power Monitor',
    category: 'Strategic Technology',
    badge: 'Policy & Compute',
    description:
      'Rigorous coverage of global artificial intelligence governance, semiconductor supply chain security, export restrictions, and the race for sovereign compute infrastructure.',
    href: '/?category=Technology',
    cta: 'Read Tech & AI',
    icon: Cpu,
    color: 'amber',
  },
  {
    title: 'World Affairs & Emerging Markets',
    category: 'Regional Analysis',
    badge: 'Global Dispatches',
    description:
      'Ground-level reporting and macroeconomic assessments from our international network of student and early-career analysts across Europe, Asia, and the Americas.',
    href: '/?category=World',
    cta: 'View World Affairs',
    icon: Globe,
    color: 'blue',
  },
];

export default function EditorialProducts() {
  return (
    <section id="products" className="w-full border-t border-border/60 bg-muted/20 py-20 transition-colors duration-200 scroll-mt-16">
      <ProductsJsonLd />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Research Products & Intelligence Offerings</span>
          </div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Strategic Intelligence for Modern Decision-Makers
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            From weekly macroeconomic digests to specialized geopolitical research dossiers, explore Debt & Dominion’s flagship publications and analytical products.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {prod.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      {prod.category}
                    </span>
                    <h3 className="mt-1 font-headline text-lg font-bold text-foreground leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {prod.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {prod.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <Link
                    href={prod.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all"
                  >
                    <span>{prod.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
