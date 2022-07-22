import * as leasot from 'leasot'
import { Merge } from 'type-fest'
// import { IssuesGetResponseData } from '@octokit/types'


import {
  PartialLinearIssue,
  ExternalIssueField,
  ItemCreationExternalFields,
  ExternalFieldsWithoutValue,
  ExternalFields,
} from '@stepsize/shared-types'
import { Api as NotificationApi } from '@stepsize/shared-types/api/notification/list'
import {
  ExternalIssueAttributes,
  ExternalIssueLinkAttributes,
  JiraTenantAttributes,
} from '@stepsize/shared-types/entities'
import { Api as IssueApi } from '@stepsize/shared-types/api/[organisationSlug]/item'
// @ts-ignore
import { Serialized } from './utils'

// Webview state
export interface PassedInWebviewState {
  webviewType: 'side-panel' | 'full-panel'
  hostName: 'vscode' | 'jetbrains'
  editorName?: string
  error?: { message: string; timestamp: string }
  message: undefined | string
  loader: undefined | true
  token: string | null
  apiRootUrl: string
  webAppRootUrl: string
  isAuthed: boolean
  view?: View
  webviewStorageData: WebviewStorage['data']
  organisationSlug: string | null
  organisationExtBackend: boolean | null
  bookmarks?: Bookmark[]
  stagedCodeLocation: CodeLocationData | null
  newIssueFormData?: NewIssueFormData
  onboardingState?: OnboardingState
  linkCodeFormData?: LinkCodeFormData
  filtersState: FiltersState
  tutorialState: TutorialState
  createdIssue?: boolean
  shouldShowCreateFirstIssueForm?: boolean
  activeIssueId: string | null
  userId: string | null
  userPicture: string | null
  userName: string | null
  currentRepoName: string | null
  reposAmount: number
  commentDraftState: CommentDraftState
  inviteCollaboratorsByDefault: boolean
  trackedCodeFiltersState: TrackedCodeFiltersState
  panel: PanelWebviewState
  todos: TodoComment[] | undefined
  todosListIsCapped: boolean
  isExtractingTodos: boolean
  isFilteringTodos: boolean
  todosError: TodosError | null
  jiraOauthClientId: string
  jiraOauthRedirectUri: string
}

export interface PanelWebviewState {
  id?: string // optional because the sidebar webview won't have it
  view?: PanelView // optional because the sidebar webview won't have it
  codebaseTree?: {
    metadata: TreeProjectMetadata | null
    error: Error | null
  }
}

export type WebviewStorageKeys =
  | 'panesSizesInPercentage'
  | 'treeViewExpandedState'
  | 'trackedCodeView'
  | 'codeSectionScrollValue'
  | 'fullPanelFiltersState'
  | 'issueTrackerFormState'
  | 'issueSingleFormState'
  | 'sharedFiltersState'

export type WebviewStorage = {
  data: { [key in WebviewStorageKeys]?: string }
  set: (key: WebviewStorageKeys, value: any, refreshData?: boolean) => void
}

export interface IssueSingleFormState {
  [issueId: string]: {
    title: {
      currentInputValue: string
      editMode: boolean
    }
    body: {
      currentInputValue: string
      editMode: boolean
    }
  }
}

export interface CommentDraftState {
  content: string | null
}

export enum TechDebtType {
  Productivity = 'Productivity',
  Quality = 'Bug',
  Instance = 'Instance',
  Suggestion = 'Suggestion',
}

export enum QualityIssueType {
  Defect = 'Defect',
  RuntimeError = 'Runtime error',
  Outage = 'Outage',
  PoorUX = 'Poor UX',
  CodeStandards = 'Code standards',
}

export enum SeverityLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum ItemStatus {
  Open = 'Open',
  Archived = 'Archived',
  Deleted = 'Deleted',
}

export enum CodeLocationType {
  Directory = 'Directory',
  File = 'File',
  FileWithLines = 'FileWithLines',
}

export enum UserReportedDebtStatus {
  Open = 'Open',
  Deleted = 'Deleted',
}

export enum CodeLocationStatus {
  Open = 'Open',
  Resolved = 'Resolved',
  Deleted = 'Deleted',
}

export enum OriginType {
  Issue = 'Issue',
}

