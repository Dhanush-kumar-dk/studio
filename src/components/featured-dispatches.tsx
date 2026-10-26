import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface FeaturedDispatchesProps {
  articles?: any[];
}

export default function FeaturedDispatches({ articles }: FeaturedDispatchesProps = {}) {
  const featuredTutorials = [
    {
      title: 'How To Build A WooCommerce Website From Scratch With Free Tools',
      category: 'WooCommerce Tutorials',
      imageUrl: '/tut-woocommerce.jpg',
      excerpt: 'Learn how to create a complete eCommerce store with WordPress and WooCommerce without spending a penny on premium plugins or themes.',
      href: '#tutorials',
    },
    {
      title: 'How To | WordPress Blog Website Tutorial',
      category: 'WordPress Tutorials',
      imageUrl: '/tut-blog.jpg',
      excerpt: 'A complete step-by-step WordPress blog website tutorial perfect for beginners using all free tools and modern dynamic blocks.',
      href: '#tutorials',
    },
  ];

  return (
    <section id="featured-tutorials" className="my-16 scroll-mt-24">
      {/* WPTuts Style Center Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#df5c0c]">
          <Star className="h-3.5 w-3.5 fill-[#df5c0c]" />
          <span>Must Watch</span>
        </div>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-[#152333] dark:text-white">
          Featured Tutorials
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Step-by-step masterclasses to build powerful dynamic WordPress websites from scratch.
        </p>
      </div>

      {/* 2-Column Side-by-Side Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredTutorials.map((tut, idx) => (
          <Link
            key={idx}
            href={tut.href}
            className="group block h-full"
          >
            <Card className="overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#df5c0c]/40 dark:border-white/10 flex flex-col h-full">
              {/* Large 16:9 Thumbnail from wptuts.co.uk */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={tut.imageUrl}
                  alt={tut.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4">
                  <span className="rounded bg-[#df5c0c] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    {tut.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#152333] group-hover:text-[#df5c0c] dark:text-white dark:group-hover:text-[#df5c0c] transition-colors leading-snug line-clamp-2">
                    {tut.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tut.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-bold text-[#df5c0c]">
                  <span className="uppercase tracking-wider">Watch Tutorial</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
