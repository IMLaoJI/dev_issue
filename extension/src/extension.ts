// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "stepsize" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('stepsize.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from stepsize!');
	});


	context.subscriptions.push(disposable);
	disposable = vscode.window.setStatusBarMessage('Never saved anything122');
	context.subscriptions.push(disposable);

	disposable = vscode.workspace.onDidSaveTextDocument((evt) => {
		const disposable = vscode.window.setStatusBarMessage(`Saved ${evt.fileName} at ${Date.now()}`, 1000);
		context.subscriptions.push(disposable);
	});
	context.subscriptions.push(disposable);

	var webviewProvider = {
		resolveWebviewView: function (thisWebview, thisWebviewContext, thisToke) {
			thisWebview.webview.options = { enableScripts: true }
			thisWebview.webview.html = "<!doctype><html>[etc etc]";
		}
	};

	context.subscriptions.push(vscode.window.registerWebviewViewProvider("devissue.panel", webviewProvider),)
}



// this method is called when your extension is deactivated
export function deactivate() { }
