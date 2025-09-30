
'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/personalized-recommendations.ts';
import '@/ai/flows/article-summarization.ts';
import '@/ai/flows/generate-newsletter-flow.ts';
