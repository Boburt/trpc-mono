import { trpcClient } from "@frontend/utils/trpc-server";
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
        console.log("credentials", credentials);
        if (typeof credentials !== "undefined") {
          const { login, password } = credentials;
          const res = await trpcClient.users.login.mutate({ login, password });
          console.log("res", res);
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
