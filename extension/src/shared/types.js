"use strict";
exports.__esModule = true;
exports.StepsizeErrorCodes = exports.Mode = exports.SupportedIntegration = exports.ProjectManagementTool = exports.NotificationType = exports.OrganisationInvitationSource = exports.MemberRoleType = exports.FormType = exports.EditorIntegration = exports.UpvoteSource = exports.CommentSource = exports.CommentStatus = exports.ESource = exports.OriginType = exports.CodeLocationStatus = exports.UserReportedDebtStatus = exports.CodeLocationType = exports.ItemStatus = exports.SeverityLevel = exports.QualityIssueType = exports.TechDebtType = void 0;
var TechDebtType;
(function (TechDebtType) {
    TechDebtType["Productivity"] = "Productivity";
    TechDebtType["Quality"] = "Bug";
    TechDebtType["Instance"] = "Instance";
    TechDebtType["Suggestion"] = "Suggestion";
})(TechDebtType = exports.TechDebtType || (exports.TechDebtType = {}));
var QualityIssueType;
(function (QualityIssueType) {
    QualityIssueType["Defect"] = "Defect";
    QualityIssueType["RuntimeError"] = "Runtime error";
    QualityIssueType["Outage"] = "Outage";
    QualityIssueType["PoorUX"] = "Poor UX";
    QualityIssueType["CodeStandards"] = "Code standards";
})(QualityIssueType = exports.QualityIssueType || (exports.QualityIssueType = {}));
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel["Low"] = "Low";
    SeverityLevel["Medium"] = "Medium";
    SeverityLevel["High"] = "High";
})(SeverityLevel = exports.SeverityLevel || (exports.SeverityLevel = {}));
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["Open"] = "Open";
    ItemStatus["Archived"] = "Archived";
    ItemStatus["Deleted"] = "Deleted";
})(ItemStatus = exports.ItemStatus || (exports.ItemStatus = {}));
var CodeLocationType;
(function (CodeLocationType) {
    CodeLocationType["Directory"] = "Directory";
    CodeLocationType["File"] = "File";
    CodeLocationType["FileWithLines"] = "FileWithLines";
})(CodeLocationType = exports.CodeLocationType || (exports.CodeLocationType = {}));
var UserReportedDebtStatus;
(function (UserReportedDebtStatus) {
    UserReportedDebtStatus["Open"] = "Open";
    UserReportedDebtStatus["Deleted"] = "Deleted";
})(UserReportedDebtStatus = exports.UserReportedDebtStatus || (exports.UserReportedDebtStatus = {}));
var CodeLocationStatus;
(function (CodeLocationStatus) {
    CodeLocationStatus["Open"] = "Open";
    CodeLocationStatus["Resolved"] = "Resolved";
    CodeLocationStatus["Deleted"] = "Deleted";
})(CodeLocationStatus = exports.CodeLocationStatus || (exports.CodeLocationStatus = {}));
var OriginType;
(function (OriginType) {
    OriginType["Issue"] = "Issue";
})(OriginType = exports.OriginType || (exports.OriginType = {}));
var ESource;
(function (ESource) {
    ESource["Slack"] = "slack";
    ESource["VSCode"] = "vscode";
    ESource["Jetbrains"] = "jetbrains";
    ESource["WebApp"] = "webapp";
    ESource["GitHub"] = "github";
    ESource["Bitbucket"] = "bitbucket";
    ESource["Todo"] = "todo";
})(ESource = exports.ESource || (exports.ESource = {}));
var CommentStatus;
(function (CommentStatus) {
    CommentStatus["Open"] = "Open";
    CommentStatus["Deleted"] = "Deleted";
})(CommentStatus = exports.CommentStatus || (exports.CommentStatus = {}));
var CommentSource;
(function (CommentSource) {
    CommentSource["Webapp"] = "webapp";
    CommentSource["Vscode"] = "vscode";
    CommentSource["Jetbrains"] = "jetbrains";
})(CommentSource = exports.CommentSource || (exports.CommentSource = {}));
var UpvoteSource;
(function (UpvoteSource) {
    UpvoteSource["Webapp"] = "webapp";
    UpvoteSource["Vscode"] = "vscode";
    UpvoteSource["Jetbrains"] = "jetbrains";
})(UpvoteSource = exports.UpvoteSource || (exports.UpvoteSource = {}));
var EditorIntegration;
(function (EditorIntegration) {
    EditorIntegration["VSCode"] = "VSCode";
    EditorIntegration["JetBrains"] = "JetBrains";
})(EditorIntegration = exports.EditorIntegration || (exports.EditorIntegration = {}));
var FormType;
(function (FormType) {
    FormType["NewIssueForm"] = "new-issue-form";
    FormType["FiltersForm"] = "issue-filters-form";
    FormType["LinkCodeForm"] = "link-code-form";
    FormType["TrackedCodeFiltersForm"] = "tracked-code-filters-form";
    FormType["AddToIssueTrackerForm"] = "add-to-issue-tracker-form";
})(FormType = exports.FormType || (exports.FormType = {}));
// based on Stripe.Checkout.Session.PaymentStatus
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["no_payment_required"] = "no_payment_required";
    PaymentStatus["paid"] = "paid";
    PaymentStatus["unpaid"] = "unpaid";
})(PaymentStatus || (PaymentStatus = {}));
var BillingCycle;
(function (BillingCycle) {
    BillingCycle["Monthly"] = "Monthly";
    BillingCycle["Yearly"] = "Yearly";
})(BillingCycle || (BillingCycle = {}));
// Organisation Membership Role - copied from tyrion
var MemberRoleType;
(function (MemberRoleType) {
    MemberRoleType["Member"] = "Member";
    MemberRoleType["Admin"] = "Admin";
})(MemberRoleType = exports.MemberRoleType || (exports.MemberRoleType = {}));
var OrganisationInvitationSource;
(function (OrganisationInvitationSource) {
    OrganisationInvitationSource["OrganisationPage"] = "organisation-page";
    OrganisationInvitationSource["EditorIssueCreation"] = "editor-issue-creation";
    OrganisationInvitationSource["EditorTutorial"] = "editor-tutorial";
})(OrganisationInvitationSource = exports.OrganisationInvitationSource || (exports.OrganisationInvitationSource = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["IssueMentionsYou"] = "issue.mentionsYou";
    NotificationType["IssueLinkedToYourCode"] = "issue.linkedToYourCode";
    NotificationType["CodeLinkedToYourIssue"] = "code.linkedToYourIssue";
    NotificationType["CodeLinkedToIssueYouParticipatedIn"] = "code.linkedToIssueYouParticipatedIn";
    NotificationType["CommentOnYourIssue"] = "comment.onYourIssue";
    NotificationType["CommentMentionsYou"] = "comment.mentionsYou";
    NotificationType["CommentInIssueYouParticipatedIn"] = "comment.inIssueYouParticipatedIn";
    NotificationType["UpvotedYourIssue"] = "upvote.yourIssue";
    NotificationType["UpvotedIssueYouParticipatedIn"] = "upvote.issueYouParticipatedIn";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var ProjectManagementTool;
(function (ProjectManagementTool) {
    ProjectManagementTool["Linear"] = "Linear";
    ProjectManagementTool["Asana"] = "Asana";
    ProjectManagementTool["Shortcut"] = "Shortcut";
    ProjectManagementTool["AzureDevOps"] = "AzureDevOps";
    ProjectManagementTool["GitHub"] = "GitHub";
    ProjectManagementTool["Jira"] = "Jira";
})(ProjectManagementTool = exports.ProjectManagementTool || (exports.ProjectManagementTool = {}));
var SupportedIntegration;
(function (SupportedIntegration) {
    SupportedIntegration["Jira"] = "jira";
    SupportedIntegration["Linear"] = "linear";
    SupportedIntegration["Asana"] = "asana";
    SupportedIntegration["AzureDevOps"] = "azure-devops";
    SupportedIntegration["Github"] = "github";
})(SupportedIntegration = exports.SupportedIntegration || (exports.SupportedIntegration = {}));
var Mode;
(function (Mode) {
    Mode["Add"] = "Add";
    Mode["Link"] = "Link";
})(Mode = exports.Mode || (exports.Mode = {}));
//* This exists in Tyrion too — lib/error-handling/ErrorCodes.ts
var StepsizeErrorCodes;
(function (StepsizeErrorCodes) {
    // Item Errors
    StepsizeErrorCodes["InvalidItem"] = "invalid-item";
    StepsizeErrorCodes["ItemNotFound"] = "item-not-found";
    // Stepsize access errors
    StepsizeErrorCodes["NoAccessToStepsize"] = "no-access-to-stepsize";
    // Jira Errors
    StepsizeErrorCodes["JiraUserApiAuthentication"] = "jira-api-authentication-error";
    StepsizeErrorCodes["JiraIssueNotFound"] = "jira-issue-not-found";
    // Item merge Errors
    StepsizeErrorCodes["FailedToMergeItemAttribute"] = "failed-to-merge-item-attribute";
})(StepsizeErrorCodes = exports.StepsizeErrorCodes || (exports.StepsizeErrorCodes = {}));
