import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { AuthError, type NextAuthConfig } from "next-auth"
import { JWT } from "next-auth/jwt"
import { users } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import Credentials from "next-auth/providers/credentials";
import { apiClient } from "./utils/eden";
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
    GitHub,
    Google,
    Credentials({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            console.log('credentials', credentials);
            if (typeof credentials !== "undefined") {
                const { email, password } = credentials;
                console.log("credentials", credentials);
                try {
                    const { data: res, status, error } = await apiClient.api.users.login.post({
                        email: email!.toString(),
                        password: password!.toString(),
                    });
                    console.log('res', res);
                    console.log('status', status);
                    if (status == 200 && res && "accessToken" in res) {
                        return {
                            ...res.user,
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken,
                            permissions: res.permissions,
                            role: res.role,
                        };
                    } else if (status == 401) {
                        throw new AuthError("Неверный логин или пароль");
                    } else {
                        throw new AuthError("Неверный логин или пароль");
                    }
                } catch (error) {
                    return null;
                }
            } else {
                return null;
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
            if (account?.type === 'oauth') {
                const {
                    data,
                    status,
                    error
                } = await apiClient.api.users.oauth.post({
                    data: {
                        provider: account.provider,
                        accessToken: account.access_token,
                        tokenType: account.token_type,
                        scope: account.scope
                    }
                });
                if (status == 200 && data && "accessToken" in data) {
                    user = {
                        ...user,
                        ...data.user,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        permissions: data.permissions,
                        role: data.role,
                    }
                } else {
                    return false;
                }
                return true;
            } else {
                if (typeof credentials !== "undefined") {
                    const { email, password } = credentials;
                    try {
                        const { data: res, status, error } = await apiClient.api.users.login.post({
                            email: email!.toString(),
                            password: password!.toString(),
                        });
                        if (status == 200 && res && "accessToken" in res) {
                            user = {
                                ...res.user,
                                accessToken: res.accessToken,
                                refreshToken: res.refreshToken,
                                permissions: res.permissions,
                                role: res.role,
                            };
                        } else if (status == 401) {
                            throw new AuthError("Неверный логин или пароль");
                        } else {
                            throw new AuthError("Неверный логин или пароль");
                        }
                    } catch (error) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        },
        authorized({ request, auth }) {
            return !!auth
        },
        async session({ session, token }) {
            console.log('auth.config session', session, token);
            // if (typeof token !== "undefined") {
            //     session = {
            //         ...session,
            //         ...token,
            //     };
            // }
            return session;
        },
        async jwt({ token, user, account, session }) {
            console.log('auth.config jwt', token, user, account, session);
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

            // if (typeof user !== "undefined") {
            //     token = {
            //         ...token,
            //         ...user,
            //         // accessToken: user.accessToken,
            //         // refreshToken: user.refreshToken,
            //         // rights: user.rights,
            //         // token: user.token,
            //     };
            // }
            return token;
        },
    },
    session: { strategy: "jwt" },
    providers
} satisfies NextAuthConfig
