import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Miss Vedika Joshi',
    role: 'Founder / Editor - in - Chief',
    bio: 'Vedika is a student of Economics and Finance at the University of Winchester and a Royal Navy Officer Cadet (URNU). She brings a rare combination of intellectual curiosity, leadership, and operational discipline to the publication. Her background spans university governance, policy engagement, and financial training, with experience across organisations such as the Royal Navy Leadership Institute and as a University Student Union Trustee. Vedika is also a Model UN chair with multilingual fluency and embodies the cross-sector insight Debt & Dominion was founded to represent.',
  },
  {
    name: 'Mr Victor Ohagwasi',
    role: 'Consultant',
    bio: "Victor is a Data Analyst and Brand/Product Designer currently embedded in the World Bank-supported L-PRES project in Lokoja, delivering strategic progress reports to World Bank management and state stakeholders. With advanced technical skills in Python, Excel, and Figma, plus a background in UX design and digital marketing, Victor ensures Debt & Dominion's operational workflows are both data-driven and user-centric, while bringing global development insights directly from one of the world's leading financial institutions.",
  },
  {
    name: 'Mr Joshua Pinto',
    role: 'Finance and Sponsorship Lead',
    bio: 'Joshua is a First-Class Economics & Finance graduate from Lancaster University, with hands-on experience in financial analysis and treasury operations. At Debt & Dominion, Joshua drives our sponsorship strategy and financial planning—creating robust funding proposals, structuring budgets, and ensuring our growth is underpinned by sound quantitative insight and strategic foresight.',
  },
  {
    name: 'Miss Emma Coffey',
    role: 'Visual and Graphics Lead',
    bio: "Emma is a BA (Hons) Graphic Design graduate from the University of Salford (Class of 2025), where she achieved a 2:1 and honed her expertise in branding, illustration, and digital/print design. Proficient in Adobe Illustrator, Photoshop, InDesign, and After Effects, Emma combines strategic thinking with creative flair. At Debt & Dominion, Emma drives our brand development and issue design—ensuring each edition is both visually compelling and strategically on-point.",
  },
];

export default function Team() {
    return (
        <section className="w-full border-t bg-muted/20 py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                The intellectual engine behind Debt & Dominion is powered by a diverse cohort of students, recent graduates, and early-career thinkers from leading universities around the world. While we may not bring decades of experience, we bring something different—unfiltered curiosity, fresh academic thinking, and a commitment to tackling complexity with clarity.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {teamMembers.map((member) => (
                <Card key={member.name} className="bg-card">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                    <p className="mt-1 font-semibold">{member.role}</p>
                    <p className="mt-4 text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="mx-auto max-w-4xl text-muted-foreground">
                At Debt & Dominion, our core editorial team is strengthened by a growing international network of contributors and collaborators—from students and researchers to aspiring analysts—based in leading academic institutions and global cities across the world.
              </p>
              <p className="mx-auto mt-4 max-w-4xl text-muted-foreground">
                Rather than relying on traditional bureaus, we draw insights from individuals embedded in the cultural, academic, and political environments of their regions. This decentralised model allows us to bring local context, emerging perspectives, and first-hand insights into global economic debates and international developments.
              </p>
            </div>
          </div>
        </section>
      );
}
