"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const UserSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyAddress: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailToken: {
        type: String,
        required: false,
        default: '',
    },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });
UserSchema.methods.generateAuthToken = function generateToken() {
    const user = this;
    const expiresIn = 60 * 15; // 15 minutes in seconds
    const payload = {
        _id: user._id,
        firstname: user.firstname,
        code: user.code,
        email: user.email,
        isAdmin: user.isAdmin,
        exp: Math.floor(Date.now() / 1000) + expiresIn,
    };
    const token = jsonwebtoken_1.default.sign(payload, config_1.config.JWT);
    return token;
};
UserSchema.methods.generateRefreshToken = function generatedToken() {
    const user = this;
    const expiresIn = 60 * 60 * 24 * 7;
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
        firstname: user.firstname,
        email: user.email,
        isAdmin: user.isAdmin,
        exp: Math.floor(Date.now() / 1000) + expiresIn,
    }, config_1.config.REFRESH_JWT);
    return token;
};
exports.default = mongoose_1.default.model('User', UserSchema);
