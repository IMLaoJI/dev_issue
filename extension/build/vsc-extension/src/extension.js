"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
async function activate(context) {
    const myScheme = 'devissue';
    const myProvider = new class {
        constructor() {
            // emitter and its event
            this.onDidChangeEmitter = new vscode.EventEmitter();
            this.onDidChange = this.onDidChangeEmitter.event;
        }
        provideTextDocumentContent(uri) {
            // simply invoke cowsay, use uri-path as text
            return "hello word1";
        }
    };
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider));
    context.subscriptions.push(vscode.commands.registerCommand('devissue.helloWorld', async () => {
        const what = await vscode.window.showInputBox({ placeHolder: 'helloWorld...' });
        if (what) {
            const uri = vscode.Uri.parse('devissue:' + what);
            const doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
            await vscode.window.showTextDocument(doc, { preview: false });
        }
    }));
    // try {
    //   await activateSafe(context)
    // } catch (error) {
    //   log.error(`extension.activate: ${getErrorMessage(error)}`, error as Error)
    //   rollbar.error('Extension.activate', error)
    // }
}
exports.activate = activate;
async function activateSafe(context) {
    // const apiRootUrl = ENV.extEnv === 'local' ? ENV.ngrokApiUrl : ENV.apiRootUrl
    // const webAppRootUrl =
    //   ENV.extEnv === 'local' && process.platform === 'darwin'
    //     ? 'http://localhost:3000'
    //     : apiRootUrl!.replace('/api', '')
    // log.debug('activateSafe', { apiRootUrl, webAppRootUrl })
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map