// GatherEvidenceForClaim
'use server';
/**
 * @fileOverview This file defines a Genkit flow for gathering supporting and counter evidence for a given claim.
 *
 * - gatherEvidenceForClaim - A function that takes a claim as input and returns supporting and counter evidence.
 * - GatherEvidenceInput - The input type for the gatherEvidenceForClaim function.
 * - GatherEvidenceOutput - The return type for the gatherEvidenceForClaim function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GatherEvidenceInputSchema = z.object({
  claim: z.string().describe('The claim to gather evidence for.'),
});
export type GatherEvidenceInput = z.infer<typeof GatherEvidenceInputSchema>;

const GatherEvidenceOutputSchema = z.object({
  supportingEvidence: z.array(z.string()).describe('Evidence supporting the claim.'),
  counterEvidence: z.array(z.string()).describe('Evidence contradicting the claim.'),
});
export type GatherEvidenceOutput = z.infer<typeof GatherEvidenceOutputSchema>;

export async function gatherEvidenceForClaim(input: GatherEvidenceInput): Promise<GatherEvidenceOutput> {
  return gatherEvidenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gatherEvidencePrompt',
  input: {schema: GatherEvidenceInputSchema},
  output: {schema: GatherEvidenceOutputSchema},
  prompt: `You are an AI assistant tasked with gathering evidence for a given claim.

  Claim: {{{claim}}}

  Provide supporting and counter evidence for the claim. Be as thorough as possible.
  Return the supporting and counter evidence in separate lists.
  `,
});

const gatherEvidenceFlow = ai.defineFlow(
  {
    name: 'gatherEvidenceFlow',
    inputSchema: GatherEvidenceInputSchema,
    outputSchema: GatherEvidenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
