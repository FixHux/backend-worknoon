import transporter from "./mail-transporter";
import { SentMessageInfo } from "nodemailer";

interface EmailData {
  to: string;
  from: string;
  subject: string;
  html: string;
}

const forgetPasswordEmail = (email: string, username: string, token: string, host: string): EmailData => {
  const data: EmailData = {
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
          <p> Click on this <a href="/${token}">link </a>to reset your password</p>
        </div>
      </div>
    </body>
    </html> `,
  };
  return data;
};

const sendForgetPasswordEmail = async (email: string, username: string, token: string, host: string): Promise<SentMessageInfo> => {
  return await transporter.sendMail(forgetPasswordEmail(email, username, token, host));
};

export default sendForgetPasswordEmail;
