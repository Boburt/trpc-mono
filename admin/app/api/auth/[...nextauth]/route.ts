import { trpcClient } from "@admin/utils/trpc-server";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs";
import { apiClient } from "@admin/utils/eden";

const authOptions: AuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const { login, password } = credentials;
          try {
            const { data: res, status } = await apiClient.api.users.login.post({
              login,
              password,
            });
            if (status == 200 && res && "accessToken" in res) {
              return {
                ...res.user,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                rights: res.permissions,
              };
            } else if (status == 401) {
              throw new Error(res?.message);
            } else {
              return null;
            }
          } catch (error) {
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
            /** @ts-ignore */
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