export enum ESource {
  Slack = 'slack',
  VSCode = 'vscode',
  Jetbrains = 'jetbrains',
  WebApp = 'webapp',
  GitHub = 'github',
  Bitbucket = 'bitbucket',
  Todo = 'todo',
}

export interface RepoData {
  repoUrl: string
  repoName: string
  repoSource: string
}

export type IssueSource =
  | 'explorer'
  | 'editor'
  | 'panel'
  | 'palette'
  | 'issue-single'
  | 'code-actions'
  | 'code-section-todo'
  | 'kanban-board'
export type BookmarkSource = 'explorer' | 'editor' | 'palette' | 'code-actions'
export type LinkCodeSource = 'explorer' | 'editor' | 'issue-single'

export interface NewIssueFormData {
  formState: NewIssueFormState | undefined
  source: IssueSource
}

export interface LinkCodeFormData {
  formState: LinkCodeFormState | undefined
  source: LinkCodeSource
}

interface BaseCodeLocationData {
  relFilePath: string
  lineStart: number | null
  lineEnd: number | null
  commitHash: string
  codeHostingUrl: string
  repoName: string
}

export interface CodeAuthor {
  name: string
  email: string
}

export interface CodeLocationData extends BaseCodeLocationData {
  originalCodeLocation: BaseCodeLocationData
  submittedOnLocalChanges: boolean
  submittedWithIssue: boolean
  status: CodeLocationStatus
  type: CodeLocationType
  resolvedAt: Date | null
  resolver: UserAttributesSubset | null
  codeAuthors: Array<CodeAuthor>
}

interface Meta {
  type: OriginType
  author: UserAttributesSubset
  createdAt: string
  pathRoot?: string
  name?: string
  submittedOnLocalChanges?: boolean
  description?: string
  reportCount?: number
  reportId?: string
  resolver: UserAttributesSubset | null
  resolvedAt: string | null
}

export interface ExtendedCodeLocationData extends CodeLocationData {
  resolved?: boolean
  meta?: Meta
}

export interface CodeLocationAttributes extends ExtendedCodeLocationData {
  id: string
}

// TODO: replace these with shared-types

export interface OrganisationData {
  id: string
  slug: string
  extBackend: boolean
}

export interface OrganisationAttributesSubset extends OrganisationData {
  name: string
  planStatuses: Serialized<PlanStatusAttributes>[]
  jiraTenant: Serialized<JiraTenantAttributes>
}

export interface TeamAttributesSubset {
  id: string
  slug: string
  name: string
  organisation: OrganisationAttributesSubset
  items?: ItemAttributesSubset[]
  itemTags: ItemTagAttributesSubset[]
}

export type TeamAttributesSubsetSerialized = Serialized<TeamAttributesSubset>

export interface ItemAttributesSubset {
  id: string
  createdAt: Date
  title: string
  body: string
  status: ItemStatus
  author: UserAttributesSubset
  tags: ItemTagAttributesSubset[]
  teams: TeamAttributesSubset[]
  priority: number | null
  effort: number | null
  upvotes: UpvoteAttributesSubset[]
  userReportedDebts: UserReportedDebtAttributesSubset[]
  resolver: UserAttributesSubset | null
  resolveComment: string | null
  comments: CommentAttributesSubset[]
  externalIssueLinks: Merge<
    ExternalIssueLinkAttributes,
    { externalIssue: ExternalIssueAttributes }
  >[]
  mergeTargetItemId: string | null
  // TODO: add shared-types for pages/api/item/index.ts and use it
  externalPriority: ExternalIssueField | null
  externalEffort: ExternalIssueField | null
  externalLabels: ExternalIssueField | null
  externalStatus: ExternalIssueField | null
}

export enum CommentStatus {
  Open = 'Open',
  Deleted = 'Deleted',
}

export enum CommentSource {
  Webapp = 'webapp',
  Vscode = 'vscode',
  Jetbrains = 'jetbrains',
}

export interface CommentAttributesSubset {
  id: string
  createdAt: Date
  body: string
  status: CommentStatus
  source: CommentSource
  deletedAt: Date | null
  editedAt: Date | null
  intId: number // We use this to generate comment urls

  authorId: string
  author: UserAttributesSubset

  itemId: string
  item: ItemAttributesSubset
}

