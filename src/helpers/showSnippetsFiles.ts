import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getUserSnippetsFolder } from './getSnippetsFolder';



export async function showSnippetFiles(): Promise<string> {
    const snippetsFolder = getUserSnippetsFolder();

    try {
        await fs.promises.mkdir(snippetsFolder, { recursive: true });
        const files = await fs.promises.readdir(snippetsFolder);
        // const snippetFiles = files.filter(file => file.endsWith('.json'));

        if (files.length === 0) {
            files.push('Create new snippets file');
        }

        const selectedFile = await vscode.window.showQuickPick(files, {
            placeHolder: 'Select a snippet file or create a new one'
        });

        if (selectedFile === 'Create new snippets file') {
            const newFileName = await vscode.window.showInputBox({
                prompt: 'Enter the name for the new snippets file (without .json extension)'
            });
            if (newFileName) {
                return path.join(snippetsFolder, `${newFileName}.json`);
            }
        } else if (selectedFile) {
            return path.join(snippetsFolder, selectedFile);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error reading snippet files: ${error}`);
    }
    return '';
}