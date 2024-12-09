"use server";

import { currentUser } from "@/lib/auth";
import { SettingsSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function settings(values: z.infer<typeof SettingsSchema>) {
  const validatedFields = SettingsSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name } = validatedFields.data;
  const { email, token } = await currentUser();

  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newFirstName: name, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "Something went wrong");
    }
    revalidatePath("/server");
    return { success: "Name changed!" };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
}
