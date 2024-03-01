/* import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
}; */
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.CURRENT_EMAIL_ORIGIN_PATH}/auth/new-verification?token=${token}`;

  /* await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  }); */

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
  };

  await transporter.sendMail({
    ...mailOptions,
    subject: "Confirm your email",
    text: "This is a link to confirm your email.",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const ResetLink = `${process.env.CURRENT_EMAIL_ORIGIN_PATH}/auth/new-password?token=${token}`;

  /* await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Reset your password",
    html: `<p>Click <a href="${ResetLink}">here</a> to reset your password.</p>`,
  }); */

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
  };

  await transporter.sendMail({
    ...mailOptions,
    subject: "Reset your password",
    text: "This is a link to reset your password.",
    html: `<p>Click <a href="${ResetLink}">here</a> to reset your password.</p>`,
  });
};

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your two factor token",
    text: `Your two factor token is: ${token}`,
  });
}
