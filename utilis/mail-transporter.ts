import nodemailer from 'nodemailer';

const myemail = process.env.SENDER_EMAIL as string;
const mypassword = process.env.GOGGLE_PASS_KEY as string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: myemail,
    pass: mypassword,
  },
});

export default transporter;