export type ItemAttributesSubsetSerialized = Serialized<ItemAttributesSubset>
export interface ItemTagAttributesSubset {
  id: string
  title: string
  color: string
  teamId: string
}

export interface ItemTagAttributes {
  id: string
  title: string
  color: string
}

export type ItemAttributesSerialized = Serialized<ItemAttributesSubset>

export interface UserReportedDebtAttributesSubset {
  id: string
  createdAt: Date
  description: string | null
  githubCommentUrl: string | null
  source: ESource
  sourceDisplayName: string
  status: UserReportedDebtStatus
  author: UserAttributesSubset
  qualityIssue: QualityIssueAttributesSubset | null
  timeLost: ProductivityIssueAttributesSubset | null
  suggestion: SuggestionAttributesSubset | null
  codeLocations: CodeLocationData[]
  item: ItemAttributesSubset | null
}

export interface QualityIssueAttributesSubset {
  severity: SeverityLevel
  issueType: QualityIssueType
}

export interface ProductivityIssueAttributesSubset {
  hourCost: number
}

export interface SuggestionAttributesSubset {
  body: string | null
}

export type ItemMetadata = { itemId: string; reportCount: number }

export interface DebtAwarenessData {
  codeLocation: CodeLocationData
  item?: ItemAttributesSubset
  report?: UserReportedDebtAttributesSubset
  itemsMetadata: ItemMetadata[]
}

export type DebtAwarenessDataSerialized = Serialized<DebtAwarenessData>

export interface DebtAwarenessDataWithNewLocations extends DebtAwarenessData {
  newCodeLocation: {
    lineStart: number | null
    lineEnd: number | null
  }
  commitNotFound: boolean
}

export interface CodeRangeData {
  lineStart: number
  lineEnd: number
  items: ItemAttributesSubset[]
  itemsMetadata: ItemMetadata[]
  commitNotFound: boolean
}

export interface UserAttributesSubset {
  id: string
  name: string
  email: string | null
  picture: string
}

export enum UpvoteSource {
  Webapp = 'webapp',
  Vscode = 'vscode',
  Jetbrains = 'jetbrains',
}

export interface UpvoteAttributesSubset {
  id: string
  issueId: string
  userId: string
  source: UpvoteSource
  user: UserAttributesSubset | undefined
}

export interface LinkCodeFormState {
  activeCodeLocation: CodeLocationData | null
}

export interface NewIssueFormState {
  title?: string
  body?: string
  teamsIds?: string[]
  tagsIds?: string[]
  labelsIds?: string[]
  selectedBookmarksIds?: string[]
  selectedActiveCodeLocationsUrls?: string[]
  activeCodeLocations?: CodeLocationData[]
  collaborators?: Record<string, boolean>
  priority?: ExternalIssueField['value'] | null
  effort?: ExternalIssueField['value'] | null
  fixVersions?: ExternalIssueField['value'] | null
  otherExternalFields?: { [key: string]: ExternalIssueField['value'] } | null
}

export enum EditorIntegration {
  VSCode = 'VSCode',
  JetBrains = 'JetBrains',
}

export enum FormType {
  NewIssueForm = 'new-issue-form',
  FiltersForm = 'issue-filters-form',
  LinkCodeForm = 'link-code-form',
  TrackedCodeFiltersForm = 'tracked-code-filters-form',
  AddToIssueTrackerForm = 'add-to-issue-tracker-form',
}

export interface ShowFormAdditionalData {
  issueIdToRedirectOnSuccess?: string
}

export type View =
  | 'loading'
  | 'try-stepsize'
  | 'create-first-issue'
  | 'panes'
  | FormType
  | 'issue-single'
  | 'notifications'

export type PanelView = 'codebase' | 'board'

export interface Bookmark {
  id: string
  createdAt: string
  repoData: RepoData
  codeLocationData: CodeLocationData
  code: string | null
}

export type UpdateReactState = (
  state?: Partial<PassedInWebviewState>,
  options?: { mergeStates?: boolean }
) => Promise<void>

export interface OnboardingState {
  tourId?: string
  startedAt?: string
  step?: number
}

export type LogLevel = 'error' | 'info' | 'debug' | 'warning'

export type SortOption = 'priority' | 'effort' | 'upvotes' | 'createdAt'

export interface FiltersState {
  showResolved?: boolean
  sortBy: SortOption
}

