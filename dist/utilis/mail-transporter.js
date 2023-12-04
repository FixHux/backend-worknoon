"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const myemail = process.env.SENDER_EMAIL;
const mypassword = process.env.GOGGLE_PASS_KEY;
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: myemail,
        pass: mypassword,
    },
});
exports.default = transporter;
