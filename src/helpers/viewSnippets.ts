import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { MESSAGES, PLACEHOLDERS, UI } from '../constants/constants';
import { Snippet, SnippetFile } from '../types/types';
import { getUserSnippetsFolder } from './getSnippetsFolder';

/**
 * Shows a quick pick for selecting existing snippet files to view
 * @returns The absolute path to the selected snippet file, or empty string if cancelled
 * @throws {Error} If there's an error accessing the snippets folder
 */
export async function showSnippetFilesForViewing(): Promise<string> {
    const snippetsFolder = getUserSnippetsFolder();

    try {
        await fs.promises.mkdir(snippetsFolder, { recursive: true });
        
        const files = await fs.promises.readdir(snippetsFolder);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        if (jsonFiles.length === 0) {
            vscode.window.showInformationMessage(MESSAGES.NO_SNIPPET_FILES_FOUND);
            return '';
        }

        const selectedFile = await vscode.window.showQuickPick(jsonFiles, {
            placeHolder: PLACEHOLDERS.SELECT_FILE_TO_VIEW
        });

        if (!selectedFile) {
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
 * Reads snippets from a file and displays them in a quick pick list
 * @param filePath - Absolute path to the snippets file
 * @throws {Error} If the file cannot be read or parsed
 */
export async function displaySnippets(filePath: string): Promise<void> {
    try {
        if (!fs.existsSync(filePath)) {
            vscode.window.showErrorMessage(MESSAGES.NO_SNIPPETS_FOUND);
            return;
        }

        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const snippets: SnippetFile = JSON.parse(fileContent);
        
        const snippetNames = Object.keys(snippets);
        
        if (snippetNames.length === 0) {
            vscode.window.showInformationMessage(MESSAGES.NO_SNIPPETS_FOUND);
            return;
        }
        const quickPickItems = snippetNames.map(name => {
            const snippet = snippets[name];
            return {
                label: name,
                description: snippet.description || 'No description',
                detail: `Alias: ${snippet.prefix} | Lines: ${snippet.body.length}`,
                snippet: snippet
            };
        });

        const selectedItem = await vscode.window.showQuickPick(quickPickItems, {
            placeHolder: PLACEHOLDERS.SELECT_SNIPPET_TO_VIEW,
            matchOnDescription: true,
            matchOnDetail: true
        });

        if (selectedItem) {
            await showSnippetAction(selectedItem.label, selectedItem.snippet, filePath);
        }
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        vscode.window.showErrorMessage(MESSAGES.ERROR_READING_SNIPPETS(errorMessage));
        console.error('Error reading snippets:', error);
    }
}

/**
 * Shows action options for a selected snippet (view or insert)
 * @param name - The name of the snippet
 * @param snippet - The snippet object containing its details
 * @param filePath - The path to the snippet file
 */
async function showSnippetAction(name: string, snippet: Snippet, filePath: string): Promise<void> {
    const actions = [
        {
            label: UI.VIEW_SNIPPET,
            description: 'View snippet content in a new tab'
        },
        {
            label: UI.INSERT_SNIPPET,
            description: 'Insert snippet at cursor position in active editor'
        }
    ];

    const selectedAction = await vscode.window.showQuickPick(actions, {
        placeHolder: PLACEHOLDERS.SELECT_SNIPPET_ACTION
    });

    if (!selectedAction) {
        return;
    }

    if (selectedAction.label === UI.VIEW_SNIPPET) {
        await showSnippetDetails(name, snippet, filePath);
    } else if (selectedAction.label === UI.INSERT_SNIPPET) {
        await insertSnippetIntoEditor(name, snippet);
    }
}

/**
 * Inserts a snippet into the active editor at the cursor position
 * @param name - The name of the snippet
 * @param snippet - The snippet object containing its details
 */
async function insertSnippetIntoEditor(name: string, snippet: Snippet): Promise<void> {
    const activeEditor = vscode.window.activeTextEditor;
    
    if (!activeEditor) {
        vscode.window.showErrorMessage(MESSAGES.NO_ACTIVE_EDITOR);
        return;
    }

    const snippetContent = snippet.body.join('\n');
    const position = activeEditor.selection.active;
    
    try {
        await activeEditor.edit(editBuilder => {
            editBuilder.insert(position, snippetContent);
        });
        
        vscode.window.showInformationMessage(MESSAGES.SNIPPET_INSERTED_SUCCESS(name));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        vscode.window.showErrorMessage(`Failed to insert snippet: ${errorMessage}`);
    }
}

/**
 * Shows detailed information about a selected snippet by opening the snippet file
 * @param name - The name of the snippet
 * @param snippet - The snippet object containing its details
 * @param filePath - The path to the snippet file
 */
async function showSnippetDetails(name: string, snippet: Snippet, filePath: string): Promise<void> {
    try {
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document, { preview: false });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        vscode.window.showErrorMessage(`Failed to open snippet file: ${errorMessage}`);
    }
}
