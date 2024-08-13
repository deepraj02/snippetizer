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
var fs = require("fs");
var path = require("path");
function activate(context) {
    var _this = this;
    var disposable = vscode.commands.registerCommand('snippetizer.createSnippet', function () { return __awaiter(_this, void 0, void 0, function () {
        var editor, selection, text, snippetName, snippetDesc, snippetAlias;
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
                    return [4 /*yield*/, vscode.window.showInputBox({ prompt: 'Enter snippet name' })];
                case 1:
                    snippetName = _a.sent();
                    return [4 /*yield*/, vscode.window.showInputBox({ prompt: 'Enter snippet description' })];
                case 2:
                    snippetDesc = _a.sent();
                    return [4 /*yield*/, vscode.window.showInputBox({ prompt: 'Enter snippet alias (prefix)' })];
                case 3:
                    snippetAlias = _a.sent();
                    if (!(snippetName && snippetDesc && snippetAlias)) return [3 /*break*/, 5];
                    return [4 /*yield*/, saveSnippet(editor.document.languageId, snippetName, snippetDesc, snippetAlias, text)];
                case 4:
                    _a.sent();
                    vscode.window.showInformationMessage('Snippet added successfully!');
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    context.subscriptions.push(disposable);
}
function saveSnippet(languageId, name, description, alias, body) {
    return __awaiter(this, void 0, void 0, function () {
        var snippetsPath, snippets, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    snippetsPath = path.join(vscode.env.appRoot, 'snippets', "".concat(languageId, ".json"));
                    snippets = {};
                    if (!fs.existsSync(snippetsPath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs.promises.readFile(snippetsPath, 'utf8')];
                case 1:
                    data = _a.sent();
                    snippets = JSON.parse(data);
                    _a.label = 2;
                case 2:
                    snippets[name] = {
                        prefix: alias,
                        body: body.split('\n'),
                        description: description
                    };
                    return [4 /*yield*/, fs.promises.writeFile(snippetsPath, JSON.stringify(snippets, null, 2))];
                case 3:
                    _a.sent();
                    // Refresh snippets
                    return [4 /*yield*/, vscode.commands.executeCommand('vscode.refreshSnippets')];
                case 4:
                    // Refresh snippets
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deactivate() { }
