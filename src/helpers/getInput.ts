import * as vscode from 'vscode';

export async function getInput(prompt: string, errorMessage: string): Promise<string | null> {
    let input: string | null;
    while (true) {
        input = await vscode.window.showInputBox({ prompt }) ?? null;
        if (input === null) {
            return null;
        }
        if (input) {
            break;
        } else {
            vscode.window.showErrorMessage(errorMessage);
        }
    }
    return input;
}