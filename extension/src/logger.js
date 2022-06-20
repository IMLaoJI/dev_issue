"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.log = exports.Logger = void 0;
var fp_1 = require("lodash/fp");
// import logz from 'logzio-nodejs'
var environment_1 = require("./environment");
// import { IMetadata, metadataProvider } from './helpers'
var rollbar_1 = require("./rollbar");
var Logger = /** @class */ (function () {
    function Logger() {
        var _this = this;
        this.log = function () { return ({
            info: _this.loggerBase('info'),
            debug: _this.loggerBase('debug'),
            warning: _this.loggerBase('warning'),
            error: _this.loggerBase('error')
        }); };
        this.loggerBase = function (level) { return function (message, metadata, configOverrides) {
            // Logging in metadataProvider will not contain context, so we pass it via configOverrides
            var context = (configOverrides === null || configOverrides === void 0 ? void 0 : configOverrides.context) || metadataProvider.getMetadata();
            // Logz doesn't handle full error objects so we have to augment the error first
            _this.logToLogz(__assign(__assign({ level: level, 
                // metadataProvider.getMetadata() returns a Proxy as it's an observable. Spreading provides the actual values.
                message: message }, context), { error: _this.extractErrorProperties(metadata), metadata: metadata instanceof Error ? undefined : (0, fp_1.omit)('error', metadata), project: 'podrick', source: (configOverrides === null || configOverrides === void 0 ? void 0 : configOverrides.source) || 'podrick-vsc-extension', type: (configOverrides === null || configOverrides === void 0 ? void 0 : configOverrides.type) || 'nodejs' }));
        }; };
        this.logToLogz = function (dataToLog) {
            // Logging to a hosted service is expensive $$$
            if (environment_1["default"].extEnv === 'production' || environment_1["default"].extEnv === 'development') {
                try {
                    _this.logger.log(dataToLog);
                    // console.log(dataToLog)
                }
                catch (err) {
                    rollbar_1.rollbar.error('Failed to send logs to Logz (try/catch)', err);
                }
            }
        };
        this.loggerConfig = function () { return ({
            token: environment_1["default"].logzKey,
            protocol: 'https',
            host: 'listener-uk.logz.io',
            port: '8071',
            callback: function (err) {
                return err ? rollbar_1.rollbar.error('Failed to send logs to Logz (callback)', err) : undefined;
            }
        }); };
        this.logger = logz.createLogger(this.loggerConfig());
    }
    // Logz doesn't handle full error objects so we have to augment the error first
    Logger.prototype.extractErrorProperties = function (metadataOrError) {
        var error = metadataOrError instanceof Error ? metadataOrError : metadataOrError === null || metadataOrError === void 0 ? void 0 : metadataOrError.error;
        if (error) {
            return {
                // Have to access Error properties directly to use them. We spread to handle error logs from /api/log
                name: error.name,
                message: error.message,
                stack: error.stack,
                //@ts-ignore statusCode will exist in request errors
                statusCode: error.statusCode
            };
        }
    };
    return Logger;
}());
exports.Logger = Logger;
var logger = new Logger();
exports.log = logger.log();
