"use server";

import { RegisterSchema } from "../schemas";
import { z } from "zod";
import { sendVerificationEmail } from "@/lib/mail";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  if (validatedFields.data.password !== validatedFields.data.confirmPassword)
    return { error: "Please check passwords" };

  try {
    const response = await fetch(`http://localhost:8080/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const user = await response.json();

    await sendVerificationEmail(user.email, user.verification);

    return { success: "Confirmation email sent!", data: user };
  } catch (error: any) {
    return { error: error.message };
  }
}
