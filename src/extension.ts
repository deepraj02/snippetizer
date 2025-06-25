import * as vscode from 'vscode';
import { MESSAGES, PLACEHOLDERS, PROMPTS, VALIDATION } from './constants/constants';
import { getInput } from './helpers/getInput';
import { saveSnippet } from './helpers/saveSnippet';
import { showSnippetFiles } from './helpers/showSnippetsFiles';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('snippetizer.createSnippet', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage(MESSAGES.NO_ACTIVE_EDITOR);
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (!selectedText.trim()) {
      vscode.window.showErrorMessage(MESSAGES.NO_TEXT_SELECTED);
      return;
    }

    try {
      const snippetName = await getInput(
        PROMPTS.SNIPPET_NAME, 
        MESSAGES.SNIPPET_NAME_REQUIRED,
        (value) => {
          if (!VALIDATION.SNIPPET_NAME_PATTERN.test(value)) {
            return VALIDATION.SNIPPET_NAME_ERROR;
          }
          return null;
        }
      );
      if (snippetName === null) { return; }

      const snippetDesc = await vscode.window.showInputBox({ 
        prompt: PROMPTS.SNIPPET_DESCRIPTION,
        placeHolder: PLACEHOLDERS.SNIPPET_DESCRIPTION
      });
      if (snippetDesc === undefined) { return; }

      const snippetAlias = await getInput(
        PROMPTS.SNIPPET_ALIAS, 
        MESSAGES.SNIPPET_ALIAS_REQUIRED,
        (value) => {
          if (!VALIDATION.SNIPPET_ALIAS_PATTERN.test(value)) {
            return VALIDATION.SNIPPET_ALIAS_ERROR;
          }
          return null;
        }
      );
      if (snippetAlias === null) { return; }

      const selectedFile = await showSnippetFiles();
      if (!selectedFile) {
        return; 
      }

      await saveSnippet(selectedFile, snippetName, snippetDesc || '', snippetAlias, selectedText);
      vscode.window.showInformationMessage(MESSAGES.SNIPPET_SAVED_SUCCESS(snippetName));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      vscode.window.showErrorMessage(MESSAGES.SNIPPET_CREATE_FAILED(errorMessage));
      console.error('Error creating snippet:', error);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }