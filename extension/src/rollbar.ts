export class RollbarReporter {
  
    constructor() {
    }
  
    public error(
      source: string,
      error: Omit<Error, 'message'> & { code?: string; statusCode?: number; message?: string },
      extraArgs: Object = {},
      options: { ignoreNonStepsizeError?: boolean } = { ignoreNonStepsizeError: false }
    ): void {
      console.error('Rollbar error', source, error, extraArgs)
    }
}
const rollbar = new RollbarReporter()
export { rollbar }