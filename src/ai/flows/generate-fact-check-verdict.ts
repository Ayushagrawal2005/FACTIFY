'use server';
/***
 * @fileOverview This file defines a Genkit flow for generating a fact-check verdict based on API results and gathered evidence.
 *
 * - generateFactCheckVerdict - A function that generates a fact-check verdict.
 * - GenerateFactCheckVerdictInput - The input type for the generateFactCheckVerdict function.
 * - GenerateFactCheckVerdictOutput - The return type for the generateFactCheckVerdict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFactCheckVerdictInputSchema = z.object({
  apiResults: z.string().describe('The results from fact-checking APIs.'),
  evidence: z.string().describe('Supporting and counter evidence for the claim.'),
});
export type GenerateFactCheckVerdictInput = z.infer<
  typeof GenerateFactCheckVerdictInputSchema
>;

const GenerateFactCheckVerdictOutputSchema = z.object({
  verdict: z.string().describe('The fact-check verdict (e.g., True, False, Mixed).'),
  confidenceLevel: z.string().describe('The confidence level of the verdict.'),
  reason: z.string().describe('The reasoning behind the verdict.'),
});
export type GenerateFactCheckVerdictOutput = z.infer<
  typeof GenerateFactCheckVerdictOutputSchema
>;

export async function generateFactCheckVerdict(
  input: GenerateFactCheckVerdictInput
): Promise<GenerateFactCheckVerdictOutput> {
  return generateFactCheckVerdictFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFactCheckVerdictPrompt',
  input: {schema: GenerateFactCheckVerdictInputSchema},
  output: {schema: GenerateFactCheckVerdictOutputSchema},
  prompt: `You are an AI fact-checker. Synthesize the API results and gathered evidence to generate an easy to understand fact-check verdict.

API Results:
{{apiResults}}

Evidence:
{{evidence}}

Generate a fact-check verdict, a confidence level for the verdict, and the reasoning behind the verdict. Use no more than 200 words.
`,
});

const generateFactCheckVerdictFlow = ai.defineFlow(
  {
    name: 'generateFactCheckVerdictFlow',
    inputSchema: GenerateFactCheckVerdictInputSchema,
    outputSchema: GenerateFactCheckVerdictOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
