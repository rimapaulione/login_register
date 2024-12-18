import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getAuthentication, getVerifiedOnLogin } from "./data/auth";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return;
        const result = await getAuthentication(validatedFields.data);
        return result;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        if (user.email) {
          const verified = await getVerifiedOnLogin(user.email);
          return verified;
        }
        return false;
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
      if (token.lastname && session.user) {
        session.user.lastname = token.lastname;
      }
      session.user.signOut = token.signOut || false;

      return session;
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          return { ...token, ...user };
        }

        if (!token.sub) return token;

        if (token.exp) {
          const now = Math.floor(Date.now() / 1000);

          if (token.exp < now) {
            token.signOut = true;
          }
        }

        const response = await fetch(
          "http://localhost:8080/api/users/user/id",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify({ id: token.sub }),
          }
        );

        if (!response.ok) {
          if (response.status == 401) {
            token.signOut = true;
            return token;
          } else {
            const errorData = await response.json();
            throw new Error(errorData || "Something went wrong");
          }
        }

        const existedUser = await response.json();
        token.token = existedUser.token;
        token.firstname = existedUser.firstname;
        token.lastname = existedUser.lastname;
        token.role = existedUser.role;
        console.log(token);

        return token;
      } catch (error: any) {
        console.log(error.message);
        return { error: error.message };
      }
    },
  },
});
