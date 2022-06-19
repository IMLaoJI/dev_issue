"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegrationIconUrl = exports.pmToolToIssueName = exports.pmToolToHumanReadable = exports.assertNever = void 0;
/** @jsxImportSource @emotion/react */
const types_1 = require("./types");
function assertNever(x, message) {
    throw new Error(`${message || 'Unexpected object'}: ${x}`);
}
exports.assertNever = assertNever;
function pmToolToHumanReadable(tool, options // addArticle: true will prefix 'an'/'a' to the tool name
) {
    const addArticle = Boolean(options?.addArticlePrefix);
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
function pmToolToIssueName(tool, options = {
    plural: false,
    addArticlePrefix: false,
}) {
    const sIfPlural = options.plural ? 's' : '';
    switch (tool) {
        case types_1.ProjectManagementTool.AzureDevOps:
            return `${options.addArticlePrefix ? 'a ' : ''}work item${sIfPlural}`;
        case types_1.ProjectManagementTool.Asana:
            return `${options.addArticlePrefix ? 'a ' : ''}task${sIfPlural}`;
        case types_1.ProjectManagementTool.Linear:
        case types_1.ProjectManagementTool.GitHub:
        case types_1.ProjectManagementTool.Jira:
            return `${options.addArticlePrefix ? 'an ' : ''}issue${sIfPlural}`;
        default:
            return '';
    }
}
exports.pmToolToIssueName = pmToolToIssueName;
function getIntegrationIconUrl(webAppRootUrl, tool, themeMode) {
    switch (tool) {
        case types_1.ProjectManagementTool.Linear:
            return `${webAppRootUrl}/linear/logo.svg`;
        case types_1.ProjectManagementTool.AzureDevOps:
            return `${webAppRootUrl}/azure-devops/logo.svg`;
        case types_1.ProjectManagementTool.Asana:
            return `${webAppRootUrl}/asana/logo.svg`;
        case types_1.ProjectManagementTool.GitHub:
            return `${webAppRootUrl}/github/logo${themeMode === 'dark' ? '-white' : ''}.svg`;
        case types_1.ProjectManagementTool.Jira:
            return `${webAppRootUrl}/jira-software/logo.svg`;
        default:
            return '';
    }
}
exports.getIntegrationIconUrl = getIntegrationIconUrl;
//# sourceMappingURL=utils.js.map