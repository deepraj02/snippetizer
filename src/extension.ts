import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('snippetizer.createSnippet', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor!');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            vscode.window.showErrorMessage('No text selected!');
            return;
        }

        const snippetName = await vscode.window.showInputBox({ prompt: 'Enter snippet name' });
        const snippetDesc = await vscode.window.showInputBox({ prompt: 'Enter snippet description' });
        const snippetAlias = await vscode.window.showInputBox({ prompt: 'Enter snippet alias (prefix)' });

        if (snippetName && snippetDesc && snippetAlias) {
            await saveSnippet(editor.document.languageId, snippetName, snippetDesc, snippetAlias, text);
            vscode.window.showInformationMessage('Snippet added successfully!');
        }
    });

    context.subscriptions.push(disposable);
}

async function saveSnippet(languageId: string, name: string, description: string, alias: string, body: string) {
    const snippetsPath = path.join(vscode.env.appRoot, 'snippets', `${languageId}.json`);
    
    let snippets: any = {};
    if (fs.existsSync(snippetsPath)) {
        const data = await fs.promises.readFile(snippetsPath, 'utf8');
        snippets = JSON.parse(data);
    }

    snippets[name] = {
        prefix: alias,
        body: body.split('\n'),
        description: description
    };

    await fs.promises.writeFile(snippetsPath, JSON.stringify(snippets, null, 2));
    
    // Refresh snippets
    await vscode.commands.executeCommand('vscode.refreshSnippets');
}

export function deactivate() {}