"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_transporter_1 = __importDefault(require("./mail-transporter"));
const config_1 = require("../config");
const { FORGOT_PASSWORD_URL } = config_1.config;
const forgetPasswordEmail = (email, username, token) => {
    const data = {
        to: email,
        from: "fisayo@hux.vc",
        subject: `Reset Password`,
        html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kindly Reset Your Email </title>
      <style>
        body {
          background-color: #f0f5f9;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }

        .email-container {
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          margin: 20px;
          padding: 20px;
        }

        .email-header {
          background-color: #647dee;
          color: #fff;
          text-align: center;
          padding: 10px;
          border-radius: 10px 10px 0 0;
        }

        .email-content {
          padding: 20px;
        }

        p {
          color: #333;
        }

        strong {
          color: #647dee;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h2>The link expires in 20 minutes!</h2>
        </div>
        <div class="email-content">
          <p><strong>Hello, ${username}</p>
          <p> Click on this <a href="${FORGOT_PASSWORD_URL}/change-password/${token}">link </a>to reset your password</p>
        </div>
      </div>
    </body>
    </html> `,
    };
    return data;
};
const sendForgetPasswordEmail = (email, username, token, host) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mail_transporter_1.default.sendMail(forgetPasswordEmail(email, username, token));
});
exports.default = sendForgetPasswordEmail;
