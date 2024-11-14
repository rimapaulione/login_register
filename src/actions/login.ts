"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { z } from "zod";
import { sendVerificationEmail } from "@/lib/mail";
import { getTokenAndEmail } from "@/lib/helper";

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
            const { email, verificationToken } = getTokenAndEmail(verification);
            if (verificationToken && email) {
              await sendVerificationEmail(email, verificationToken);
              return { success: "Confirmation email sent!" };
            }
            return { error: "Account verification required." };
          }
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
