import { LoginSchema } from "@/schemas";
import { z } from "zod";

export async function getAuthentication(values: z.infer<typeof LoginSchema>) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/authentication`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      if (response.status == 403) {
        return null;
      }
      if (response.status == 400) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function getVerifiedOnLogin(email: string) {
  const response = await fetch(`http://localhost:8080/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  if (!response.ok) return false;
  const createdUser = await response.json();

  if (createdUser.verified) return true;
  return false;
}
