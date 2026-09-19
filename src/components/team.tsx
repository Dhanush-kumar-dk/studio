import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const teamMembers = [
  {
    name: 'Miss Vedika Joshi',
    role: 'Founder / Editor - in - Chief',
    bio: 'Vedika is a student of Economics and Finance at the University of Winchester and a Royal Navy Officer Cadet (URNU). She brings a rare combination of intellectual curiosity, leadership, and operational discipline to the publication. Her background spans university governance, policy engagement, and financial training, with experience across organisations such as the Royal Navy Leadership Institute and as a University Student Union Trustee. Vedika is also a Model UN chair with multilingual fluency and embodies the cross-sector insight Debt & Dominion was founded to represent.',
  },
];

export default function Team() {
  return (
    <section id="team" className="w-full border-t border-border/60 bg-muted/20 py-20 transition-colors duration-200 scroll-mt-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300">
            <Users className="h-3.5 w-3.5" />
            <span>Leadership & Editorial</span>
          </div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Meet Our Leadership Team
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The intellectual engine behind Debt & Dominion is powered by a diverse cohort of researchers, graduates, and analysts across global institutions.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member.name} className="flex flex-col justify-between border border-border/60 bg-card p-6 sm:p-8 rounded-xl shadow-sm transition-all hover:border-orange-500/40">
              <CardContent className="p-0 space-y-3">
                <div>
                  <h3 className="font-headline text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-0.5">{member.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border/60 bg-card p-6 sm:p-8 text-center space-y-3">
          <p className="mx-auto max-w-4xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
            At Debt & Dominion, our core editorial team is strengthened by a growing international network of contributors based in leading academic institutions across the world.
          </p>
          <p className="mx-auto max-w-4xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Rather than relying on traditional bureaus, we draw insights from individuals embedded directly in the cultural and economic environments of their regions.
          </p>
        </div>
      </div>
    </section>
  );
}
