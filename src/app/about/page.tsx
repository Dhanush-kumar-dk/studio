

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Newsletter from '@/components/newsletter';

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & Editor-in-Chief',
    bio: 'Jane has over 15 years of experience in financial journalism, with a passion for uncovering the stories behind the numbers.',
    imageUrl: 'https://picsum.photos/seed/jane-doe/150/150',
  },
  {
    name: 'John Smith',
    role: 'Lead Political Analyst',
    bio: 'John brings a sharp eye for political strategy and policy, connecting the dots between Washington and Wall Street.',
    imageUrl: 'https://picsum.photos/seed/john-smith/150/150',
  },
  {
    name: 'Emily White',
    role: 'Sports & Finance Correspondent',
    bio: 'Emily explores the surprising and often complex financial world of professional sports.',
    imageUrl: 'https://picsum.photos/seed/emily-white/150/150',
  },
];

export default function AboutPage() {
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
                <strong>Debt & Dominion</strong> was founded on a simple yet powerful premise: to demystify the intricate connections between wealth, power, and influence that shape our world. In an age of information overload, we strive to provide our readers with sharp, incisive analysis that cuts through the noise.
              </p>
              <p>
                Our coverage spans from the boardrooms of multinational corporations to the halls of government, from the dynamics of global markets to the surprising economics of sports and culture. We believe that understanding the flow of money is key to understanding the modern world.
              </p>
              <p>
                Whether you're a seasoned investor, a policy enthusiast, a student of economics, or simply a curious citizen, Debt & Dominion is your essential guide to the forces that drive our society.
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
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member) => (
                        <Card key={member.name} className="text-center">
                            <CardContent className="pt-6">
                                <Avatar className="mx-auto h-24 w-24">
                                    <AvatarImage src={member.imageUrl} alt={member.name} />
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
                                <p className="text-sm font-semibold text-primary">{member.role}</p>
                                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
