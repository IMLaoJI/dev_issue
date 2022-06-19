"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
async function activate(context) {
    console.log("test 我的组件");
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