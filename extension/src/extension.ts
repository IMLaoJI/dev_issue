// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { getErrorMessage } from './error'
import { log } from './logger'
import { rollbar } from './rollbar'
import ENV from './environment'
import { map } from 'lodash/fp'
import { WebviewProvider } from './helpers/WebviewProvider'
export async function activate(context: vscode.ExtensionContext) {

	const myScheme = 'devissue';
	try {
		await activateSafe(context)
	} catch (error) {
		log.error(`extension.activate: ${getErrorMessage(error)}`, error as Error)
		rollbar.error('Extension.activate', error as Error)
	}
}

async function activateSafe(context: vscode.ExtensionContext) {

	process.on('uncaughtException', (err: Error) =>
		rollbar.error('Extension.uncaughtException', err, undefined, { ignoreNonStepsizeError: true })
	)

	const apiRootUrl = ENV.extEnv === 'local' ? ENV.ngrokApiUrl : ENV.apiRootUrl
	const webAppRootUrl =
		ENV.extEnv === 'local' && process.platform === 'darwin'
			? 'http://localhost:3000'
			: apiRootUrl!.replace('/api', '')

	log.debug('activateSafe', { apiRootUrl, webAppRootUrl })

	const webviewProvider = new WebviewProvider(
		context,
		context.extensionUri,
		apiRootUrl!,
		webAppRootUrl!
	)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(WebviewProvider.viewType, webviewProvider)
	)

}




// this method is called when your extension is deactivated
export function deactivate() { }
