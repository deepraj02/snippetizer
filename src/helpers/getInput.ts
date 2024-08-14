import * as vscode from 'vscode'; 


export async function getInput(prompt: string, errorMessage: string): Promise<string> {
    let input: string | undefined;
    while (!input) {
        input = await vscode.window.showInputBox({ prompt });
        if (!input) {
            vscode.window.showErrorMessage(errorMessage);
        }
    }
    return input;
}
