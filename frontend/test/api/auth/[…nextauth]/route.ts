import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { trpc } from "@frontend/utils/trpc";

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
        return Promise.resolve({
          id: 1,
          name: "test",
          login: "test",
        });
        // if (typeof credentials !== "undefined") {
        //   const { mutateAsync: tryLogin } = trpc.users.login.useMutation({});

        //   const { login, password } = credentials;

        //   const res = await tryLogin({ login, password });
        //   console.log("res", res);
        //   if (typeof res !== "undefined") {
        //     return {
        //       ...res.data,
        //       accessToken: res.accessToken,
        //       refreshToken: res.refreshToken,
        //       rights: res.rights,
        //     };
        //   } else {
        //     return null;
        //   }
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
