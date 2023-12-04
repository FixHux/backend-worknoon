"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnprocessableError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableError';
        this.message = message;
        this.status = 422;
    }
}
exports.default = UnprocessableError;
