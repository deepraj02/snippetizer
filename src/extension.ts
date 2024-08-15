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
    if (snippetName === null) { return; }

    const snippetDesc = await getInput('Enter snippet description', 'Snippet description is required!');
    if (snippetDesc === null) { return; }

    const snippetAlias = await getInput('Enter snippet alias (prefix)', 'Snippet alias is required!');
    if (snippetAlias === null) { return; }

    try {
      const selectedFile = await showSnippetFiles();
      if (selectedFile) {
        await saveSnippet(selectedFile, snippetName, snippetDesc, snippetAlias, text);
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to add snippet:`);
      console.error('Error adding snippet:', error);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }