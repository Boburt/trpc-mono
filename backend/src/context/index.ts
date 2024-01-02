import { db } from "@backend/db";
import Elysia, { Context, error } from "elysia";
import { drizzleDb } from "@backend/lib/db";
import cors from "@elysiajs/cors";
import jwt from "@backend/jwt";
import bearer from "@elysiajs/bearer";
import { verifyJwt } from "@backend/lib/bcrypt";
import { users, users_roles } from "backend/drizzle/schema";
import { eq } from "drizzle-orm";
import Redis from "ioredis";
import { CacheControlService } from "@backend/modules/cache_control/service";
import { AssetsService } from "@backend/modules/assets/service";
import { Queue } from "bullmq";

export const client = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    //   maxRetriesPerRequest: null,
});
export const newAssetsAddedQueue = new Queue(
    `${process.env.PROJECT_PREFIX}new_assets_added`,
    {
        connection: client,
    }
);

export const cacheControlService = new CacheControlService(drizzleDb, client);
export const assetsService = new AssetsService(
    db,
    newAssetsAddedQueue,
    drizzleDb
);

const permissionExtension = new Elysia({
    name: "permission_extension",
}).macro(({ onBeforeHandle }) => {
    return {
        permission(permission: string) {
            onBeforeHandle(({
                user,
                set
            }) => {
                console.log('user', user);
                if (!user) {
                    console.log('set.status')
                    return new Response(JSON.stringify({
                        error: 'User not found'
                    }), {
                        status: 401
                    })
                    return set.status = 401;
                    return error(401, "User not found")
                }

                if (!user.permissions) {
                    return error(403, "You don't have permissions")
                }

                if (!user.permissions.includes(permission)) {
                    return error(403, "You don't have permissions")

                }
            })
        }
    }
})

export const ctx = new Elysia({
    name: "@app/ctx",
})
    .decorate("prisma", db)
    .decorate("redis", client)
    .decorate("assetsService", assetsService)
    .decorate('drizzle', drizzleDb)
    .decorate('cacheController', cacheControlService)
    .use(cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }))
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