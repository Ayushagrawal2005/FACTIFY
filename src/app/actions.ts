'use server';

import { extractClaims } from '@/ai/flows/extract-claims-from-input';
import { gatherEvidenceForClaim } from '@/ai/flows/gather-evidence-for-claim';
import { generateFactCheckVerdict } from '@/ai/flows/generate-fact-check-verdict';
import { generateAudioFromText } from '@/ai/flows/generate-audio-from-text';
import { generateInfographicFromHtml } from '@/ai/flows/generate-infographic-from-html';
import { generateInfographicHtml } from '@/ai/flows/generate-infographic-html';
import type { FactCheckResult } from '@/types';

// Mocks calling external fact-checking APIs
const mockFactCheckApiCall = async (claim: string): Promise<{ references: string[] }> => {
  console.log(`Mocking API call for claim: "${claim}"`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return {
    references: [
      `PolitiFact: Analysis of "${claim.substring(0, 30)}..." - Mostly True.`,
      `Snopes: We found this claim to be a mixture of truth and falsehood.`,
      `Reuters Fact Check: Lacks context.`,
      `Associated Press: The claim is misleading and leaves out important details.`,
    ],
  };
};

export async function performFactCheck(
  formData: FormData
): Promise<{ success: boolean; data?: FactCheckResult; error?: string }> {
  const text = formData.get('textInput') as string;
  if (!text || text.trim().length < 10) {
    return { success: false, error: 'Input must be at least 10 characters long.' };
  }

  try {
    const claimsResult = await extractClaims({ text });
    if (!claimsResult.claims || claimsResult.claims.length === 0) {
      return { success: false, error: 'Could not extract any verifiable claims from the provided text.' };
    }
    const primaryClaim = claimsResult.claims[0];

    const [mockApiData, evidenceResult] = await Promise.all([
        mockFactCheckApiCall(primaryClaim),
        gatherEvidenceForClaim({ claim: primaryClaim })
    ]);

    const verdictInput = {
      apiResults: mockApiData.references.join('\n'),
      evidence: `Supporting Evidence: ${evidenceResult.supportingEvidence.join('; ')}\n\nCounter Evidence: ${evidenceResult.counterEvidence.join('; ')}`,
    };

    const verdictResult = await generateFactCheckVerdict(verdictInput);

    return {
      success: true,
      data: {
        claim: primaryClaim,
        verdict: verdictResult.verdict,
        confidenceLevel: verdictResult.confidenceLevel,
        reason: verdictResult.reason,
        supportingEvidence: evidenceResult.supportingEvidence,
        counterEvidence: evidenceResult.counterEvidence,
        references: mockApiData.references,
      },
    };
  } catch (e) {
    console.error(e);
    // Provide a more user-friendly error message
    if (e instanceof Error && e.message.includes('deadline')) {
        return { success: false, error: 'The request timed out. The server might be under heavy load. Please try again later.' };
    }
    return { success: false, error: 'An unexpected error occurred while communicating with the AI service.' };
  }
}


export async function getAudioForText(text: string): Promise<{ success: boolean; data?: string; error?: string }> {
    if (!text) {
        return { success: false, error: 'No text provided for audio generation.' };
    }
    try {
        const result = await generateAudioFromText(text);
        return { success: true, data: result.media };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Failed to generate audio.' };
    }
}

export async function getInfographic(result: FactCheckResult): Promise<{ success: boolean; data?: string; error?: string }> {
    try {
        const infographicHtml = await generateInfographicHtml(result);
        const infographicImage = await generateInfographicFromHtml({ html: infographicHtml.html });
        return { success: true, data: infographicImage.imageDataUri };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Failed to generate infographic.' };
    }
}
