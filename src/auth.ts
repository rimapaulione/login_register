import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return;

        const response = await fetch(`http://localhost:8080/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validatedFields.data),
        });
        if (!response.ok) {
          return null;
        }
        const user = await response.json();

        if (response.ok && user) {
          console.log(user);
          return user;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.token && session.user) {
        session.user.token = token.token;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      console.log(token);
      return token;
    },
  },
});
