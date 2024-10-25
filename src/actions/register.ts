"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";

export async function register(values: z.infer<typeof RegisterSchema>) {
  // await new Promise((resolve) => setTimeout(() => resolve("delay"), 2000));

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Your login is success" };
}
