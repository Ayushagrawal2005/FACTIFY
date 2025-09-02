import { config } from 'dotenv';
config();

import '@/ai/flows/gather-evidence-for-claim.ts';
import '@/ai/flows/generate-fact-check-verdict.ts';
import '@/ai/flows/extract-claims-from-input.ts';
import '@/ai/flows/generate-audio-from-text.ts';
import '@/ai/flows/generate-infographic-html.ts';
import '@/ai/flows/generate-infographic-from-html.ts';
