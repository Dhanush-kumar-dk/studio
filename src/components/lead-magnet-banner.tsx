import Link from 'next/link';
import Image from 'next/image';
import { Download, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function LeadMagnetBanner() {
  const documents = [
    'Client Questionnaire & Discovery Workbook',
    'Website Design Proposal & Contract Template',
    'Client Onboarding Email & Briefing Templates',
    'Project Handover & Monthly Maintenance Agreement',
  ];

  return (
    <section id="documents" className="w-full my-16 scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111c29] via-[#162536] to-[#1d3247] text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/15">
        
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-[#df5c0c]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          
          {/* Left Column: Visual Mockup from wptuts.co.uk */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black/30">
              <Image
                src="/ewdd.webp"
                alt="Essential Web Designer's Documents Pack Preview"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Exact WPTuts Copy & CTAs */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-block rounded bg-[#df5c0c] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Essential Pack
            </div>

            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Essential Web Designer's Documents
            </h2>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-200">
              <p>
                Save time, effort and money on running your web design business by taking advantage of the{' '}
                <strong className="text-white font-semibold">Essential Web Designer’s Documents</strong> pack.
              </p>
              <p className="text-slate-300">
                Including all the core documents you need to secure new business, like a proposal template, client questionnaire, onboarding email and more.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {documents.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-[#df5c0c] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none px-7 font-button text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#df5c0c] text-white hover:bg-[#ad3b1e] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Link href="#newsletter" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Buy Now - Immediate Download</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-none px-6 font-button text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/40 bg-transparent text-white hover:bg-white hover:text-[#162536]"
              >
                <Link href="#tutorials" className="flex items-center gap-1.5">
                  <span>Learn More...</span>
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
