"use server";

import { auth, signOut } from "@/auth";
export async function logout() {
  const session = await auth();
  const token = session?.user.token;
  try {
    const response = await fetch(`http://localhost:8080/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
  } catch (error) {}

  await signOut({ redirectTo: "/login" });
}
