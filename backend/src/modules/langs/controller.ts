import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { langs, permissions } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const langsController = new Elysia({
    name: '@api/langs'
})
    .use(ctx)
    .get(
        "/langs",
        async ({
            query: { limit, offset, sort, filter, fields },
            user,
            set,
            drizzle,
        }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("langs.list")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields: SelectedFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, langs, {});
            }
            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(langs)
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(langs)
                .limit(+limit)
                .offset(+offset)
                .execute()) as InferSelectModel<typeof langs>[];
            return {
                total: rolesCount[0].count,
                data: rolesList,
            };
        },
        {
            query: t.Object({
                limit: t.String(),
                offset: t.String(),
                sort: t.Optional(t.String()),
                filter: t.Optional(
                    t.Object({
                        id: t.Number(),
                        name: t.String(),
                        email: t.String(),
                        address: t.String(),
                        phone: t.String(),
                    })
                ),
                fields: t.Optional(t.String()),
            }),
        }
    )
    .get("/langs/cached", async ({ redis, user, set, cacheController }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        if (!user.permissions.includes("langs.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        const res = await cacheController.getCachedLangs({});
        return res;
    })
    .get(
        "/langs/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("langs.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(langs)
                .where(eq(langs.id, id))
                .execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .delete(
        "/langs/:id",
        async ({ params: { id }, user, set, drizzle,
            cacheController }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("permissions.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: langs.id,
                })
                .from(langs)
                .where(eq(langs.id, id))
                .execute();

            await drizzle.delete(langs).where(eq(langs.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/langs",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("langs.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, langs, {});
            }
            const result = await drizzle
                .insert(langs)
                .values(data)
                .returning(selectFields);

            return {
                data: result[0],
            };
        },
        {
            body: t.Object({
                data: t.Object({
                    name: t.String(),
                    code: t.String(),
                    is_default: t.Optional(t.Boolean())
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/langs/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("langs.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, langs, {});
            }
            const result = await drizzle
                .update(langs)
                .set(data)
                .where(eq(langs.id, id))
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
                data: t.Object({
                    name: t.String(),
                    code: t.String(),
                    is_default: t.Boolean()
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )