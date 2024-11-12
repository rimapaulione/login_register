import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string | null,
  token: string | null
) {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "verification@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
}
