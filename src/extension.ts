import * as vscode from 'vscode';
import { showSnippetFiles } from './helpers/showSnippetsFiles';
import { saveSnippet } from './helpers/saveSnippet';
import { getInput } from './helpers/getInput';

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


    const snippetName = await getInput('Enter snippet name', 'Snippet name is required!');
    const snippetDesc = await getInput('Enter snippet description', 'Snippet description is required!');
    const snippetAlias = await getInput('Enter snippet alias (prefix)', 'Snippet alias is required!');


    try {
      const selectedFile = await showSnippetFiles();
      if (selectedFile) {
        await saveSnippet(selectedFile, snippetName, snippetDesc, snippetAlias, text);
        vscode.window.showInformationMessage('Snippet added successfully!');
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to add snippet: ${(error as Error).message}`);
      console.error('Error adding snippet:', error);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }