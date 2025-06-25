import * as vscode from 'vscode';

/**
 * Shows an input box with validation and retry logic
 * @param prompt - The prompt text to show to the user
 * @param errorMessage - Error message to show if input is empty
 * @param validateInput - Optional custom validation function
 * @returns The trimmed user input, or null if cancelled
 */
export async function getInput(
    prompt: string, 
    errorMessage: string,
    validateInput?: (value: string) => string | null
): Promise<string | null> {
    while (true) {
        const input = await vscode.window.showInputBox({ 
            prompt,
            validateInput: validateInput ? (value) => {
                if (!value || value.trim().length === 0) {
                    return errorMessage;
                }
                return validateInput(value.trim());
            } : undefined
        });

        if (input === undefined) {
            return null;
        }

        if (!input || input.trim().length === 0) {
            vscode.window.showErrorMessage(errorMessage);
            continue;
        }

        return input.trim();
    }
}