export interface TrackedCodeFiltersState {
  showTODOs: boolean
  typesOfTODOs: FilteredTODOsType
}

export interface SharedFiltersState {
  teamId?: string
  labelsIds?: string[]
  tagsIds?: string[]
}

export type FilteredTODOsType = 'all' | 'my' | 'near-my-contributions'

export type TodosError = { message: string; cta: string; docsPath: string }

export type ReactSelectOption<Value = string> = { label: string; value: Value; key?: string }

/*
  copied over from tyrion
*/

interface PlanStatusAttributes {
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  isActive: boolean
  isTrial: boolean
  trialEndDate: Date | null
  deactivatedAt: Date | null
  organisationId: string
  organisation: OrganisationAttributesSubset
  stripeCheckoutSession: CheckoutSessionAttributes
  planId: string
  plan: PlanAttributes
}

// based on Stripe.Checkout.Session.PaymentStatus
enum PaymentStatus {
  no_payment_required = 'no_payment_required',
  paid = 'paid',
  unpaid = 'unpaid',
}

interface CheckoutSessionAttributes {
  sessionId: string // cs_test_a1anuPB5YN5ZoFSC6Ld7EtYDTMXbMUEuPMBDcEsD4lSrLpxEW68A8LHRXo
  fullObject: object
  statusOnSuccess: PaymentStatus | null
  planId: string
  plan: PlanAttributes
  userId: string | null
  user: UserAttributesSubset
  organisationId: string
  organisation: OrganisationAttributesSubset
  planStatusId: string | null
  planStatus: PlanStatusAttributes
}

enum BillingCycle {
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

interface PlanAttributes {
  name: string
  description: string
  planPermissions: number
  billingCycle: BillingCycle | null
  monthlyPrice: number
  isCustom: boolean
  priceStripeId: string | null
  productStripeId: string | null
  checkoutSessions: CheckoutSessionAttributes[]
  planStatuses: PlanStatusAttributes[]
}

interface PlansState {
  currentPlanStatus: Serialized<PlanStatusAttributes>
  isOnFreePlan: boolean
  eligibleForTrial: boolean
  reachedUnresolvedIssuesLimit: boolean
}

export interface PricingEditorsData {
  plansState: PlansState | undefined
  trialHasExpired: boolean
  messages: {
    trialEligible: string
    trialEligibleSecondary: string
    trialIneligible: string
    trialIneligibleSecondary: string
    trialExpired: string
  }
}

export interface TutorialStep {
  stepIndex: number
  isComplete: boolean
  progress: number
  total: number
  completionTransitionShown: boolean
}

// 5 for backwards compatibility - gen 1 of the tutorial had 5 steps
export type StepIndex = null | 1 | 2 | 3 | 4 | 5 // null if the tutorial is not started yet, or is finished

export interface TutorialState {
  hidden: boolean
  completed: boolean
  currentStepIndex: StepIndex
  currentStepProgress: number // 2 issues - values 0, 1, 2; inline annotations - values 0, 1; etc.
  loading: boolean
  generation: 1 | 2 // increment when updating the onboarding content
  gitData: {
    recentFilesCap: number
    recentFilesLog: string | null
    collaboratorsCap: number
    collaboratorsLog: string | null
    currentUserName: string | null
    currentUserEmail: string | null
  }
  invites: { sent: string[]; ignored: string[] }
}

export interface Step {
  index: number
  title: string
  description: React.ReactNode
  suggestions: React.ReactNode
  totalProgress: number
  finishStepFromTheWebview: boolean
}

// Organisation Membership Role - copied from tyrion
export enum MemberRoleType {
  Member = 'Member',
  Admin = 'Admin',
}

/*
  Data from the auth endpoint
*/

export interface UserData {
  id: string
  createdAt: Date
  name: string
  picture: string
  editorTutorialFinished: boolean
  editorTutorialCurrentStep: StepIndex
  pendingRedirectToIssueId: string | null
  // TODO update shared-types
  jiraIdentity: { jiraAccountId: string } | null
}

export enum OrganisationInvitationSource {
  OrganisationPage = 'organisation-page',
  EditorIssueCreation = 'editor-issue-creation',
  EditorTutorial = 'editor-tutorial',
}

export enum NotificationType {
  IssueMentionsYou = 'issue.mentionsYou',
  IssueLinkedToYourCode = 'issue.linkedToYourCode',

