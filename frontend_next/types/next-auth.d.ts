import NextAuth, { DefaultSession } from "next-auth";
import { InferSelectModel } from "drizzle-orm";
import { users } from "@backend/../drizzle/schema";
import { DefaultJWT } from "@auth/core/jwt";
interface ExtendedUser extends InferSelectModel<typeof users> {
  accessToken: string;
  refreshToken: string;
  permissions: string[];
  role: {
    id: string;
    code: string;
  } | undefined;
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends ExtendedUser { }
  interface Session {
    user: User | AdapterUser;
    permissions: string[];
    accessToken: string;
    refreshToken: string;
    exp: number;
    iat: number;
    role: {
      id: string;
      code: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User extends ExtendedUser { }
  interface JWT {
    user: User | AdapterUser;
    permissions: string[];
    accessToken: string;
    refreshToken: string;
    role: {
      id: string;
      code: string;
    };
    sub: string;
  }
}
