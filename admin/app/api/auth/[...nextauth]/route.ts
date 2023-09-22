import { trpcClient } from "@admin/utils/trpc-server";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs";

const authOptions: AuthOptions = {
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
  session: { strategy: "jwt", maxAge: 2 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (token && token.exp) {
        const differenceInMinutes = dayjs
          .unix(token!.exp!)
          .diff(dayjs(), "minute");

        if (differenceInMinutes < 30) {
          const res = await trpcClient.users.refreshToken.mutate({
            refreshToken: token.refreshToken as string,
          });
          if (typeof res !== "undefined") {
            token = {
              ...token,
              ...res.data,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              rights: res.rights,
            };
          }
        }
      }
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
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
