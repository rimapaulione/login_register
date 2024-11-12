"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { z } from "zod";
import { sendVerificationEmail } from "@/lib/mail";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Your login is success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credencials!" };
        case "CallbackRouteError":
          const verification = error.cause?.err?.message;
          if (verification && verification.includes("Not verified")) {
            const uuidRegex =
              /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/;
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
            const uuidMatch = verification.match(uuidRegex);
            const verificationToken = uuidMatch ? uuidMatch[0] : null;
            const emailMatch = verification.match(emailRegex);
            const email = emailMatch ? emailMatch[0] : null;

            // SEND VERIFICATION EMAIL

            await sendVerificationEmail(email, verificationToken);

            return { success: "Confirmation email sent!" };
          }
          return { error: "Account verification required." };

        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
