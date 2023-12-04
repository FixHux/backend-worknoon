"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const { env } = process;
(0, dotenv_1.config)({
    path: path_1.default.resolve(__dirname, './.env'),
});
exports.config = {
    JWT: env.JWT_SECRET,
    REFRESH_JWT: env.REFRESH_JWT,
    PORT: parseInt(env.PORT, 10) || 8000,
    MONGODBURI: env.MONGODBURI,
    FORGOT_PASSWORD: env.FORGOT_PASSWORD
};
