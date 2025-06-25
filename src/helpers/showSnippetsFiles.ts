import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { MESSAGES, PLACEHOLDERS, PROMPTS, UI, VALIDATION } from '../constants/constants';
import { getUserSnippetsFolder } from './getSnippetsFolder';

/**
 * Shows a quick pick for selecting existing snippet files or creating a new one
 * @returns The absolute path to the selected/created snippet file, or empty string if cancelled
 * @throws {Error} If there's an error accessing the snippets folder
 */
export async function showSnippetFiles(): Promise<string> {
    const snippetsFolder = getUserSnippetsFolder();

    try {
        
        await fs.promises.mkdir(snippetsFolder, { recursive: true });
        
        const files = await fs.promises.readdir(snippetsFolder);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        const options = [
            ...jsonFiles,
            ...(jsonFiles.length === 0 ? [] : [UI.SEPARATOR]),
            UI.CREATE_NEW_FILE
        ];

        const selectedFile = await vscode.window.showQuickPick(options, {
            placeHolder: jsonFiles.length === 0 
                ? PLACEHOLDERS.SELECT_FILE_EMPTY 
                : PLACEHOLDERS.SELECT_FILE
        });

        if (!selectedFile) {
            return '';
        }

        if (selectedFile === UI.CREATE_NEW_FILE) {
            return await createNewSnippetFile(snippetsFolder);
        }

        if (selectedFile === UI.SEPARATOR) {
            return '';
        }

        return path.join(snippetsFolder, selectedFile);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(MESSAGES.ERROR_ACCESSING_FILES(errorMessage));
        throw error;
    }
}

/**
 * Creates a new snippet file with proper validation
 * @param snippetsFolder - The folder where snippet files are stored
 * @returns The absolute path to the new snippet file, or empty string if cancelled
 */
async function createNewSnippetFile(snippetsFolder: string): Promise<string> {
    const newFileName = await vscode.window.showInputBox({
        prompt: PROMPTS.NEW_FILE_NAME,
        placeHolder: PLACEHOLDERS.FILE_NAME,
        validateInput: (value) => {
            if (!value || value.trim().length === 0) {
                return VALIDATION.FILE_NAME_EMPTY_ERROR;
            }
            if (!VALIDATION.FILE_NAME_PATTERN.test(value.trim())) {
                return VALIDATION.FILE_NAME_ERROR;
            }
            return null;
        }
    });

    if (!newFileName || newFileName.trim().length === 0) {
        return ''; 
    }

    return path.join(snippetsFolder, `${newFileName.trim()}.json`);
}