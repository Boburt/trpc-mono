import Elysia, { t } from "elysia";
import {
    users,
    users_roles,
} from "@backend/../drizzle/schema";
import {
    InferSelectModel,
    SQLWrapper,
    and,
    eq,
    getTableColumns,
    sql,
} from "drizzle-orm";
import {
    comparePassword,
    hashPassword,
    signJwt,
    verifyJwt,
} from "@backend/lib/bcrypt";
import { SelectedFields } from "drizzle-orm/pg-core";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { createInsertSchema } from "drizzle-typebox";
import { drizzleDb } from "@backend/lib/db";
import { ctx } from "@backend/context";

type UsersModel = InferSelectModel<typeof users>;

const userById = drizzleDb.query.users
    .findFirst({
        where: (users, { eq }) => eq(users.id, sql.placeholder("id")),
    })
    .prepare("userByPhone");

const userByLogin = drizzleDb.query.users
    .findFirst({
        where: (users, { eq }) => eq(users.login, sql.placeholder("login")),
    })
    .prepare("userByLogin");

const userFirstRole = drizzleDb.query.users_roles
    .findFirst({
        where: (users_roles, { eq }) =>
            eq(users_roles.user_id, sql.placeholder("user_id")),
    })
    .prepare("userFirstRole");

function exclude<User extends Record<string, unknown>, Key extends keyof User>(
    user: User,
    keys: Key[]
): Omit<User, Key> {
    const filteredEntries = Object.entries(
        user as Record<string, unknown>
    ).filter(([key]) => !keys.includes(key as Key));
    const filteredObject = Object.fromEntries(filteredEntries) as unknown as Omit<
        User,
        Key
    >;
    return filteredObject;
}

