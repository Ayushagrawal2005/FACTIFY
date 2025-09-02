'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { exec } from 'child_process';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

export const GenerateInfographicFromHtmlInputSchema = z.object({
  html: z.string().describe('The HTML content to convert to an image.'),
});
export type GenerateInfographicFromHtmlInput = z.infer<typeof GenerateInfographicFromHtmlInputSchema>;

export const GenerateInfographicFromHtmlOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateInfographicFromHtmlOutput = z.infer<typeof GenerateInfographicFromHtmlOutputSchema>;

async function convertHtmlToImage(html: string): Promise<Buffer> {
    const inputPath = join(tmpdir(), `infographic-input-${Date.now()}.html`);
    const outputPath = join(tmpdir(), `infographic-output-${Date.now()}.png`);

    await writeFile(inputPath, html);

    return new Promise((resolve, reject) => {
        exec(`node-html-to-image-cli --input "${inputPath}" --output "${outputPath}"`, async (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                await unlink(inputPath);
                return reject(error);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            
            const imageBuffer = await require('fs').promises.readFile(outputPath);
            
            // Clean up temporary files
            await unlink(inputPath);
            await unlink(outputPath);

            resolve(imageBuffer);
        });
    });
}

export const generateInfographicFromHtml = ai.defineFlow(
    {
        name: 'generateInfographicFromHtml',
        inputSchema: GenerateInfographicFromHtmlInputSchema,
        outputSchema: GenerateInfographicFromHtmlOutputSchema,
    },
    async (input) => {
        try {
            const imageBuffer = await convertHtmlToImage(input.html);
            const imageDataUri = `data:image/png;base64,${imageBuffer.toString('base64')}`;
            return { imageDataUri };
        } catch (error) {
            console.error('Error generating infographic from HTML:', error);
            throw new Error('Failed to generate infographic from HTML.');
        }
    }
);
