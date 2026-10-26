"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, TrendingUp, Globe2, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

export default function WptutsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#111c29] via-[#162536] to-[#1d3247] text-white py-16 sm:py-20 lg:py-24 border-b border-white/10">
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />
      {/* Subtle Warm Glow in Top Corner */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#e95f3c]/20 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: WPTuts-Style High-Impact Headline & Dual CTAs */}
          <div className="space-y-6 lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-300 backdrop-blur-sm">
              <Globe2 className="h-3.5 w-3.5" />
              <span>International Economics &amp; Geopolitics</span>
            </div>

            <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl uppercase leading-[1.08]">
              UNLOCK GLOBAL <br />
              <span className="text-[#e95f3c]">SOVEREIGN &amp; POWER</span> <br />
              INTELLIGENCE
            </h1>

            <p className="mx-auto lg:mx-0 max-w-2xl text-lg sm:text-xl font-medium text-slate-200 leading-relaxed">
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/15">
                Helping you navigate global debt, macro capital, and geopolitical dominance without noise!
              </span>
            </p>

            {/* Dual CTA Buttons (Start Here + Subscribe Now) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none px-8 text-base font-bold uppercase tracking-wide bg-[#e95f3c] text-white hover:bg-[#ad3b1e] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Link href="#dispatches" className="flex items-center gap-2">
                  <span>Start Here</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-none px-8 text-base font-bold uppercase tracking-wide border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#162536] transition-all"
              >
                <Link href="#newsletter">
                  Subscribe Now
                </Link>
              </Button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl font-extrabold text-[#e95f3c]">700+</div>
                <div className="text-xs text-slate-400 font-medium">Dispatches &amp; Notes</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-400 font-medium">Free Access</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">54+</div>
                <div className="text-xs text-slate-400 font-medium">Global Markets</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Persona & Floating Analytical Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Card Container with subtle gradient border */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-md shadow-2xl">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-[#e95f3c]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Editorial Lead</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Active Dispatch
                  </span>
                </div>

                {/* Hero Feature Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl my-4 bg-slate-900 border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80"
                    alt="Financial markets and global macroeconomic monitors"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111c29] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#e95f3c] bg-black/60 px-2 py-0.5 rounded">
                      Featured Dossier
                    </span>
                    <h2 className="font-headline text-base font-bold text-white mt-1 leading-snug">
                      Sovereign Debt &amp; Geopolitical Dominance in 2026
                    </h2>
                  </div>
                </div>

                {/* Editorial Snapshot */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#e95f3c] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Rigorous Academic Research</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Unvarnished analysis powered by economists and policy researchers across leading universities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Macro Market Intelligence</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Cross-border capital flows, sanctions mechanics, and sovereign balance sheet stress tests.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge (WPTuts style) */}
                <div className="mt-5 rounded-xl border border-white/15 bg-white/10 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <BookOpen className="h-4 w-4 text-[#e95f3c]" />
                    <span>Free Weekly Dossier Pack</span>
                  </div>
                  <Link
                    href="#dossier"
                    className="text-xs font-bold text-[#e95f3c] hover:underline"
                  >
                    View Pack &rarr;
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
