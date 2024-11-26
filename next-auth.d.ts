import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "ADMIN";
    token?: string;
    firstname?: string;
  }
}

export type ExtendedUser = DefaultSession["user"] & { role: "ADMIN" | "USER" };

declare module "next-auth" {
  interface Session {
    user: ExtendedUserDefaultSession["user"] & { role: "ADMIN" | "USER" } & {
      token: string;
    } & { name: string };
  }
}
