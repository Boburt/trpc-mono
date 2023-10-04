import { Users, Users_rolesWithRelations } from "@backend/lib/zod";
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
    users_roles_usersTousers_roles_user_id: Users_rolesWithRelations[];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Users {
    user: Users;
    rights: string[];
    accessToken: string;
    refreshToken: string;
    users_roles_usersTousers_roles_user_id: Users_rolesWithRelations[];
    exp: number;
    iat: number;
  }
}
