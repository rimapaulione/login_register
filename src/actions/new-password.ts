"use server";

import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token?: String | null
) {
  if (!token) return { error: "Missing token!" };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const password = validatedFields.data;

  try {
    console.log(validatedFields.data);
    const test = { password: password.password, token: token };

    const response = await fetch(`http://localhost:8080/api/reset/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const user = await response.json();

    return { success: "Password changed!" };
  } catch (error: any) {
    return { error: error.message };
  }
}
