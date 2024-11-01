"use server";

import { RegisterSchema } from "../schemas";
import { z } from "zod";

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

    const result = await response.json();
    return { success: "Registration successful", data: result };
  } catch (error: any) {
    return { error: error.message };
  }
}
