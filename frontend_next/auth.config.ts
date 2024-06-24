import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { AuthError, type NextAuthConfig } from "next-auth"
import { JWT } from "next-auth/jwt"
import { users } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import Credentials from "next-auth/providers/credentials";
import { apiClient } from "./lib/eden";
import type { Provider } from "next-auth/providers"

export class CustomAuthError extends AuthError {
    static type: string;
    static message: string;
    constructor(message?: any) {
        super();

        this.type = message;
        this.message = message;
    }
}

const providers: Provider[] = [
    GitHub,
    Google,
    Credentials({
        name: "credentials",
        credentials: {
            login: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            if (typeof credentials !== "undefined") {
                const { login, password } = credentials;
                try {
                    const { data: res, status } = await apiClient.api.users.login.post({
                        login: login!.toString(),
                        password: password!.toString(),
                    });
                    if (status == 200 && res && "accessToken" in res) {
                        return {
                            ...res.user,
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken,
                            permissions: res.permissions,
                            // @ts-ignore
                            role: res.role,
                        };
                    } else if (status == 401) {
                        throw new CustomAuthError("Неверный логин или пароль");
                    } else {
                        throw new CustomAuthError("Произошла ошибка. Пожалуйста, попробуйте снова.");
                    }
                } catch (error: any) {
                    throw new CustomAuthError(error.message || "Произошла ошибка. Пожалуйста, попробуйте снова.");
                }
            } else {
                throw new CustomAuthError("Учетные данные отсутствуют");
            }
        },
    }),
];


export const providerMap = providers.find(provider => {
    const providerData = typeof provider === "function" ? provider() : provider;
    return providerData.type == 'credentials';
})


export default {
    debug: true,
    basePath: "/api/auth",
    callbacks: {
        signIn: async ({
            user,
            account,
            credentials
        }) => {
            if (account?.provider === "credentials" && !("accessToken" in user)) {
                return false;
            }
            return true;
        },
        authorized({ request, auth }) {
            return !!auth
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
        async jwt({ token, user, account, session }) {
            // console.log('auth.config jwt', token, user, account, session);
            // if (token && token.exp) {
            //     const differenceInMinutes = dayjs
            //         .unix(token!.exp!)
            //         .diff(dayjs(), "minute");

            //     if (differenceInMinutes < 30) {
            //         // @ts-ignore
            //         // const res = await trpcClient.users.refreshToken.mutate({
            //         //   refreshToken: token.refreshToken as string,
            //         // });
            //         // if (typeof res !== "undefined") {
            //         //   /** @ts-ignore */
            //         //   token = {
            //         //     ...token,
            //         //     ...res.data,
            //         //     accessToken: res.accessToken,
            //         //     refreshToken: res.refreshToken,
            //         //     rights: res.rights,
            //         //   };
            //         // }
            //     }
            // }

            if (typeof user !== "undefined") {
                token = {
                    ...token,
                    user,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    // rights: user.rights,
                    // token: user.token,
                };
            }
            return token;
        },
    },
    session: { strategy: "jwt" },
    providers
} satisfies NextAuthConfig
