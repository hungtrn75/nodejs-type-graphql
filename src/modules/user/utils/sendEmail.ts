import nodemailer from "nodemailer";
import * as types from "../constants/UserAction";
import { IMail } from "../../../types/IMail";

export async function sendEmail(email: string, url: string, type: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  let mailOptions: IMail;
  switch (type) {
    case types.CONFIRM_EMAIL:
      mailOptions = {
        to: email,
        from: '"Hung Tran 👻" <hungtrn79@gmail.com>',
        subject: "Confirm your email",
        text: `You are receiving this email because you (or someone else) have requested the confirm of the email for your account.\n\n`,
        html: `<a href="${url}">${url}</a>`
      };
      break;
    default:
      mailOptions = {
        to: email,
        from: '"Hung Tran 👻" <hungtrn79@gmail.com>',
        subject: "Reset your password",
        text: `You are receiving this email because you (or someone else) have requested the reset password for your account.\n\n`,
        html: `<a href="${url}">${url}</a>`
      };
  }
  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}
