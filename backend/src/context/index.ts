import { db } from "@backend/db";
import Elysia, { Context } from "elysia";
import {
    assetsService,
    cacheControlService,
    client as redisClient,
    usersService,
} from "@backend/trpc";
import { drizzleDb } from "@backend/lib/db";
import cors from "@elysiajs/cors";
import jwt from "@backend/jwt";
import bearer from "@elysiajs/bearer";
import { verifyJwt } from "@backend/lib/bcrypt";
import { users, users_roles } from "backend/drizzle/schema";
import { eq } from "drizzle-orm";

export const ctx = new Elysia({
    name: "@app/ctx",
})
    .decorate("prisma", db)
    .decorate("redis", redisClient)
    .decorate("assetsService", assetsService)
    .decorate('drizzle', drizzleDb)
    .decorate('cacheController', cacheControlService)
    .decorate('usersService', usersService)
    .use(cors())
    .use(bearer())
    .use(jwt)
    .derive(async ({ bearer, cacheController, drizzle }) => {
        const token = bearer;
        if (!token) {
            return {
                user: null,
            };
        }

        try {

            if (token == process.env.API_TOKEN) {
                return {
                    user: null
                }
            }

            let jwtResult = await verifyJwt(token);
            if (!jwtResult.payload.id) {
                return {
                    user: null,
                };
            }

            const user = await drizzle.query.users.findFirst({
                where: eq(users.id, jwtResult.payload!.id! as string),
            });

            if (!user) {
                return {
                    user: null,
                };
            }

            if (user.status !== 'active') {
                return {
                    user: null,
                };
            }

            const userRoles = await drizzle.query.users_roles.findFirst({
                where: eq(users_roles.user_id, user.id),
            });

            if (!userRoles) {
                return {
                    user: null,
                };
            }

            const permissions = await cacheController.getPermissionsByRoleId(userRoles.role_id);
            if (permissions.length === 0) {
                return {
                    user: null,
                };
            }

            return {
                user: {
                    id: user.id,
                    email: user.login,
                    name: user.status,
                    permissions: permissions,
                },
            };

        } catch (error) {
            console.log('error', error)
            return {
                user: null
            };
        }
    })


export type ContextType = Context<any, any, any>