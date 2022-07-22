"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebviewProvider = void 0;
const vscode = require("vscode");
const path = require("path");
const environment_1 = require("../environment");
class WebviewProvider {
    constructor(_context, _extensionUri, _apiRootUrl, _webAppRootUrl) {
        this._context = _context;
        this._extensionUri = _extensionUri;
        this._apiRootUrl = _apiRootUrl;
        this._webAppRootUrl = _webAppRootUrl;
    }
    resolveWebviewView(webviewView, _context, _token) {
        this._view = webviewView;
        const localResourceRoots = [
            vscode.Uri.file(path.join(this._extensionUri.fsPath, 'build')),
            vscode.Uri.file(path.join(this._extensionUri.fsPath, 'build-webview')),
        ];
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots,
        };
        webviewView.webview.html = this.getHtmlForWebview('webview', this._apiRootUrl);
        if (process.env.NODE_ENV !== 'production') {
            const devPath = path.join(this._extensionUri.fsPath, 'build-webview');
            const manifest = require(path.join(devPath, 'asset-manifest.json'));
            const mainScript = manifest.files['main.js'];
            const mainScriptPath = path.join(devPath, mainScript);
            const chokidar = require('chokidar');
            chokidar.watch(mainScriptPath).on('change', () => {
                webviewView.webview.html = this.getHtmlForWebview('webview', this._apiRootUrl, false);
            });
        }
    }
    getFilesForHtml(webviewType) {
        const dir = `build-${webviewType}`;
        const manifest = environment_1.default.nodeEnv === 'development'
            ? require(path.join(this._extensionUri.fsPath, dir, 'asset-manifest.json'))
            : require(`../../${dir}/asset-manifest.json`);
        const mainScript = manifest.files['main.js'];
        const mainStyle = manifest.files['main.css']; // file might not be part of dev bundle
        const scriptUri = vscode.Uri.file(path.join(this._extensionUri.fsPath, dir, mainScript)).with({
            scheme: 'vscode-resource',
        });
        const styleUri = mainStyle
            ? vscode.Uri.file(path.join(this._extensionUri.fsPath, dir, mainStyle)).with({
                scheme: 'vscode-resource',
            })
            : undefined;
        return {
            scriptUri,
            styleUri,
        };
    }
    getHtmlForWebview(webviewType, apiRootUrl, clearCache) {
        const dir = `build-${webviewType}`;
        const { scriptUri, styleUri } = this.getFilesForHtml(webviewType);
        // Use a nonce to whitelist which scripts can be run
        const nonce = getNonce();
        const baseHref = vscode.Uri.file(path.join(this._extensionUri.fsPath, dir)).with({
            scheme: 'vscode-resource',
        });
        const backendUrl = apiRootUrl.replace('api', '');
        return `<!DOCTYPE html>
                <html lang="en" class="app">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                    <meta name="theme-color" content="#000000">
                    <title>React App</title>
                    ${styleUri ? `<link rel="stylesheet" type="text/css" href="${styleUri}">` : ''}
                    <meta http-equiv="Content-Security-Policy" content="default-src ${backendUrl} ${backendUrl.replace('https', 'http')}; img-src vscode-resource: https: http: data:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
            <base href="${baseHref}/">
            <style>
              #loading-container {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                zIndex: 999;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              #loading {
                display: inline-block;
                width: 50px;
                height: 50px;
                border: 3px solid rgba(148,148,148,0.4);
                border-radius: 50%;
                border-top-color: rgba(148,148,148,0.8);
                animation: spin 1s ease-in-out infinite;
                -webkit-animation: spin 1s ease-in-out infinite;
              }
              @keyframes spin {
                to { -webkit-transform: rotate(360deg); }
              }
              @-webkit-keyframes spin {
                to { -webkit-transform: rotate(360deg); }
              }
            </style>
                </head>
    
                <body>
                    <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">
              <div id="loading-container"><div id="loading"></div></div>
            </div>
    
                    <script nonce="${nonce}" src="${scriptUri}${clearCache ? `?v=${getNonce()}` : ''}"></script>
                </body>
                </html>`;
    }
}
exports.WebviewProvider = WebviewProvider;
WebviewProvider.viewType = 'devissue.panel';
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//# sourceMappingURL=WebviewProvider.js.map