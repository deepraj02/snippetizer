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
const showSnippetsFiles_1 = __webpack_require__(2);
const saveSnippet_1 = __webpack_require__(7);
const getInput_1 = __webpack_require__(8);
function activate(context) {
    let disposable = vscode.commands.registerCommand('snippetizer.createSnippet', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor!');
            return;
        }
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        if (!text) {
            vscode.window.showErrorMessage('No text selected!');
            return;
        }
        const snippetName = await (0, getInput_1.getInput)('Enter snippet name', 'Snippet name is required!');
        if (snippetName === null)
            return;
        const snippetDesc = await (0, getInput_1.getInput)('Enter snippet description', 'Snippet description is required!');
        if (snippetDesc === null)
            return;
        const snippetAlias = await (0, getInput_1.getInput)('Enter snippet alias (prefix)', 'Snippet alias is required!');
        if (snippetAlias === null)
            return;
        try {
            const selectedFile = await (0, showSnippetsFiles_1.showSnippetFiles)();
            if (selectedFile) {
                await (0, saveSnippet_1.saveSnippet)(selectedFile, snippetName, snippetDesc, snippetAlias, text);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to add snippet:`);
            console.error('Error adding snippet:', error);
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
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(3));
const path = __importStar(__webpack_require__(4));
const getSnippetsFolder_1 = __webpack_require__(5);
async function showSnippetFiles() {
    const snippetsFolder = (0, getSnippetsFolder_1.getUserSnippetsFolder)();
    try {
        await fs.promises.mkdir(snippetsFolder, { recursive: true });
        const files = await fs.promises.readdir(snippetsFolder);
        // const snippetFiles = files.filter(file => file.endsWith('.json'));
        if (files.length === 0) {
            files.push('Create new snippets file');
        }
        const selectedFile = await vscode.window.showQuickPick(files, {
            placeHolder: 'Select a snippet file or create a new one'
        });
        if (selectedFile === 'Create new snippets file') {
            const newFileName = await vscode.window.showInputBox({
                prompt: 'Enter the name for the new snippets file (without .json extension)'
            });
            if (newFileName) {
                return path.join(snippetsFolder, `${newFileName}.json`);
            }
        }
        else if (selectedFile) {
            return path.join(snippetsFolder, selectedFile);
        }
    }
    catch (error) {
        vscode.window.showErrorMessage(`Error reading snippet files: ${error}`);
    }
    return '';
}


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 5 */
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
const path = __importStar(__webpack_require__(4));
const os = __importStar(__webpack_require__(6));
function getUserSnippetsFolder() {
    switch (os.platform()) {
        case 'win32':
            return path.join(process.env.APPDATA || '', 'Code', 'User', 'snippets');
        case 'darwin':
            return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User', 'snippets');
        default: // Linux and others
            return path.join(os.homedir(), '.config', 'Code', 'User', 'snippets');
    }
}


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 7 */
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
const vscode = __importStar(__webpack_require__(1));
const fs = __importStar(__webpack_require__(3));
async function saveSnippet(filePath, name, description, alias, body) {
    let fileContent = '{}';
    if (fs.existsSync(filePath)) {
        try {
            fileContent = await fs.promises.readFile(filePath, 'utf8');
            JSON.parse(fileContent);
        }
        catch (error) {
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
    }
    catch (error) {
        console.error('Error writing snippet file:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to write snippet file: ${error.message}`);
        }
        else {
            throw new Error('Failed to write snippet file due to an unknown error');
        }
    }
}


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
exports.getInput = getInput;
const vscode = __importStar(__webpack_require__(1));
async function getInput(prompt, errorMessage) {
    let input;
    while (true) {
        input = await vscode.window.showInputBox({ prompt }) ?? null;
        if (input === null) {
            return null;
        }
        if (input) {
            break;
        }
        else {
            vscode.window.showErrorMessage(errorMessage);
        }
    }
    return input;
}


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