  CodeLinkedToYourIssue = 'code.linkedToYourIssue',
  CodeLinkedToIssueYouParticipatedIn = 'code.linkedToIssueYouParticipatedIn',

  CommentOnYourIssue = 'comment.onYourIssue',
  CommentMentionsYou = 'comment.mentionsYou',
  CommentInIssueYouParticipatedIn = 'comment.inIssueYouParticipatedIn',

  UpvotedYourIssue = 'upvote.yourIssue',
  UpvotedIssueYouParticipatedIn = 'upvote.issueYouParticipatedIn',
}

export type NotificationListResponse = NotificationApi['Response']['GET']

export interface FileData {
  name: string // fileName.png
  mimetype: string // image/png
  size: number // in bytes
  dataUrl: string // data:text/html;base64,CgoKCgoKPCFET0NUWVB... > long base64 string
}

export interface TreeFileMetadata {
  relPath: string
  size: number
}

export interface TreeProjectMetadata {
  project: string
  files: Array<TreeFileMetadata>
}

export type TodoComment = ReturnType<typeof leasot.parse>[0] & {
  fullPath: string
  dirPath?: string
  codeAuthorEmail?: string
  codeAuthorsEmailsInFile?: string[]
}

export enum ProjectManagementTool {
  Linear = 'Linear',
  Asana = 'Asana',
  Shortcut = 'Shortcut',
  AzureDevOps = 'AzureDevOps',
  GitHub = 'GitHub',
  Jira = 'Jira',
}

export enum SupportedIntegration {
  Jira = 'jira',
  Linear = 'linear',
  Asana = 'asana',
  AzureDevOps = 'azure-devops',
  Github = 'github',
}

export enum Mode {
  Add = 'Add',
  Link = 'Link',
}

export interface JiraApiJiraIssue {
  id: string
  key: string
  fields: {
    summary: string
    project: {
      id: string
    }
    issuetype: {
      id: string
    }
  }
}

export interface AzureFormOptions {
  projects: Array<{
    name: string
    id: string
  }>
  workItemTypes: Array<{ id: string; name: string; projectId: string }>
}

export interface AzureSearchResult {
  projectId: string
  workItem: {
    id: number
    title: string
    url: string
    workItemType: string
  }
}

export interface JiraSearchResults {
  issues: JiraApiJiraIssue[] | undefined
}

export interface GitHubApiGitHubIssue { }

export type GitHubSearchResults = GitHubApiGitHubIssue[]

export type LinearSearchResults = PartialLinearIssue[]

// new MVP

/*

possible setups for the priority field:
1. type: "select" (priority)
2. type: "select" (generic)
3. type: "text" with textType: "string"
4. type: "text" with textType: "number"

possible setups for the effort field:
1. type: "select" (priority)
2. type: "select" (generic)
3. type: "text" with textType: "string"
4. type: "text" with textType: "number"

fields for testing:
• for type: "select" (priority): `{ "key": "priority", "type": "select" }` - name: 'Priority'
• for type: "select" (generic): `{ "key": "customfield_10035", "type": "select" }` - name: 'Matt Custom Field'
• for type: "text" with textType: "string": `{ "key": "customfield_10036", "type": "text" }` - name: "Kamil's text field"
• for type: "text" with textType: "number": `{ "key": "customfield_10026", "type": "text" }` - name: 'Story Points'
*/

export type IssueData = IssueApi['RequestBody']['POST'] & {
  externalFields?: ItemCreationExternalFields
}

export type UserDataWithOrg = (UserData & { organisation: OrganisationAttributesSubset }) | null

//* This exists in Tyrion too — lib/error-handling/ErrorCodes.ts
export enum StepsizeErrorCodes {
  // Item Errors
  InvalidItem = 'invalid-item',
  ItemNotFound = 'item-not-found',

  // Stepsize access errors
  NoAccessToStepsize = 'no-access-to-stepsize',

  // Jira Errors
  JiraUserApiAuthentication = 'jira-api-authentication-error',
  JiraIssueNotFound = 'jira-issue-not-found',

  // Item merge Errors
  FailedToMergeItemAttribute = 'failed-to-merge-item-attribute',
}

export interface ExternalIssuesTeamConfig {
  teamId: string
  fields: ExternalFields
}
