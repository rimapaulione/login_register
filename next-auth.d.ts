import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "ADMIN";
  }
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { role: "ADMIN" | "USER" };
  }
}
