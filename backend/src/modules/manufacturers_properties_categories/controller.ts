import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { manufacturers_properties_categories } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const manufacturersPropertiesCategoriesController = new Elysia({
    name: "@api/manufacturersPropertiesCategories"
})
    .use(ctx)
    .get(
        "/manufacturers_properties_categories",
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

            if (!user.permissions.includes("manufacturers_properties_categories.list")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields: SelectedFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers_properties_categories, {});
            }
            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(manufacturers_properties_categories)
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(manufacturers_properties_categories)
                .limit(+limit)
                .offset(+offset)
                .execute()) as InferSelectModel<typeof manufacturers_properties_categories>[];
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
    .get("/manufacturers_properties_categories/cached", async ({ redis, user, set, cacheController }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        if (!user.permissions.includes("manufacturers_properties_categories.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        const res = await cacheController.getCachedManufacturersPropertiesCategories({})
        return res;
    })
    .get(
        "/manufacturers_properties_categories/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties_categories.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(manufacturers_properties_categories)
                .where(eq(manufacturers_properties_categories.id, id))
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
        "/manufacturers_properties_categories/:id",
        async ({ params: { id }, user, set, drizzle,
            cacheController }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties_categories.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: manufacturers_properties_categories.id,
                })
                .from(manufacturers_properties_categories)
                .where(eq(manufacturers_properties_categories.id, id))
                .execute();

            await drizzle.delete(manufacturers_properties_categories).where(eq(manufacturers_properties_categories.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/manufacturers_properties_categories",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties_categories.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers_properties_categories, {});
            }
            const result = await drizzle
                .insert(manufacturers_properties_categories)
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
                    i18_name: t.Optional(t.Object(t.Any())),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/manufacturers_properties_categories/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties_categories.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers_properties_categories, {});
            }
            const result = await drizzle
                .update(manufacturers_properties_categories)
                .set(data)
                .where(eq(manufacturers_properties_categories.id, id))
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
                    i18_name: t.Optional(t.Object(t.Any())),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )