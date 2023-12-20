import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { categories } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const categoriesController = new Elysia({
    name: "@api/categories"
}).use(ctx).get(
    "/categories",
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

        if (!user.permissions.includes("categories.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        let selectFields: SelectedFields = {};
        if (fields) {
            selectFields = parseSelectFields(fields, categories, {});
        }
        const rolesCount = await drizzle
            .select({ count: sql<number>`count(*)` })
            .from(categories)
            .execute();
        const rolesList = (await drizzle
            .select(selectFields)
            .from(categories)
            .limit(+limit)
            .offset(+offset)
            .execute()) as InferSelectModel<typeof categories>[];
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
    .get("/categories/cached", async ({ redis, user, set, cacheController }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        if (!user.permissions.includes("categories.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        const res = await cacheController.getCachedCategories({});
        return res;
    })
    .get(
        "/categories/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("categories.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(categories)
                .where(eq(categories.id, id))
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
        "/categories/:id",
        async ({ params: { id }, user, set, drizzle,
            cacheController }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("categories.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: categories.id,
                })
                .from(categories)
                .where(eq(categories.id, id))
                .execute();

            await drizzle.delete(categories).where(eq(categories.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/categories",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("categories.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, categories, {});
            }
            const result = await drizzle
                .insert(categories)
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
                    i18n_name: t.Object(t.Any()),
                    description: t.Optional(t.Nullable(t.String())),
                    active: t.Optional(t.Boolean()),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/categories/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("categories.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, categories, {});
            }
            const result = await drizzle
                .update(categories)
                .set(data)
                .where(eq(categories.id, id))
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
                    i18n_name: t.Object(t.Any()),
                    description: t.Optional(t.Nullable(t.String())),
                    active: t.Optional(t.Boolean()),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )