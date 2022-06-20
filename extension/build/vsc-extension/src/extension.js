"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const error_1 = require("./error");
const logger_1 = require("./logger");
const rollbar_1 = require("./rollbar");
const environment_1 = require("./environment");
const WebviewProvider_1 = require("./helpers/WebviewProvider");
async function activate(context) {
    const myScheme = 'devissue';
    try {
        await activateSafe(context);
    }
    catch (error) {
        logger_1.log.error(`extension.activate: ${(0, error_1.getErrorMessage)(error)}`, error);
        rollbar_1.rollbar.error('Extension.activate', error);
    }
}
exports.activate = activate;
async function activateSafe(context) {
    process.on('uncaughtException', (err) => rollbar_1.rollbar.error('Extension.uncaughtException', err, undefined, { ignoreNonStepsizeError: true }));
    const apiRootUrl = environment_1.default.extEnv === 'local' ? environment_1.default.ngrokApiUrl : environment_1.default.apiRootUrl;
    const webAppRootUrl = environment_1.default.extEnv === 'local' && process.platform === 'darwin'
        ? 'http://localhost:3000'
        : apiRootUrl.replace('/api', '');
    logger_1.log.debug('activateSafe', { apiRootUrl, webAppRootUrl });
    const webviewProvider = new WebviewProvider_1.WebviewProvider(context, context.extensionUri, apiRootUrl, webAppRootUrl);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(WebviewProvider_1.WebviewProvider.viewType, webviewProvider));
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map