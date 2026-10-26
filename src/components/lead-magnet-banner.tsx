import Link from 'next/link';
import Image from 'next/image';
import { Download, CheckCircle2, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function LeadMagnetBanner() {
  const dossierFeatures = [
    'Sovereign Debt Restructuring & Default Risk Framework',
    'Multilateral Sanctions & Currency Swap Flow Tracker',
    'Central Bank Liquidity Stress & Inflation Modeling',
    'Energy Chokepoints & Supply Chain Geopolitics Map',
  ];

  return (
    <section id="dossier" className="w-full my-16 scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111c29] via-[#162536] to-[#1c3249] text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/15">
        
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-[#e95f3c]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          
          {/* Left Column: Visual Mockup of the Dossier */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-xl border border-white/20 bg-white/5 p-5 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#e95f3c]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Official Intelligence Dossier
                  </span>
                </div>
                <span className="rounded bg-[#e95f3c] px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
                  2026 Edition
                </span>
              </div>

              {/* Cover Preview */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#0e1620] border border-white/10 p-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-block rounded border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-orange-300">
                    DEBT &amp; DOMINION SPECIAL REPORT
                  </div>
                  <h3 className="font-headline text-lg sm:text-xl font-extrabold text-white leading-tight">
                    Sovereign Balance Sheets &amp; The Architecture of Global Hegemony
                  </h3>
                  <p className="text-xs text-slate-400">
                    A comprehensive 64-page intelligence briefing prepared for policy researchers and macro analysts.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>PDF Document (64 Pages)</span>
                  <span className="text-emerald-400 font-bold">Verified Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & CTAs */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Essential Research Suite</span>
            </div>

            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-white uppercase leading-tight">
              Essential Sovereign &amp; Macro Analyst's Dossier
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              Save time, eliminate blind spots, and anticipate macroeconomic upheavals by taking advantage of our official{' '}
              <strong className="text-white font-semibold">Sovereign &amp; Macro Analyst's Dossier</strong> pack. 
              Gain immediate access to battle-tested frameworks used by our editorial research desks.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {dossierFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-[#e95f3c] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none px-7 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#e95f3c] text-white hover:bg-[#ad3b1e] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Link href="/newsletter" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download Dossier - Instant Access</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-none px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/40 bg-transparent text-white hover:bg-white hover:text-[#162536]"
              >
                <Link href="/about" className="flex items-center gap-1.5">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
