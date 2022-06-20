// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { getErrorMessage } from './error'
import { log } from './logger'
import { rollbar } from './rollbar'
import ENV from './environment'
import { map } from 'lodash/fp'
export async function activate(context: vscode.ExtensionContext) {


	const myScheme = 'devissue';
	const myProvider = new class implements vscode.TextDocumentContentProvider {
		// emitter and its event
		onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
		onDidChange = this.onDidChangeEmitter.event;

		provideTextDocumentContent(uri: vscode.Uri): string {
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

async function activateSafe(context: vscode.ExtensionContext) {
	// const apiRootUrl = ENV.extEnv === 'local' ? ENV.ngrokApiUrl : ENV.apiRootUrl
	// const webAppRootUrl =
	//   ENV.extEnv === 'local' && process.platform === 'darwin'
	//     ? 'http://localhost:3000'
	//     : apiRootUrl!.replace('/api', '')

	// log.debug('activateSafe', { apiRootUrl, webAppRootUrl })
}




// this method is called when your extension is deactivated
export function deactivate() { }
