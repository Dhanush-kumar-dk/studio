
'use server';

/**
 * @fileOverview A flow to subscribe a user to the newsletter using Google Sheets.
 */

import { ai } from '@/ai/genkit';
import { google } from 'googleapis';
import { z } from 'zod';

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  // In a production environment, you might want to throw an error here.
  // For now, we'll log a warning to avoid crashing the server during development
  // if the key is not immediately available.
  console.warn('FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set.');
}

if (!process.env.GOOGLE_SHEET_ID) {
  console.warn('GOOGLE_SHEET_ID environment variable not set.');
}

const SubscribeToNewsletterInputSchema = z.object({
  email: z.string().email().describe('The email address to subscribe.'),
});
export type SubscribeToNewsletterInput = z.infer<typeof SubscribeToNewsletterInputSchema>;

const SubscribeToNewsletterOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SubscribeToNewsletterOutput = z.infer<typeof SubscribeToNewsletterOutputSchema>;

export async function subscribeToNewsletter(
  input: SubscribeToNewsletterInput
): Promise<SubscribeToNewsletterOutput> {
  return subscribeToNewsletterFlow(input);
}

const subscribeToNewsletterFlow = ai.defineFlow(
  {
    name: 'subscribeToNewsletterFlow',
    inputSchema: SubscribeToNewsletterInputSchema,
    outputSchema: SubscribeToNewsletterOutputSchema,
  },
  async ({ email }) => {
    // Gracefully handle missing env vars
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY || !process.env.GOOGLE_SHEET_ID) {
        const errorMessage = "Newsletter service is not configured. Please contact support.";
        console.error(errorMessage);
        return { success: false, message: errorMessage };
    }
      
    try {
      const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      const serviceAccount = JSON.parse(serviceAccountString);

      if (serviceAccount.private_key) {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }

      const auth = new google.auth.JWT(
        serviceAccount.client_email,
        undefined,
        serviceAccount.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      const sheets = google.sheets({ version: 'v4', auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'A1', // Assumes you want to append to the first sheet
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[email, new Date().toISOString()]],
        },
      });
      return { success: true, message: 'Successfully subscribed!' };
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      let userMessage = 'Subscription failed. Please try again.';
      if (error.message.includes('PEM') || error.message.includes('credential')) {
          userMessage = 'Could not access the newsletter service due to a configuration error.';
      }
      return { success: false, message: userMessage };
    }
  }
);
