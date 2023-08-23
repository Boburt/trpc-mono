import { trpcClient } from "@admin/utils/trpc-server";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const { login, password } = credentials;
          const res = await trpcClient.users.login.mutate({ login, password });
          if (typeof res !== "undefined") {
            return {
              ...res.data,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              rights: res.rights,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        token = {
          ...token,
          ...user,
          // accessToken: user.accessToken,
          // refreshToken: user.refreshToken,
          // rights: user.rights,
          // token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token !== "undefined") {
        session = {
          ...session,
          ...token,
        };

        console.log("session", session);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
