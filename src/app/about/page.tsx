'use client';

import { Suspense } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import Newsletter from '@/components/newsletter';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Miss Vedika Joshi',
    role: 'Founder / Editor - in - Chief',
    bio: 'Vedika is a student of Economics and Finance at the University of Winchester and a Royal Navy Officer Cadet (URNU)...',
    imageUrl: 'https://picsum.photos/seed/vedika-joshi/150/150',
  },
];

function AboutContent() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-muted/20 py-16 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
              About Debt & Dominion
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Navigating the complex worlds of finance and power with clarity and insight.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                <strong>Debt & Dominion</strong> was founded on a simple yet powerful premise: to demystify
                the intricate connections between wealth, power, and influence that shape our world.
              </p>
              <p>
                Our coverage spans from the boardrooms of multinational corporations to the halls of
                government, from the dynamics of global markets to the surprising economics of sports and
                culture.
              </p>
              <p>
                Whether you're a seasoned investor, a policy enthusiast, a student of economics, or simply
                a curious citizen, Debt & Dominion is your essential guide to the forces that drive our
                society.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/20 py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                The dedicated professionals behind our analysis and reporting.
              </p>
            </div>
            <div className="mt-12 relative px-10">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {teamMembers.map((member) => (
                    <CarouselItem key={member.name} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <Card className="text-center h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-500/40">
                          <CardContent className="pt-8 pb-6 flex flex-col items-center">
                            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-muted">
                              <Image 
                                src={member.imageUrl} 
                                alt={member.name} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-foreground">{member.name}</h3>
                            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{member.role}</p>
                            <p className="mt-4 text-sm text-muted-foreground">{member.bio}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 bg-background hover:bg-muted text-foreground" />
                <CarouselNext className="right-0 bg-background hover:bg-muted text-foreground" />
              </Carousel>
            </div>
          </div>
        </section>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}