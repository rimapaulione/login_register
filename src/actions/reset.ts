"use server";

import { ResetSchema } from "@/schemas";
import { error } from "console";
import { z } from "zod";

export async function reset(values: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  try {
    return { success: "Reset email was sent " };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
