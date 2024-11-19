"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export async function reset(values: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  try {
    const response = await fetch(`http://localhost:8080/api/reset/create`, {
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

    await sendPasswordResetEmail(user.email, user.passwordResetToken);

    return { success: "Reset email sent! " };
  } catch (error: any) {
    return { error: error.message };
  }
}
