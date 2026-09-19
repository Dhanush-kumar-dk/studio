'use client';

import { Card, CardContent } from '@/components/ui/card';
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
    bio: 'Vedika is a student of Economics and Finance at the University of Winchester and a Royal Navy Officer Cadet (URNU). With a background spanning from an Oxford University summer programme to competitive table tennis, she brings an energetic, multi-faceted perspective to Debt & Dominion.',
    imageUrl: 'https://picsum.photos/seed/vedika-joshi/150/150',
  },
];

export default function AboutTeamCarousel() {
  return (
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
                        alt={`Portrait of ${member.name}, ${member.role} at Debt & Dominion`} 
                        fill 
                        sizes="96px"
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
  );
}
