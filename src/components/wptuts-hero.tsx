import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

export default function WptutsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#111c29] via-[#162536] to-[#1c3046] text-white py-12 sm:py-20 lg:py-24 border-b border-white/10">
      {/* Background Decorative Pattern */}
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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: WPTuts Exact Headline, Subtitle & Dual Buttons */}
          <div className="space-y-6 lg:col-span-7 text-center lg:text-left">
            <h1 className="font-headline text-4xl sm:text-6xl lg:text-[70px] font-black uppercase tracking-tight leading-[1.0] text-white">
              UNLOCK YOUR<br />
              <span className="text-[#e95f3c]">WORDPRESS</span><br />
              POTENTIAL
            </h1>

            <h3 className="font-headline text-lg sm:text-2xl font-medium text-white/95 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <span className="bg-white/10 px-3 py-1 rounded border border-white/15 inline-block">
                Helping you build powerful dynamic websites without ANY coding!
              </span>
            </h3>

            {/* WPTuts Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-3">
              <Button
                asChild
                size="lg"
                className="h-12 w-full sm:w-auto rounded-none px-8 font-button text-sm sm:text-base font-bold uppercase tracking-wider bg-[#df5c0c] text-white hover:bg-[#ad3b1e] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Link href="#tutorials" className="flex items-center justify-center gap-2">
                  <span>Start Here</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full sm:w-auto rounded-none px-8 font-button text-sm sm:text-base font-bold uppercase tracking-wider border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#162536] transition-all"
              >
                <Link href="#newsletter" className="flex items-center justify-center">
                  Subscribe Now
                </Link>
              </Button>
            </div>

            {/* WPTuts Highlight Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-center sm:text-left">
              <div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-[#e95f3c]">700+</div>
                <div className="text-xs text-slate-300 font-medium">Free Tutorials</div>
              </div>
              <div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-300 font-medium">Free Tools</div>
              </div>
              <div>
                <div className="font-headline text-2xl sm:text-3xl font-extrabold text-emerald-400">150K+</div>
                <div className="text-xs text-slate-300 font-medium">Community</div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact WPTuts Paul Cutout Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] flex items-end justify-center">
              
              {/* Soft glow behind Paul */}
              <div className="absolute inset-0 rounded-full bg-[#df5c0c]/15 blur-2xl pointer-events-none" />

              {/* Exact cutout from wptuts.co.uk */}
              <div className="relative z-10 w-full h-[400px] sm:h-[480px]">
                <Image
                  src="/paul-c.png"
                  alt="Paul from WPTuts - WordPress Tutorials"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain object-bottom drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Badge (WPTuts) */}
              <div className="absolute bottom-4 left-0 sm:-left-4 z-20 rounded-lg border border-white/15 bg-[#162536]/90 p-3 backdrop-blur-md shadow-xl text-left">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">700+ Free Tutorials</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Elementor, ACF, Crocoblock &amp; Bricks
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
