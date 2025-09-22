'use server';

/**
 * @fileOverview An AI agent that provides personalized article recommendations based on user reading history and preferences.
 *
 * - getPersonalizedRecommendations - A function that generates personalized article recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  readingHistory: z
    .string()
    .describe('The user reading history, including article titles and categories.'),
  preferences: z.string().describe('The user preferences, such as favorite topics and authors.'),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of article recommendations to generate.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of personalized article recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized article recommendations based on user reading history and preferences.

  Based on the user's reading history and preferences, generate {{numberOfRecommendations}} article recommendations that the user might be interested in.

  Reading History: {{{readingHistory}}}
  Preferences: {{{preferences}}}

  Recommendations should be article titles.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
