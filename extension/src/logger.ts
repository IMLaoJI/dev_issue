import { omit } from 'lodash/fp'
// import logz from 'logzio-nodejs'

import ENV from './environment'
// import { IMetadata, metadataProvider } from './helpers'
import { rollbar } from './rollbar'
import { LogLevel } from './shared/types'
import { type } from 'os'

declare interface IMetadata  {
}
declare const metadataProvider :any
declare const logz :any

namespace logz{
   export interface ILoggerOptions  {

   }
  export interface ILogzioLogger {
    log(data:any): void
  }
}

export type ErrorAugmentedForLogz = {
  name: string
  message: string
  stack?: string

  // statusCode will exist in request errors
  statusCode?: number

  [key: string]: any
}

interface DataToLog extends IMetadata {
  level: LogLevel
  message: string
  type: 'react' | 'nodejs'
  project: 'podrick'
  metadata?: object
  error?: ErrorAugmentedForLogz
  source: 'podrick-vsc-extension' | 'podrick-vsc-webview'
}

export class Logger {
  private logger: logz.ILogzioLogger

  constructor() {
    this.logger = logz.createLogger(this.loggerConfig())
  }

  public log = () => ({
    info: this.loggerBase('info'),
    debug: this.loggerBase('debug'),
    warning: this.loggerBase('warning'),
    error: this.loggerBase<{ error?: Error; [key: string]: any } | Error >('error'),
  })

  private loggerBase = <T extends { [key: string]: any }>(level: LogLevel) => (
    message: string,
    metadata?: T,
    configOverrides?: { type?: 'react'; context?: IMetadata; source?: 'podrick-vsc-webview' }
  ) => {
    // Logging in metadataProvider will not contain context, so we pass it via configOverrides
    const context = configOverrides?.context || metadataProvider.getMetadata()

    // Logz doesn't handle full error objects so we have to augment the error first
    this.logToLogz({
      level,
      // metadataProvider.getMetadata() returns a Proxy as it's an observable. Spreading provides the actual values.
      message,
      ...context,
      error: this.extractErrorProperties(metadata),
      metadata: metadata instanceof Error ? undefined : omit('error', metadata),
      project: 'podrick',
      source: configOverrides?.source || 'podrick-vsc-extension',
      type: configOverrides?.type || 'nodejs',
    })
  }

  // Logz doesn't handle full error objects so we have to augment the error first
  private extractErrorProperties(metadataOrError?: Error | { error?: Error }) {
    const error = metadataOrError instanceof Error ? metadataOrError : metadataOrError?.error

    if (error) {
      return {
        // Have to access Error properties directly to use them. We spread to handle error logs from /api/log
        name: error.name,
        message: error.message,
        stack: error.stack,
        //@ts-ignore statusCode will exist in request errors
        statusCode: error.statusCode,
      }
    }
  }

  private logToLogz = (dataToLog: DataToLog) => {
    // Logging to a hosted service is expensive $$$
    if (ENV.extEnv === 'production' || ENV.extEnv === 'development') {
      try {
        this.logger.log(dataToLog)
        // console.log(dataToLog)
      } catch (err) {
        rollbar.error('Failed to send logs to Logz (try/catch)', err as Error)
      }
    }
  }

  private loggerConfig = (): logz.ILoggerOptions => ({
    token: ENV.logzKey,
    protocol: 'https',
    host: 'listener-uk.logz.io',
    port: '8071',
    callback: (err:Error) =>
      err ? rollbar.error('Failed to send logs to Logz (callback)', err) : undefined,
  })
}

const logger = new Logger()
export const log = logger.log()
