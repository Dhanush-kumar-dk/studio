'use server';

/**
 * @fileOverview A flow to generate an email newsletter from recent articles.
 *
 * - generateNewsletter - A function that generates newsletter content.
 * - GenerateNewsletterInput - The input type for the generateNewsletter function.
 * - GenerateNewsletterOutput - The return type for the generateNewsletter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getArticles} from '@/app/actions';
import type { Article } from '@/lib/types';

const GenerateNewsletterInputSchema = z.object({
  numberOfArticles: z
    .number()
    .default(3)
    .describe('The number of recent articles to include in the newsletter.'),
});
export type GenerateNewsletterInput = z.infer<typeof GenerateNewsletterInputSchema>;

const GenerateNewsletterOutputSchema = z.object({
  newsletterHtml: z.string().describe('The HTML content of the newsletter.'),
});
export type GenerateNewsletterOutput = z.infer<typeof GenerateNewsletterOutputSchema>;

export async function generateNewsletter(
  input: GenerateNewsletterInput
): Promise<GenerateNewsletterOutput> {
  return generateNewsletterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewsletterPrompt',
  input: {
    schema: z.object({
      articles: z.array(
        z.object({
          title: z.string(),
          excerpt: z.string(),
          slug: z.string(),
        })
      ),
    }),
  },
  output: {schema: GenerateNewsletterOutputSchema},
  prompt: `
    You are an expert email marketer for a publication called "Debt & Dominion". Your task is to generate a compelling weekly newsletter in HTML format.

    Use the provided list of recent articles to create the newsletter.

    The newsletter should have:
    1.  A catchy, engaging subject line.
    2.  A brief, friendly introduction.
    3.  A section for each article with its title (as a link), and a short, enticing summary.
    4.  A concluding paragraph encouraging readers to visit the website.
    5.  The entire output must be a single HTML string, styled with inline CSS for maximum email client compatibility. Use a clean, modern, and professional design.

    Articles to include:
    {{#each articles}}
      - Title: {{{title}}}, Excerpt: {{{excerpt}}}, Slug: {{{slug}}}
    {{/each}}
  `,
  config: {
    model: 'googleai/gemini-2.5-flash',
  }
});

const generateNewsletterFlow = ai.defineFlow(
  {
    name: 'generateNewsletterFlow',
    inputSchema: GenerateNewsletterInputSchema,
    outputSchema: GenerateNewsletterOutputSchema,
  },
  async input => {
    const allArticles = await getArticles();
    const recentArticles = allArticles
      .slice(0, input.numberOfArticles)
      .map((article: Article) => ({
        title: article.title,
        excerpt: article.excerpt,
        slug: `/articles/${article.slug}`,
      }));

    const {output} = await prompt({
      articles: recentArticles,
    });
    return output!;
  }
);
