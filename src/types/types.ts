export interface Snippet {
    prefix: string;
    body: string[];
    description?: string;
    scope?: string;
}

export interface SnippetFile {
    [key: string]: Snippet;
}

export interface SnippetInput {
    name: string;
    description?: string;
    alias: string;
    body: string;
}
