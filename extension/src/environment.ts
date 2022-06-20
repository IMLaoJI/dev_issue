const dotenv = require('dotenv')
const fs = require('fs')

export type Environment = {
  nodeEnv: 'development' | 'production'
  extEnv: 'local' | 'development' | 'production'
  apiRootUrl: string
  rollbarKey: string
  ngrokApiUrl: string | undefined
  logzKey: string
  jiraOauthClientId: string
}

const environment: Environment =
  process.env.NODE_ENV === 'production'
    ? require('../build/vsc-extension/src/envs.js').default
    : require('./envs.js').default
console.log(environment, process.env.NODE_ENV);

// TODO: make this work in watch and build OR make dotenv/webpack work for us
if (process.env.NODE_ENV !== 'production' && environment.extEnv === 'local') {
  const filename = require.resolve('../../.env')

  const localEnvFile = fs.readFileSync(filename)
  const buf = Buffer.from(localEnvFile)
  const config = dotenv.parse(buf)

  environment.ngrokApiUrl = config.NGROK_API_URL
  environment.jiraOauthClientId = config.JIRA_OAUTH_CLIENT_ID
}
// TODO: m31232132

export default environment
