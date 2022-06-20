"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollbar = exports.RollbarReporter = void 0;
class RollbarReporter {
    constructor() {
    }
    error(source, error, extraArgs = {}, options = { ignoreNonStepsizeError: false }) {
        console.error('Rollbar error', source, error, extraArgs);
    }
}
exports.RollbarReporter = RollbarReporter;
const rollbar = new RollbarReporter();
exports.rollbar = rollbar;
//# sourceMappingURL=rollbar.js.map