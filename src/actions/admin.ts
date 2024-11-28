"use server";

import { currentRole } from "@/lib/auth";
import { error } from "console";

export async function admin() {
  const role = await currentRole();

  if (role === "ADMIN") {
    return { success: "Allowed!" };
  }
  return { error: "Forbidden!" };
}
