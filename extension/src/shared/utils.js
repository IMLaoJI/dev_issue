"use strict";
exports.__esModule = true;
exports.getIntegrationIconUrl = exports.pmToolToIssueName = exports.pmToolToHumanReadable = exports.assertNever = void 0;
/** @jsxImportSource @emotion/react */
var types_1 = require("./types");
function assertNever(x, message) {
    throw new Error("".concat(message || 'Unexpected object', ": ").concat(x));
}
exports.assertNever = assertNever;
function pmToolToHumanReadable(tool, options // addArticle: true will prefix 'an'/'a' to the tool name
) {
    var addArticle = Boolean(options === null || options === void 0 ? void 0 : options.addArticlePrefix);
    switch (tool) {
        case types_1.ProjectManagementTool.Linear:
            return addArticle ? 'a Linear' : 'Linear';
        case types_1.ProjectManagementTool.AzureDevOps:
            return addArticle ? 'an Azure DevOps' : 'Azure DevOps';
        case types_1.ProjectManagementTool.Asana:
            return addArticle ? 'an Asana' : 'Asana';
        case types_1.ProjectManagementTool.GitHub:
            return addArticle ? 'a GitHub' : 'GitHub';
        case types_1.ProjectManagementTool.Jira:
            return addArticle ? 'a Jira' : 'Jira';
        default:
            return '';
    }
}
exports.pmToolToHumanReadable = pmToolToHumanReadable;
function pmToolToIssueName(tool, options) {
    if (options === void 0) { options = {
        plural: false,
        addArticlePrefix: false
    }; }
    var sIfPlural = options.plural ? 's' : '';
    switch (tool) {
        case types_1.ProjectManagementTool.AzureDevOps:
            return "".concat(options.addArticlePrefix ? 'a ' : '', "work item").concat(sIfPlural);
        case types_1.ProjectManagementTool.Asana:
            return "".concat(options.addArticlePrefix ? 'a ' : '', "task").concat(sIfPlural);
        case types_1.ProjectManagementTool.Linear:
        case types_1.ProjectManagementTool.GitHub:
        case types_1.ProjectManagementTool.Jira:
            return "".concat(options.addArticlePrefix ? 'an ' : '', "issue").concat(sIfPlural);
        default:
            return '';
    }
}
exports.pmToolToIssueName = pmToolToIssueName;
function getIntegrationIconUrl(webAppRootUrl, tool, themeMode) {
    switch (tool) {
        case types_1.ProjectManagementTool.Linear:
            return "".concat(webAppRootUrl, "/linear/logo.svg");
        case types_1.ProjectManagementTool.AzureDevOps:
            return "".concat(webAppRootUrl, "/azure-devops/logo.svg");
        case types_1.ProjectManagementTool.Asana:
            return "".concat(webAppRootUrl, "/asana/logo.svg");
        case types_1.ProjectManagementTool.GitHub:
            return "".concat(webAppRootUrl, "/github/logo").concat(themeMode === 'dark' ? '-white' : '', ".svg");
        case types_1.ProjectManagementTool.Jira:
            return "".concat(webAppRootUrl, "/jira-software/logo.svg");
        default:
            return '';
    }
}
exports.getIntegrationIconUrl = getIntegrationIconUrl;
