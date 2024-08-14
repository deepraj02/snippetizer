import * as path from 'path';
import * as os from 'os';


export function getUserSnippetsFolder(): string {
    switch (os.platform()) {
        case 'win32':
            return path.join(process.env.APPDATA || '', 'Code', 'User', 'snippets');
        case 'darwin':
            return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User', 'snippets');
        default: // Linux and others
            return path.join(os.homedir(), '.config', 'Code', 'User', 'snippets');
    }
}

