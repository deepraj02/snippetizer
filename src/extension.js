"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
var vscode = require("vscode");
var showSnippetsFiles_1 = require("./helpers/showSnippetsFiles");
var saveSnippet_1 = require("./helpers/saveSnippet");
function activate(context) {
    var _this = this;
    var disposable = vscode.commands.registerCommand('snippetizer.createSnippet', function () { return __awaiter(_this, void 0, void 0, function () {
        // const snippetName = await vscode.window.showInputBox({ prompt: 'Enter snippet name' });
        // if (!snippetName) {
        //   vscode.window.showErrorMessage('Snippet name is required!');
        //   return snippetName;
        // }
        // const snippetDesc = await vscode.window.showInputBox({ prompt: 'Enter snippet description' });
        // if (!snippetDesc) {
        //   vscode.window.showErrorMessage('Snippet description is required!');
        //   return snippetDesc;
        // }
        // const snippetAlias = await vscode.window.showInputBox({ prompt: 'Enter snippet alias (prefix)' });
        // if (!snippetAlias) {
        //   vscode.window.showErrorMessage('Snippet alias is required!');
        //   return snippetAlias;
        // }
        function getInput(prompt, errorMessage) {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!input) return [3 /*break*/, 2];
                            return [4 /*yield*/, vscode.window.showInputBox({ prompt: prompt })];
                        case 1:
                            input = _a.sent();
                            if (!input) {
                                vscode.window.showErrorMessage(errorMessage);
                            }
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/, input];
                    }
                });
            });
        }
        var editor, selection, text, snippetName, snippetDesc, snippetAlias, selectedFile, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    editor = vscode.window.activeTextEditor;
                    if (!editor) {
                        vscode.window.showErrorMessage('No active editor!');
                        return [2 /*return*/];
                    }
                    selection = editor.selection;
                    text = editor.document.getText(selection);
                    if (!text) {
                        vscode.window.showErrorMessage('No text selected!');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getInput('Enter snippet name', 'Snippet name is required!')];
                case 1:
                    snippetName = _a.sent();
                    return [4 /*yield*/, getInput('Enter snippet description', 'Snippet description is required!')];
                case 2:
                    snippetDesc = _a.sent();
                    return [4 /*yield*/, getInput('Enter snippet alias (prefix)', 'Snippet alias is required!')];
                case 3:
                    snippetAlias = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 8, , 9]);
                    return [4 /*yield*/, (0, showSnippetsFiles_1.showSnippetFiles)()];
                case 5:
                    selectedFile = _a.sent();
                    if (!selectedFile) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, saveSnippet_1.saveSnippet)(selectedFile, snippetName, snippetDesc, snippetAlias, text)];
                case 6:
                    _a.sent();
                    vscode.window.showInformationMessage('Snippet added successfully!');
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    vscode.window.showErrorMessage("Failed to add snippet: ".concat(error_1.message));
                    console.error('Error adding snippet:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
    context.subscriptions.push(disposable);
}
function deactivate() { }
