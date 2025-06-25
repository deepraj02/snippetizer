export const MESSAGES = {
    NO_ACTIVE_EDITOR: 'No active editor found!',
    NO_TEXT_SELECTED: 'No text selected! Please select some code to create a snippet.',
    SNIPPET_NAME_REQUIRED: 'Snippet name is required!',
    SNIPPET_ALIAS_REQUIRED: 'Snippet alias is required!',
    SNIPPET_SAVED_SUCCESS: (name: string) => `Snippet "${name}" saved successfully!`,
    SNIPPET_CREATE_FAILED: (error: string) => `Failed to create snippet: ${error}`,
    ERROR_ACCESSING_FILES: (error: string) => `Error accessing snippet files: ${error}`,
    NO_SNIPPETS_FOUND: 'No snippets found in the selected file.',
    NO_SNIPPET_FILES_FOUND: 'No snippet files found in the snippets directory.',
    ERROR_READING_SNIPPETS: (error: string) => `Error reading snippets: ${error}`,
    SNIPPET_INSERTED_SUCCESS: (name: string) => `Snippet "${name}" inserted successfully!`,
};

export const PROMPTS = {
    SNIPPET_NAME: 'Enter snippet name',
    SNIPPET_DESCRIPTION: 'Enter snippet description (optional)',
    SNIPPET_ALIAS: 'Enter snippet alias (prefix)',
    NEW_FILE_NAME: 'Enter the name for the new snippets file (codefile extension as name) without any extension',
};

export const PLACEHOLDERS = {
    SNIPPET_DESCRIPTION: 'Brief description of what this snippet does',
    FILE_NAME: 'e.g., javascript, typescript, my-snippets',
    SELECT_FILE_EMPTY: 'No snippet files found. Create a new one?',
    SELECT_FILE: 'Select a snippet file or create a new one',
    SELECT_FILE_TO_VIEW: 'Select a snippet file to view its contents',
    SELECT_SNIPPET_TO_VIEW: 'Select a snippet to view its details',
    SELECT_SNIPPET_ACTION: 'What would you like to do with this snippet?',
};

export const VALIDATION = {
    SNIPPET_NAME_PATTERN: /^[a-zA-Z0-9_\s-]+$/,
    SNIPPET_ALIAS_PATTERN: /^[a-zA-Z0-9_-]+$/,
    FILE_NAME_PATTERN: /^[a-zA-Z0-9_-]+$/,
    SNIPPET_NAME_ERROR: 'Snippet name can only contain letters, numbers, spaces, hyphens, and underscores',
    SNIPPET_ALIAS_ERROR: 'Snippet alias can only contain letters, numbers, hyphens, and underscores (no spaces)',
    FILE_NAME_ERROR: 'File name can only contain letters, numbers, hyphens, and underscores',
    FILE_NAME_EMPTY_ERROR: 'File name cannot be empty',
};

export const UI = {
    CREATE_NEW_FILE: 'Create new snippets file',
    SEPARATOR: '---',
    VIEW_SNIPPET: '👁️ View Snippet',
    INSERT_SNIPPET: '📝 Insert into Editor',
};

export const COMMANDS = {
    CREATE_SNIPPET: 'snippetizer.createSnippet',
    VIEW_SNIPPETS: 'snippetizer.viewSnippets'
};