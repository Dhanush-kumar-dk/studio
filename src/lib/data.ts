import type { Article } from './types';

export const articles: Article[] = [
  {
    id: '1',
    slug: 'the-future-of-ai-in-tech',
    title: 'The Future of AI: What to Expect in the Next Decade',
    category: 'Technology',
    imageUrl: 'https://picsum.photos/seed/tech-future/1200/800',
    imageHint: 'futuristic city',
    excerpt:
      'Artificial intelligence is evolving at an unprecedented rate. Experts predict a future where AI is integrated into every aspect of our lives, from healthcare to transportation.',
    content: `
      <p>Artificial intelligence is no longer a concept confined to science fiction. It's a rapidly advancing field that is reshaping industries and our daily lives. Over the next decade, we can expect AI to become even more sophisticated and ubiquitous.</p><br />
      <p>In healthcare, AI algorithms are already helping doctors diagnose diseases with greater accuracy. This trend will continue, with AI-powered tools assisting in personalized treatment plans and drug discovery. In transportation, autonomous vehicles are on the horizon, promising to make our roads safer and our commutes more efficient.</p><br />
      <p>However, the rise of AI also brings challenges. Questions about job displacement, ethical considerations, and data privacy need to be addressed. As we move forward, it's crucial to have a public dialogue about the kind of future we want to build with AI.</p>
    `,
    author: 'Jane Doe',
    authorSlug: 'jane-doe',
    authorImageUrl: 'https://picsum.photos/seed/jane-doe/40/40',
    publishedAt: '2024-05-20',
    focusKeywords: ['AI', 'Technology', 'Future'],
    metaDescription: 'Explore the future of artificial intelligence and its impact on various sectors over the next decade. What can we expect from AI advancements?',
  },
  {
    id: '2',
    slug: 'global-summit-on-climate-change',
    title: 'World Leaders Gather for Global Summit on Climate Change',
    category: 'Politics',
    imageUrl: 'https://picsum.photos/seed/politics-building/600/400',
    imageHint: 'government building',
    excerpt:
      'Leaders from around the world are meeting this week to discuss a new international treaty on climate change. The stakes are high as the planet faces an environmental crisis.',
    content: `
      <p>The global summit, held in Geneva, aims to create a binding agreement to reduce carbon emissions and limit global warming. Scientists have warned that without immediate and drastic action, the world could face catastrophic consequences, including rising sea levels, extreme weather events, and food shortages.</p><br />
      <p>Negotiations are expected to be tense, with developed and developing nations often at odds over who should bear the costs of transitioning to a green economy. "We are at a pivotal moment in human history," said a lead negotiator. "The decisions we make this week will affect generations to come."</p>
    `,
    author: 'John Smith',
    authorSlug: 'john-smith',
    authorImageUrl: 'https://picsum.photos/seed/john-smith/40/40',
    publishedAt: '2024-05-19',
    focusKeywords: ['Climate Change', 'Global Summit', 'Politics'],
    metaDescription: 'World leaders convene for a crucial summit on climate change to negotiate a new international treaty. The future of our planet hangs in the balance.',
  },
  {
    id: '3',
    slug: 'underdogs-win-championship',
    title: 'Underdogs Clinch Championship in a Stunning Upset',
    category: 'Sports',
    imageUrl: 'https://picsum.photos/seed/sports-soccer/600/400',
    imageHint: 'soccer player',
    excerpt:
      'In a final that will be remembered for years to come, the Leicester Foxes defeated the Manchester Giants to win the national championship for the first time in their history.',
    content: `
      <p>It was a classic David vs. Goliath story. The Manchester Giants, a team with a budget ten times that of their rivals, were the clear favorites. But the Leicester Foxes played with heart and determination, scoring the winning goal in the final minutes of the match.</p><br />
      <p>The stadium erupted as the final whistle blew, and the small town of Leicester celebrated a victory that seemed impossible. "We believed in ourselves," said the team captain. "This is for all the fans who have supported us through thick and thin."</p>
    `,
    author: 'Emily White',
    authorSlug: 'emily-white',
    authorImageUrl: 'https://picsum.photos/seed/emily-white/40/40',
    publishedAt: '2024-05-18',
    focusKeywords: ['Championship', 'Upset', 'Sports'],
    metaDescription: 'The Leicester Foxes achieve a historic victory against the Manchester Giants, winning the national championship in a stunning upset.',
  },
  {
    id: '4',
    slug: 'new-discoveries-on-mars',
    title: 'NASA Rover Makes New Discoveries on the Surface of Mars',
    category: 'World',
    imageUrl: 'https://picsum.photos/seed/world-news/600/400',
    imageHint: 'world map',
    excerpt:
      'The Perseverance rover has found evidence of ancient organic molecules on Mars, a tantalizing clue in the search for extraterrestrial life.',
    content: `
      <p>Scientists at NASA are buzzing with excitement after the Perseverance rover analyzed rock samples from an ancient river delta on Mars. The samples contain complex organic molecules, which are the building blocks of life as we know it.</p><br />
      <p>While this is not definitive proof of past life on Mars, it is the strongest evidence yet. "It's a major milestone in our exploration of the Red Planet," said Dr. Anya Sharma, lead scientist on the mission. "We are getting closer to answering the age-old question: are we alone in the universe?"</p>
    `,
    author: 'David Chen',
    authorSlug: 'david-chen',
    authorImageUrl: 'https://picsum.photos/seed/david-chen/40/40',
    publishedAt: '2024-05-17',
    focusKeywords: ['Mars', 'NASA', 'Space'],
    metaDescription: 'NASA\'s Perseverance rover discovers ancient organic molecules on Mars, a significant step forward in the search for extraterrestrial life.',
  },
  {
    id: '5',
    slug: 'quantum-computing-breakthrough',
    title: 'Researchers Announce Major Breakthrough in Quantum Computing',
    category: 'Technology',
    imageUrl: 'https://picsum.photos/seed/tech-code/600/400',
    imageHint: 'coding laptop',
    excerpt:
      'A new quantum chip has been developed that is significantly more stable and less prone to errors than previous designs, paving the way for practical quantum computers.',
    content: `
      <p>Quantum computers have the potential to solve problems that are currently intractable for even the most powerful supercomputers. However, building a stable quantum computer has been a major challenge. The delicate quantum states, or qubits, are easily disturbed by their environment.</p><br />
      <p>Now, a team of researchers has designed a new type of qubit that is much more robust. This breakthrough could accelerate the development of quantum computers and unlock their potential in fields like medicine, materials science, and artificial intelligence.</p>
    `,
    author: 'Maria Garcia',
    authorSlug: 'maria-garcia',
    authorImageUrl: 'https://picsum.photos/seed/maria-garcia/40/40',
    publishedAt: '2024-05-16',
    focusKeywords: ['Quantum Computing', 'Technology', 'Science'],
    metaDescription: 'A major breakthrough in quantum computing promises more stable and error-free quantum chips, accelerating the path to practical quantum computers.',
  },
  {
    id: '6',
    slug: 'election-results-analysis',
    title: 'Analysis of the Recent Election Results and What They Mean',
    category: 'Politics',
    imageUrl: 'https://picsum.photos/seed/politics-debate/600/400',
    imageHint: 'political debate',
    excerpt:
      'With the final votes counted, political analysts are dissecting the results of the midterm elections. The outcome suggests a significant shift in the political landscape.',
    content: `
      <p>The midterm elections have resulted in a divided government, with one party controlling the House and the other controlling the Senate. This sets the stage for a period of political gridlock, but also potential for bipartisan cooperation.</p><br />
      <p>Key issues that dominated the election included the economy, healthcare, and immigration. The results indicate that voters are looking for pragmatic solutions and are tired of partisan bickering. The next two years will be a test of whether politicians can work together to address the country's pressing challenges.</p>
    `,
    author: 'Michael Brown',
    authorSlug: 'michael-brown',
    authorImageUrl: 'https://picsum.photos/seed/michael-brown/40/40',
    publishedAt: '2024-05-15',
    focusKeywords: ['Elections', 'Politics', 'Government'],
    metaDescription: 'An in-depth analysis of the recent midterm election results and their implications for the future political landscape.',
  },
  {
    id: '7',
    slug: 'record-breaking-olympic-performance',
    title: 'Athlete Shatters World Record in a Record-Breaking Olympic Performance',
    category: 'Sports',
    imageUrl: 'https://picsum.photos/seed/sports-basketball/600/400',
    imageHint: 'basketball dunk',
    excerpt:
      'The 100m sprint final was one for the ages, with a new world record set by a rising star. The athlete crossed the finish line in an astonishing 9.50 seconds.',
    content: `
      <p>All eyes were on the 100m final at the Olympic Games, and it did not disappoint. In a flash of speed, 21-year-old Leo Carter left his competitors in the dust, setting a new world record and becoming an instant legend.</p><br />
      <p>Carter's performance was the culmination of years of hard work and dedication. "I've dreamed of this moment since I was a kid," he said, draped in his country's flag. "I hope this inspires others to chase their dreams, no matter how big."</p>
    `,
    author: 'Sarah Lee',
    authorSlug: 'sarah-lee',
    authorImageUrl: 'https://picsum.photos/seed/sarah-lee/40/40',
    publishedAt: '2024-05-14',
    focusKeywords: ['Olympics', 'World Record', 'Sports'],
    metaDescription: 'A rising star athlete shatters the 100m sprint world record at the Olympic Games with a breathtaking performance.',
  },
  {
    id: '8',
    slug: 'global-economic-outlook-2024',
    title: 'The Global Economic Outlook for the Second Half of 2024',
    category: 'World',
    imageUrl: 'https://picsum.photos/seed/global-data/600/400',
    imageHint: 'global network',
    excerpt:
      'Economists are cautiously optimistic about the global economy, but risks remain. Inflation, geopolitical tensions, and supply chain disruptions could derail the recovery.',
    content: `
      <p>The world economy has shown resilience in the face of multiple shocks, but the path ahead is uncertain. The International Monetary Fund (IMF) projects modest growth for the second half of 2024, but warns of significant downside risks.</p><br />
      <p>Central banks face a difficult balancing act: taming inflation without triggering a recession. Geopolitical conflicts continue to disrupt energy and food markets, while the transition to a post-pandemic world is still fraught with challenges. "We are not out of the woods yet," said the IMF's chief economist.</p>
    `,
    author: 'Thomas Wilson',
    authorSlug: 'thomas-wilson',
    authorImageUrl: 'https://picsum.photos/seed/thomas-wilson/40/40',
    publishedAt: '2024-05-13',
    focusKeywords: ['Economy', 'Global Outlook', 'Finance'],
    metaDescription: 'The global economic outlook for the second half of 2024 shows cautious optimism, but significant risks from inflation and geopolitics remain.',
  },
  {
    id: '9',
    slug: 'the-rise-of-sustainable-tech',
    title: 'The Rise of Sustainable Tech: Innovations for a Greener Planet',
    category: 'Technology',
    imageUrl: 'https://picsum.photos/seed/tech-chip/600/400',
    imageHint: 'microchip circuit',
    excerpt:
      'From biodegradable electronics to carbon capture technologies, a new wave of innovation is focused on solving environmental problems. Can technology save the planet?',
    content: `
      <p>The tech industry is increasingly turning its attention to sustainability. Startups and established companies alike are developing technologies aimed at reducing waste, conserving resources, and combating climate change. This "green tech" revolution is gaining momentum, driven by consumer demand and a growing sense of urgency.</p><br />
      <p>Innovations include bioplastics made from algae, smart grids that optimize energy consumption, and direct air capture systems that remove CO2 from the atmosphere. While technology alone cannot solve the climate crisis, it is an essential part of the solution.</p>
    `,
    author: 'Isabella Rossi',
    authorSlug: 'isabella-rossi',
    authorImageUrl: 'https://picsum.photos/seed/isabella-rossi/40/40',
    publishedAt: '2024-05-12',
    focusKeywords: ['Sustainable Tech', 'Green Tech', 'Innovation'],
    metaDescription: 'Discover the latest innovations in sustainable technology, from biodegradable electronics to carbon capture, and their potential to create a greener planet.',
  },
  {
    id: '10',
    slug: 'new-legislation-on-data-privacy',
    title: 'Government Passes New Legislation on Data Privacy and Security',
    category: 'Politics',
    imageUrl: 'https://picsum.photos/seed/politics-vote/600/400',
    imageHint: 'voting booth',
    excerpt:
      'In a landmark decision, a comprehensive data privacy law has been enacted, giving consumers more control over their personal information.',
    content: `
      <p>The new law, which has been compared to Europe's GDPR, requires companies to be transparent about the data they collect and how they use it. Consumers will have the right to access, correct, and delete their data. The legislation also imposes strict security requirements to protect against data breaches.</p><br />
      <p>Privacy advocates have hailed the law as a major victory for consumers. "For too long, our personal data has been exploited without our consent," said a leading advocate. "This law puts power back in the hands of individuals."</p>
    `,
    author: 'Ben Carter',
    authorSlug: 'ben-carter',
    authorImageUrl: 'https://picsum.photos/seed/ben-carter/40/40',
    publishedAt: '2024-05-11',
    focusKeywords: ['Data Privacy', 'Legislation', 'Security'],
    metaDescription: 'A new comprehensive data privacy law gives consumers more control over their personal information, marking a major victory for privacy advocates.',
  },
];