export const usersController = new Elysia({
    name: "@api/users"
})
    .use(ctx)
    .post("/users/login", async ({
        body: { login, password },
        set,
        cacheController
    }) => {
        const user = await userByLogin.execute({ login });

        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }
        const isPasswordSame = await comparePassword(
            password,
            user.salt!,
            user.password
        );

        if (!isPasswordSame) {
            set.status = 401;
            return {
                message: "Password is incorrect",
            };
        }

        if (user.status == "blocked") {
            set.status = 401;
            return {
                message: "User is blocked",
            };
        }

        const accessToken = await signJwt(
            {
                id: user.id,
                login: user.login,
                first_name: user.first_name,
                last_name: user.last_name,
            },
            process.env.JWT_EXPIRES_IN
        );

        const refreshToken = await signJwt(
            {
                id: user.id,
                login: user.login,
                first_name: user.first_name,
                last_name: user.last_name,
            },
            process.env.JWT_REFRESH_EXPIRES_IN
        );

        const userRole = await userFirstRole.execute({ user_id: user.id });

        // getting rights
        let permissions: string[] = [];
        if (userRole) {
            permissions = await cacheController.getPermissionsByRoleId(
                userRole.role_id
            );
        }
        const resultUser = exclude(user, [
            "password",
            "salt",
            // @ts-ignore
            "users_roles_usersTousers_roles_user_id",
        ]);
        return {
            data: resultUser,
            refreshToken,
            accessToken,
            rights: permissions,
        };
    },
        {
            body: t.Object({
                login: t.String(),
                password: t.String(),
            }),
        }
    )
    .post(
        "/users/refresh_token",
        async ({ body: { refreshToken }, set, cacheController }) => {
            let jwtResult = await verifyJwt(refreshToken);
            if (!jwtResult) {
                set.status = 401;
                return {
                    message: "Invalid token",
                };
            }

            if (!jwtResult.payload) {
                set.status = 401;
                return {
                    message: "Invalid token",
                };
            }

            const user = await userById.execute({ id: jwtResult.payload.id });

            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (user.status == "blocked") {
                set.status = 401;
                return {
                    message: "User is blocked",
                };
            }

            const accessToken = await signJwt(
                {
                    id: user.id,
                    login: user.login,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
                process.env.JWT_EXPIRES_IN
            );

            const refreshTokenNew = await signJwt(
                {
                    id: user.id,
                    login: user.login,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
                process.env.JWT_REFRESH_EXPIRES_IN
            );

            const userRole = await userFirstRole.execute({ user_id: user.id });

            // getting rights
            let permissions: string[] = [];
            if (userRole) {
                permissions = await cacheController.getPermissionsByRoleId(
                    userRole.role_id
                );
            }

            const resultUser = exclude(user, [
                "password",
                "salt",
                // @ts-ignore
                "users_roles_usersTousers_roles_user_id",
            ]);

            return {
                data: resultUser,
                refreshToken: refreshTokenNew,
                accessToken,
                rights: permissions,
            };
        },
        {
            body: t.Object({
                refreshToken: t.String(),
            }),
        }
    )
    .post('/users/assign_role', async ({
        body: { user_id, role_id },
        user,
        set,
        drizzle
    }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        if (!user.permissions.includes('users.edit')) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }

        await drizzle.delete(users_roles).where(eq(users_roles.user_id, user_id)).execute();
        await drizzle.insert(users_roles).values({ user_id, role_id }).execute();
        return {
            data: {
                user_id,
                role_id
            }
        }
    }, {
        body: t.Object({
            user_id: t.String(),
            role_id: t.String()
        })
    })
    .get(
        "/users",
        async ({
            query: { limit, offset, sort, filters, fields },
            user,
            set,
            drizzle
        }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes('users.list')) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let res: {
                [key: string]: UsersModel & {
                    work_schedules: {
                        id: string;
                        user_id: string;
                        work_schedule_id: string;
                        start_time: string;
                        end_time: string;
                        day: string;
                    }[];
                };
            } = {};
            let selectFields: SelectedFields = {};
            if (fields) {
                fields = fields.split(',').filter(item => item != 'password').join(',');
                selectFields = parseSelectFields(fields, users, {});
            }
            let whereClause: (SQLWrapper | undefined)[] = [];
            if (filters) {
                whereClause = parseFilterFields(filters, users, {});
            }
            const usersCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(users)
                .where(and(...whereClause))
                .execute();

            const { password, salt, ...usersFields } = getTableColumns(users);

            const usersDbSelect = drizzle
                .select(usersFields)
                .from(users)
                .where(and(...whereClause))
                .limit(+limit)
                .offset(+offset)
                .as("users");

            // @ts-ignore
            const usersList: UsersModel[] = await drizzle
                .select(selectFields)
                .from(usersDbSelect)
                .execute();
            console.log(
                "sql",
                drizzle.select(selectFields).from(usersDbSelect).toSQL().sql
            );
            usersList.forEach((user) => {
                if (!res[user.id]) {
                    res[user.id] = {
                        ...user,
                        work_schedules: [],
                    };
                }
                // @ts-ignore
                if (user.work_schedules) {
                    // @ts-ignore
                    res[user.id].work_schedules.push(user.work_schedules);
                }
            });

            return {
                total: usersCount[0].count,
                data: Object.values(res),
            };
        },
        {
            query: t.Object({
                limit: t.String(),
                offset: t.String(),
                sort: t.Optional(t.String()),
                filters: t.Optional(t.String()),
                fields: t.Optional(t.String()),
            }),
        }
    )
    .get(
        "/users/:id",
        async ({
            params: { id },
            // @ts-ignore
            user,
            set,
            drizzle
        }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes('users.one')) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const { password, salt, ...usersFields } = getTableColumns(users);
            const permissionsRecord = await drizzle
                .select(usersFields)
                .from(users)
                .where(eq(users.id, id))
                .execute();
            return {
                data: permissionsRecord[0],
            };
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/users",
        async ({
            body: { data, fields },
            // @ts-ignore
            user,
            set,
            drizzle
        }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes('users.add')) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            if (data.password) {
                const { hash, salt } = await hashPassword(data.password);
                data.password = hash;
                data.salt = salt;
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, users, {});
            }
            const result = await drizzle
                .insert(users)
                .values(data)
                .returning(selectFields);

            return result[0];
        },
        {
            body: t.Object({
                // @ts-ignore
                data: createInsertSchema(users) as any,
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/users/:id",
        async ({
            params: { id },
            body: { data, fields },
            user,
            set,
            drizzle
        }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes('users.edit')) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, users, {});
            }

            if (data.password) {
                let password = data.password;
                if (typeof password != "string") {
                    password = password.set!;
                }
                const { hash, salt } = await hashPassword(password);
                data.password = hash;
                data.salt = salt;
            }

            const result = await drizzle
                .update(users)
                .set(data)
                .where(eq(users.id, id))
                .returning(selectFields);

            return {
                data: result[0],
            };
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            body: t.Object({
                // @ts-ignore
                data: createInsertSchema(users) as any,
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
