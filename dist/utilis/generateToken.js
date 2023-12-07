"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRandomString = (length, useNumChars = true) => {
    const numCharacters = '0123456789';
    const allCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto_1.default.randomInt(0, useNumChars ? numCharacters.length : allCharacters.length);
        randomString += useNumChars ? numCharacters.charAt(randomIndex) : allCharacters.charAt(randomIndex);
    }
    return randomString;
};
exports.generateRandomString = generateRandomString;
