/** @jsxImportSource @emotion/react */
import { ProjectManagementTool } from './types'

export function assertNever(x: never, message?: string): never {
  throw new Error(`${message || 'Unexpected object'}: ${x}`)
}

// serialise object (dates to strings)
export type Serialized<T> = {
  [P in keyof T]: IsUnion<T[P]> extends true
    ? Date extends T[P]
      ? string | null
      : Serialized<T[P]>
    : Date extends T[P]
    ? string
    : Serialized<T[P]>
}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

export type NullableFields<T> = {
  [P in keyof T]: NullableFields<T[P]> | null
}

export function pmToolToHumanReadable(
  tool: ProjectManagementTool,
  options?: { addArticlePrefix: boolean } // addArticle: true will prefix 'an'/'a' to the tool name
): string {
  const addArticle = Boolean(options?.addArticlePrefix)

  switch (tool) {
    case ProjectManagementTool.Linear:
      return addArticle ? 'a Linear' : 'Linear'
    case ProjectManagementTool.AzureDevOps:
      return addArticle ? 'an Azure DevOps' : 'Azure DevOps'
    case ProjectManagementTool.Asana:
      return addArticle ? 'an Asana' : 'Asana'
    case ProjectManagementTool.GitHub:
      return addArticle ? 'a GitHub' : 'GitHub'
    case ProjectManagementTool.Jira:
      return addArticle ? 'a Jira' : 'Jira'
    default:
      return ''
  }
}

export function pmToolToIssueName(
  tool: ProjectManagementTool,
  options: { plural?: boolean; addArticlePrefix?: boolean } = {
    plural: false,
    addArticlePrefix: false,
  }
): string {
  const sIfPlural = options.plural ? 's' : ''

  switch (tool) {
    case ProjectManagementTool.AzureDevOps:
      return `${options.addArticlePrefix ? 'a ' : ''}work item${sIfPlural}`

    case ProjectManagementTool.Asana:
      return `${options.addArticlePrefix ? 'a ' : ''}task${sIfPlural}`

    case ProjectManagementTool.Linear:
    case ProjectManagementTool.GitHub:
    case ProjectManagementTool.Jira:
      return `${options.addArticlePrefix ? 'an ' : ''}issue${sIfPlural}`

    default:
      return ''
  }
}

export function getIntegrationIconUrl(
  webAppRootUrl: string,
  tool: ProjectManagementTool,
  themeMode: 'light' | 'dark'
): string {
  switch (tool) {
    case ProjectManagementTool.Linear:
      return `${webAppRootUrl}/linear/logo.svg`

    case ProjectManagementTool.AzureDevOps:
      return `${webAppRootUrl}/azure-devops/logo.svg`

    case ProjectManagementTool.Asana:
      return `${webAppRootUrl}/asana/logo.svg`

    case ProjectManagementTool.GitHub:
      return `${webAppRootUrl}/github/logo${themeMode === 'dark' ? '-white' : ''}.svg`

    case ProjectManagementTool.Jira:
      return `${webAppRootUrl}/jira-software/logo.svg`

    default:
      return ''
  }
}
