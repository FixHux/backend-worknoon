"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
        this.message = message;
        this.status = 409;
    }
}
exports.default = ConflictError;
