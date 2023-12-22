import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { manufacturers, permissions } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const manufacturersController = new Elysia({
    name: '@api/manufacturers'
})
    .use(ctx)
    .get(
        "/manufacturers",
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

            if (!user.permissions.includes("manufacturers.list")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields: SelectedFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers, {});
            }
            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(manufacturers)
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(manufacturers)
                .limit(+limit)
                .offset(+offset)
                .execute()) as InferSelectModel<typeof manufacturers>[];
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
    .get(
        "/manufacturers/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(manufacturers)
                .where(eq(manufacturers.id, id))
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
        "/manufacturers/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: manufacturers.id,
                })
                .from(manufacturers)
                .where(eq(manufacturers.id, id))
                .execute();

            await drizzle.delete(manufacturers).where(eq(manufacturers.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/manufacturers",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers, {});
            }
            const result = await drizzle
                .insert(manufacturers)
                .values(data)
                .returning(selectFields);

            return {
                data: result[0],
            };
        },
        {
            body: t.Object({
                data: t.Object({
                    short_name: t.String(),
                    name: t.String(),
                    description: t.Optional(t.Nullable(t.String())),
                    active: t.Optional(t.Boolean()),
                    city_id: t.Optional(t.Nullable(t.String())),
                    rating: t.Number()
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/manufacturers/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("manufacturers.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, manufacturers, {});
            }
            const result = await drizzle
                .update(manufacturers)
                .set(data)
                .where(eq(manufacturers.id, id))
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
                    short_name: t.String(),
                    name: t.String(),
                    description: t.Optional(t.Nullable(t.String())),
                    active: t.Optional(t.Boolean()),
                    city_id: t.Optional(t.Nullable(t.String())),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )