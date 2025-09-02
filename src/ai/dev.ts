import { config } from 'dotenv';
config();

import '@/ai/flows/gather-evidence-for-claim.ts';
import '@/ai/flows/generate-fact-check-verdict.ts';
import '@/ai/flows/extract-claims-from-input.ts';
