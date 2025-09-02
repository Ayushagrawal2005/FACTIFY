'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { FactCheckResult } from '@/types';

const GenerateInfographicHtmlOutputSchema = z.object({
  html: z.string().describe('The HTML for the infographic.'),
});
export type GenerateInfographicHtmlOutput = z.infer<typeof GenerateInfographicHtmlOutputSchema>;

function factCheckResultToSimpleObject(result: FactCheckResult) {
    return {
        claim: result.claim,
        verdict: result.verdict,
        confidenceLevel: result.confidenceLevel,
        reason: result.reason,
        supportingEvidenceCount: result.supportingEvidence.length,
        counterEvidenceCount: result.counterEvidence.length,
    }
}

export const generateInfographicHtmlFlow = ai.defineFlow(
  {
    name: 'generateInfographicHtmlFlow',
    inputSchema: z.any(),
    outputSchema: GenerateInfographicHtmlOutputSchema,
  },
  async (result: FactCheckResult) => {
    const prompt = `
      Create a visually appealing HTML document to serve as an infographic for a fact-check result.
      The entire design should be self-contained in one HTML file with inline CSS and no external dependencies or scripts.
      Use a modern, clean design with a professional color palette. The background should be a subtle gradient.
      The infographic should be 800px wide and 1200px high.
      The HTML should include:
      - A main title: "Factify Verdict"
      - The claim being analyzed.
      - A prominent display of the verdict (e.g., True, False, Misleading). Use a different, bold color for the verdict text based on its nature (e.g., green for True, red for False, orange for Mixed).
      - The confidence level.
      - A brief summary of the reasoning.
      - A simple visual representation of supporting vs. counter evidence counts (e.g., simple bars).
      - A footer with the Factify logo/name.
      - Use divs, spans, and inline styles to create the layout.
      
      Here is the data:
      - Claim: ${result.claim}
      - Verdict: ${result.verdict}
      - Confidence: ${result.confidenceLevel}
      - Reason: ${result.reason}
      - Supporting Evidence Count: ${result.supportingEvidence.length}
      - Counter Evidence Count: ${result.counterEvidence.length}

      Ensure the final output is only the HTML code, starting with <!DOCTYPE html> and ending with </html>.
    `;

    const { text } = await ai.generate({
        prompt: prompt,
        config: {
            temperature: 0.3
        }
    });
    
    // Sometimes the model wraps the HTML in ```html ... ```, so we strip that.
    const cleanedHtml = text.replace(/^```html\n/, '').replace(/\n```$/, '');

    return { html: cleanedHtml };
  }
);


export async function generateInfographicHtml(
  input: FactCheckResult
): Promise<GenerateInfographicHtmlOutput> {
  return generateInfographicHtmlFlow(input);
}
