
'use server';
/**
 * @fileOverview A flow to handle newsletter subscriptions and add emails to a Google Sheet.
 *
 * - subscribeToNewsletter - A function that adds an email to the newsletter Google Sheet.
 * - SubscribeToNewsletterInput - The input type for the subscribeToNewsletter function.
 * - SubscribeToNewsletterOutput - The return type for the subscribeToNewsletter function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { google } from 'googleapis';

const SPREADSHEET_ID = '1Q34RzCmAOc8KqiqFys4HU3FutSP0r0fZ2nYEBHLJNGM';
const SHEET_NAME = 'Sheet1';

const SubscribeToNewsletterInputSchema = z.object({
  email: z.string().email().describe('The email address to subscribe.'),
});
export type SubscribeToNewsletterInput = z.infer<typeof SubscribeToNewsletterInputSchema>;

const SubscribeToNewsletterOutputSchema = z.object({
  status: z.string().describe('The status of the subscription (e.g., "subscribed" or "failed").'),
});
export type SubscribeToNewsletterOutput = z.infer<typeof SubscribeToNewsletterOutputSchema>;

async function getGoogleSheetsClient() {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set.');
    }
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    // Ensure private_key format is correct
    if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    const jwtClient = new google.auth.JWT(
        serviceAccount.client_email,
        undefined,
        serviceAccount.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    await jwtClient.authorize();
    return google.sheets({ version: 'v4', auth: jwtClient });
}

async function appendToSheet(email: string): Promise<boolean> {
    try {
        const sheets = await getGoogleSheetsClient();
        const timestamp = new Date().toISOString();
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:B`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[email, timestamp]],
            },
        });
        return true;
    } catch (error) {
        console.error('Error appending to sheet:', error);
        return false;
    }
}

const subscribeToNewsletterFlow = ai.defineFlow(
  {
    name: 'subscribeToNewsletterFlow',
    inputSchema: SubscribeToNewsletterInputSchema,
    outputSchema: SubscribeToNewsletterOutputSchema,
  },
  async (input) => {
    const success = await appendToSheet(input.email);
    return {
        status: success ? 'subscribed' : 'failed',
    };
  }
);

export async function subscribeToNewsletter(input: SubscribeToNewsletterInput): Promise<SubscribeToNewsletterOutput> {
    return subscribeToNewsletterFlow(input);
}
