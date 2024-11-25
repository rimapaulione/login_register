import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return;

        try {
          const response = await fetch(
            `http://localhost:8080/api/auth/authentication`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(validatedFields.data),
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
          console.log(`authorize ${user.email}`);
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        const response = await fetch(`http://localhost:8080/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user.email),
        });
        if (!response.ok) return false;
        const createdUser = await response.json();

        if (createdUser.verified) return true;
      }
      return false;
    },
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
      if (token.firstname && session.user) {
        session.user.name = token.firstname;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
  },
});
