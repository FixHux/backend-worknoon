"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res
            .status(401)
            .send({ message: 'Access denied. No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token.split(' ')[1], config_1.config.JWT);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};
exports.auth = auth;
