import * as vscode from 'vscode';
import * as fs from 'fs';

export async function saveSnippet(filePath: string, name: string, description: string, alias: string, body: string) {
    let fileContent = '{}';
    if (fs.existsSync(filePath)) {
        try {
            fileContent = await fs.promises.readFile(filePath, 'utf8');

            JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading or parsing existing snippets file:', error);

            fileContent = '{}';
        }
    }

    // Remove the closing brace if it exists
    fileContent = fileContent.trim().replace(/}$/, '');

    // Add a comma if the file is not empty
    if (fileContent.length > 1) {
        fileContent += ',';
    }

    // Append the new snippet
    const newSnippet = `
  "${name}": {
    "prefix": "${alias}",
    "body": ${JSON.stringify(body.split('\n'))},
    "description": "${description}"
  }
}`;

    fileContent += newSnippet;

    try {
        await fs.promises.writeFile(filePath, fileContent);

        // Open the snippets file
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);

        vscode.window.showInformationMessage('Snippet added successfully!');
    } catch (error) {
        console.error('Error writing snippet file:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to write snippet file: ${error.message}`);
        } else {
            throw new Error('Failed to write snippet file due to an unknown error');
        }
    }
}