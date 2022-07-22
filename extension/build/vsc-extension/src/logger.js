"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.Logger = void 0;
const fp_1 = require("lodash/fp");
// import logz from 'logzio-nodejs'
const environment_1 = require("./environment");
// import { IMetadata, metadataProvider } from './helpers'
const rollbar_1 = require("./rollbar");
const metadataProvider = {
    getMetadata: () => {
        return {};
    }
};
class Logger {
    constructor() {
        this.log = () => ({
            info: this.loggerBase('info'),
            debug: this.loggerBase('debug'),
            warning: this.loggerBase('warning'),
            error: this.loggerBase('error'),
        });
        this.loggerBase = (level) => (message, metadata, configOverrides) => {
            // Logging in metadataProvider will not contain context, so we pass it via configOverrides
            const context = configOverrides?.context || metadataProvider.getMetadata();
            // Logz doesn't handle full error objects so we have to augment the error first
            this.logToLogz({
                level,
                // metadataProvider.getMetadata() returns a Proxy as it's an observable. Spreading provides the actual values.
                message,
                ...context,
                error: this.extractErrorProperties(metadata),
                metadata: metadata instanceof Error ? undefined : (0, fp_1.omit)('error', metadata),
                project: 'podrick',
                source: configOverrides?.source || 'podrick-vsc-extension',
                type: configOverrides?.type || 'nodejs',
            });
        };
        this.logToLogz = (dataToLog) => {
            // Logging to a hosted service is expensive $$$
            if (environment_1.default.extEnv === 'production' || environment_1.default.extEnv === 'development') {
                try {
                    this.logger.log(dataToLog);
                    // console.log(dataToLog)
                }
                catch (err) {
                    rollbar_1.rollbar.error('Failed to send logs to Logz (try/catch)', err);
                }
            }
        };
        this.loggerConfig = () => ({
            token: environment_1.default.logzKey,
            protocol: 'https',
            host: 'listener-uk.logz.io',
            port: '8071',
            callback: (err) => err ? rollbar_1.rollbar.error('Failed to send logs to Logz (callback)', err) : undefined,
        });
        // this.logger = logz.createLogger(this.loggerConfig())
        this.logger = {
            log: (data) => {
                console.log("develop log:=====>", data);
            }
        };
    }
    // Logz doesn't handle full error objects so we have to augment the error first
    extractErrorProperties(metadataOrError) {
        const error = metadataOrError instanceof Error ? metadataOrError : metadataOrError?.error;
        if (error) {
            return {
                // Have to access Error properties directly to use them. We spread to handle error logs from /api/log
                name: error.name,
                message: error.message,
                stack: error.stack,
                //@ts-ignore statusCode will exist in request errors
                statusCode: error.statusCode,
            };
        }
    }
}
exports.Logger = Logger;
// TODO: dsdas
const logger = new Logger();
exports.log = logger.log();
//# sourceMappingURL=logger.js.map