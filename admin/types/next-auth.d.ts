import { Users } from "@backend/lib/zod";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends Users {
    user: Users;
    rights: string[];
    accessToken: string;
    refreshToken: string;
  }
}
