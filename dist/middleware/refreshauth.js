"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const refreshAuth = (req, res, next) => {
    const refreshToken = req.cookies('refreshToken');
    if (!refreshToken) {
        return res
            .status(401)
            .send({ message: 'Access denied. No refreshToken provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.REFRESH_JWT);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send({ message: 'Invalid refreshToken.' });
    }
};
exports.refreshAuth = refreshAuth;
