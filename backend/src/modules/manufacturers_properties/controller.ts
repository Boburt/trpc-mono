import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { manufacturers_properties, permissions } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const manufacturersPropertiesController = new Elysia({
    name: '@api/manufacturers_properties'
})
    .use(ctx)
    .get(
        "/manufacturers_properties",
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

            if (!user.permissions.includes("manufacturers_properties.list")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields: SelectedFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers_properties, {});
            }
            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(manufacturers_properties)
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(manufacturers_properties)
                .limit(+limit)
                .offset(+offset)
                .execute()) as InferSelectModel<typeof manufacturers_properties>[];
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
    .get("/manufacturers_properties/cached", async ({ redis, user, set, cacheController }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        if (!user.permissions.includes("manufacturers_properties.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        const res = await cacheController.getCachedManufacturersProperties({});
        return res;
    })
    .get(
        "/manufacturers_properties/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(manufacturers_properties)
                .where(eq(manufacturers_properties.id, id))
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
        "/manufacturers_properties/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: manufacturers_properties.id,
                })
                .from(manufacturers_properties)
                .where(eq(manufacturers_properties.id, id))
                .execute();

            await drizzle.delete(manufacturers_properties).where(eq(manufacturers_properties.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/manufacturers_properties",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers_properties, {});
            }
            const result = await drizzle
                .insert(manufacturers_properties)
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
                    category_id: t.String(),
                    type: t.Union([t.Literal('list'), t.Literal('date'), t.Literal('boolean'), t.Literal('number'), t.Literal('string')]),
                    additional_data: t.Optional(t.Object(t.Any())),
                    show_in_filter: t.Boolean(),
                    show_in_list: t.Boolean()
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/manufacturers_properties/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers_properties.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers_properties, {});
            }
            const result = await drizzle
                .update(manufacturers_properties)
                .set(data)
                .where(eq(manufacturers_properties.id, id))
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
                    category_id: t.String(),
                    type: t.Union([t.Literal('list'), t.Literal('date'), t.Literal('boolean'), t.Literal('number'), t.Literal('string')]),
                    additional_data: t.Optional(t.Object(t.Any())),
                    show_in_filter: t.Boolean(),
                    show_in_list: t.Boolean()
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )