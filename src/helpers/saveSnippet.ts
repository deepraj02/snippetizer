import * as fs from 'fs';
import { Snippet, SnippetFile } from '../types/types';

/**
 * Saves a new snippet to the specified VS Code snippets file
 * @param filePath - Absolute path to the snippets file
 * @param name - Name/identifier for the snippet
 * @param description - Optional description of the snippet
 * @param alias - Prefix used to trigger the snippet
 * @param body - The actual code content of the snippet
 * @throws {Error} If the file cannot be read, parsed, or written
 */
export async function saveSnippet(
    filePath: string, 
    name: string, 
    description: string, 
    alias: string, 
    body: string
): Promise<void> {
    try {
        let snippets: SnippetFile = {};
        
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = await fs.promises.readFile(filePath, 'utf8');
                snippets = JSON.parse(fileContent) as SnippetFile;
            } catch (error) {
                console.warn('Invalid JSON in snippets file, starting fresh:', error);
                snippets = {};
            }
        }

        const newSnippet: Snippet = {
            prefix: alias,
            body: body.split('\n')
        };

        if (description && description.trim()) {
            newSnippet.description = description.trim();
        }

        snippets[name] = newSnippet;

        const formattedContent = JSON.stringify(snippets, null, 2);
        await fs.promises.writeFile(filePath, formattedContent, 'utf8');
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to save snippet: ${errorMessage}`);
    }
}