/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const constants_1 = __webpack_require__(2);
const getInput_1 = __webpack_require__(3);
const saveSnippet_1 = __webpack_require__(4);
const showSnippetsFiles_1 = __webpack_require__(6);
function activate(context) {
    const disposable = vscode.commands.registerCommand('snippetizer.createSnippet', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_ACTIVE_EDITOR);
            return;
        }
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText.trim()) {
            vscode.window.showErrorMessage(constants_1.MESSAGES.NO_TEXT_SELECTED);
            return;
        }
        try {
            const snippetName = await (0, getInput_1.getInput)(constants_1.PROMPTS.SNIPPET_NAME, constants_1.MESSAGES.SNIPPET_NAME_REQUIRED, (value) => {
                if (!constants_1.VALIDATION.SNIPPET_NAME_PATTERN.test(value)) {
                    return constants_1.VALIDATION.SNIPPET_NAME_ERROR;
                }
                return null;
            });
            if (snippetName === null) {
                return;
            }
            const snippetDesc = await vscode.window.showInputBox({
                prompt: constants_1.PROMPTS.SNIPPET_DESCRIPTION,
                placeHolder: constants_1.PLACEHOLDERS.SNIPPET_DESCRIPTION
            });
            if (snippetDesc === undefined) {
                return;
            }
            const snippetAlias = await (0, getInput_1.getInput)(constants_1.PROMPTS.SNIPPET_ALIAS, constants_1.MESSAGES.SNIPPET_ALIAS_REQUIRED, (value) => {
                if (!constants_1.VALIDATION.SNIPPET_ALIAS_PATTERN.test(value)) {
                    return constants_1.VALIDATION.SNIPPET_ALIAS_ERROR;
                }
                return null;
            });
            if (snippetAlias === null) {
                return;
            }
            const selectedFile = await (0, showSnippetsFiles_1.showSnippetFiles)();
            if (!selectedFile) {
                return;
            }
            await (0, saveSnippet_1.saveSnippet)(selectedFile, snippetName, snippetDesc || '', snippetAlias, selectedText);
            vscode.window.showInformationMessage(constants_1.MESSAGES.SNIPPET_SAVED_SUCCESS(snippetName));
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            vscode.window.showErrorMessage(constants_1.MESSAGES.SNIPPET_CREATE_FAILED(errorMessage));
            console.error('Error creating snippet:', error);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UI = exports.VALIDATION = exports.PLACEHOLDERS = exports.PROMPTS = exports.MESSAGES = void 0;
exports.MESSAGES = {
    NO_ACTIVE_EDITOR: 'No active editor found!',
    NO_TEXT_SELECTED: 'No text selected! Please select some code to create a snippet.',
    SNIPPET_NAME_REQUIRED: 'Snippet name is required!',
    SNIPPET_ALIAS_REQUIRED: 'Snippet alias is required!',
    SNIPPET_SAVED_SUCCESS: (name) => `Snippet "${name}" saved successfully!`,
    SNIPPET_CREATE_FAILED: (error) => `Failed to create snippet: ${error}`,
    ERROR_ACCESSING_FILES: (error) => `Error accessing snippet files: ${error}`,
};
exports.PROMPTS = {
    SNIPPET_NAME: 'Enter snippet name',
    SNIPPET_DESCRIPTION: 'Enter snippet description (optional)',
    SNIPPET_ALIAS: 'Enter snippet alias (prefix)',
    NEW_FILE_NAME: 'Enter the name for the new snippets file',
};
exports.PLACEHOLDERS = {
    SNIPPET_DESCRIPTION: 'Brief description of what this snippet does',
    FILE_NAME: 'e.g., javascript, typescript, my-snippets',
    SELECT_FILE_EMPTY: 'No snippet files found. Create a new one?',
    SELECT_FILE: 'Select a snippet file or create a new one',
};
exports.VALIDATION = {
    SNIPPET_NAME_PATTERN: /^[a-zA-Z0-9_\s-]+$/,
    SNIPPET_ALIAS_PATTERN: /^[a-zA-Z0-9_-]+$/,
    FILE_NAME_PATTERN: /^[a-zA-Z0-9_-]+$/,
    SNIPPET_NAME_ERROR: 'Snippet name can only contain letters, numbers, spaces, hyphens, and underscores',
    SNIPPET_ALIAS_ERROR: 'Snippet alias can only contain letters, numbers, hyphens, and underscores (no spaces)',
    FILE_NAME_ERROR: 'File name can only contain letters, numbers, hyphens, and underscores',
    FILE_NAME_EMPTY_ERROR: 'File name cannot be empty',
};
exports.UI = {
    CREATE_NEW_FILE: 'Create new snippets file',
    SEPARATOR: '---',
};


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInput = getInput;
const vscode = __importStar(__webpack_require__(1));
/**
 * Shows an input box with validation and retry logic
 * @param prompt - The prompt text to show to the user
 * @param errorMessage - Error message to show if input is empty
 * @param validateInput - Optional custom validation function
 * @returns The trimmed user input, or null if cancelled
 */
async function getInput(prompt, errorMessage, validateInput) {
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


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveSnippet = saveSnippet;
const fs = __importStar(__webpack_require__(5));
/**
 * Saves a new snippet to the specified VS Code snippets file
 * @param filePath - Absolute path to the snippets file
 * @param name - Name/identifier for the snippet
 * @param description - Optional description of the snippet
 * @param alias - Prefix used to trigger the snippet
 * @param body - The actual code content of the snippet
 * @throws {Error} If the file cannot be read, parsed, or written
 */
async function saveSnippet(filePath, name, description, alias, body) {
    try {
        let snippets = {};
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = await fs.promises.readFile(filePath, 'utf8');
                snippets = JSON.parse(fileContent);
            }
            catch (error) {
                console.warn('Invalid JSON in snippets file, starting fresh:', error);
                snippets = {};
            }
        }
        const newSnippet = {
            prefix: alias,
            body: body.split('\n')
        };
        if (description && description.trim()) {
            newSnippet.description = description.trim();
        }
        snippets[name] = newSnippet;
        const formattedContent = JSON.stringify(snippets, null, 2);
        await fs.promises.writeFile(filePath, formattedContent, 'utf8');
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to save snippet: ${errorMessage}`);
    }
}


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showSnippetFiles = showSnippetFiles;
const fs = __importStar(__webpack_require__(5));
const path = __importStar(__webpack_require__(7));
const vscode = __importStar(__webpack_require__(1));
const constants_1 = __webpack_require__(2);
const getSnippetsFolder_1 = __webpack_require__(8);
/**
 * Shows a quick pick for selecting existing snippet files or creating a new one
 * @returns The absolute path to the selected/created snippet file, or empty string if cancelled
 * @throws {Error} If there's an error accessing the snippets folder
 */
async function showSnippetFiles() {
    const snippetsFolder = (0, getSnippetsFolder_1.getUserSnippetsFolder)();
    try {
        await fs.promises.mkdir(snippetsFolder, { recursive: true });
        const files = await fs.promises.readdir(snippetsFolder);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        const options = [
            ...jsonFiles,
            ...(jsonFiles.length === 0 ? [] : [constants_1.UI.SEPARATOR]),
            constants_1.UI.CREATE_NEW_FILE
        ];
        const selectedFile = await vscode.window.showQuickPick(options, {
            placeHolder: jsonFiles.length === 0
                ? constants_1.PLACEHOLDERS.SELECT_FILE_EMPTY
                : constants_1.PLACEHOLDERS.SELECT_FILE
        });
        if (!selectedFile) {
            return '';
        }
        if (selectedFile === constants_1.UI.CREATE_NEW_FILE) {
            return await createNewSnippetFile(snippetsFolder);
        }
        if (selectedFile === constants_1.UI.SEPARATOR) {
            return '';
        }
        return path.join(snippetsFolder, selectedFile);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(constants_1.MESSAGES.ERROR_ACCESSING_FILES(errorMessage));
        throw error;
    }
}
/**
 * Creates a new snippet file with proper validation
 * @param snippetsFolder - The folder where snippet files are stored
 * @returns The absolute path to the new snippet file, or empty string if cancelled
 */
async function createNewSnippetFile(snippetsFolder) {
    const newFileName = await vscode.window.showInputBox({
        prompt: constants_1.PROMPTS.NEW_FILE_NAME,
        placeHolder: constants_1.PLACEHOLDERS.FILE_NAME,
        validateInput: (value) => {
            if (!value || value.trim().length === 0) {
                return constants_1.VALIDATION.FILE_NAME_EMPTY_ERROR;
            }
            if (!constants_1.VALIDATION.FILE_NAME_PATTERN.test(value.trim())) {
                return constants_1.VALIDATION.FILE_NAME_ERROR;
            }
            return null;
        }
    });
    if (!newFileName || newFileName.trim().length === 0) {
        return '';
    }
    return path.join(snippetsFolder, `${newFileName.trim()}.json`);
}


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserSnippetsFolder = getUserSnippetsFolder;
const os = __importStar(__webpack_require__(9));
const path = __importStar(__webpack_require__(7));
/**
 * Gets the platform-specific VS Code user snippets folder path
 * @returns The absolute path to the user's VS Code snippets directory
 */
function getUserSnippetsFolder() {
    switch (os.platform()) {
        case 'win32':
            return path.join(process.env.APPDATA || '', 'Code', 'User', 'snippets');
        case 'darwin':
            return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User', 'snippets');
        default:
            return path.join(os.homedir(), '.config', 'Code', 'User', 'snippets');
    }
}


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("os");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map