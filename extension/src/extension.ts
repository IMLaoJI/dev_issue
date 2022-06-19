// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { getErrorMessage } from './error'
import { log } from './logger'
import { rollbar } from './rollbar'
import ENV from './environment'


export async function activate (context: vscode.ExtensionContext) {
  console.log("test 我的组件");
  
  // try {
  //   await activateSafe(context)
  // } catch (error) {
  //   log.error(`extension.activate: ${getErrorMessage(error)}`, error as Error)
  //   rollbar.error('Extension.activate', error)
  // }
}

async function activateSafe (context: vscode.ExtensionContext) {
  // const apiRootUrl = ENV.extEnv === 'local' ? ENV.ngrokApiUrl : ENV.apiRootUrl
  // const webAppRootUrl =
  //   ENV.extEnv === 'local' && process.platform === 'darwin'
  //     ? 'http://localhost:3000'
  //     : apiRootUrl!.replace('/api', '')

  // log.debug('activateSafe', { apiRootUrl, webAppRootUrl })
}




// this method is called when your extension is deactivated
export function deactivate () {}
