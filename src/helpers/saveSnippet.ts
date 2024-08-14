import * as vscode from 'vscode';
import * as fs from 'fs';

export async function saveSnippet(filePath: string, name: string, description: string, alias: string, body: string) {
    let snippets: any = {};

    if (fs.existsSync(filePath)) {
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            snippets = JSON.parse(data);
        } catch (error) {
            console.error('Error parsing existing snippets file:', error);
            vscode.window.showWarningMessage(`Existing snippets file was invalid. Creating a new file.`);
        }
    }

    snippets[name] = {
        prefix: alias,
        body: body.split('\n'),
        description: description
    };

    await fs.promises.writeFile(filePath, JSON.stringify(snippets, null, 2));

    // Refresh snippets
    await vscode.commands.executeCommand('vscode.refreshSnippets');

    // Open the snippets file
    const document = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(document);
}