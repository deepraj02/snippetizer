import * as os from 'os';
import * as path from 'path';

/**
 * Gets the platform-specific VS Code user snippets folder path
 * @returns The absolute path to the user's VS Code snippets directory
 */
export function getUserSnippetsFolder(): string {
    switch (os.platform()) {
        case 'win32':
            return path.join(process.env.APPDATA || '', 'Code', 'User', 'snippets');
        case 'darwin':
            return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User', 'snippets');
        default:
            return path.join(os.homedir(), '.config', 'Code', 'User', 'snippets');
    }
}

