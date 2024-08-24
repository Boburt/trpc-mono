import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { cities, permissions } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const citiesController = new Elysia({
    name: '@api/cities'
}).use(ctx).get(
    "/cities",
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

        if (!user.permissions.includes("cities.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        let selectFields: SelectedFields = {};
        if (fields) {
            selectFields = parseSelectFields(fields, cities, {});
        }
        const rolesCount = await drizzle
            .select({ count: sql<number>`count(*)` })
            .from(cities)
            .execute();
        const rolesList = (await drizzle
            .select(selectFields)
            .from(cities)
            .limit(+limit)
            .offset(+offset)
            .execute()) as InferSelectModel<typeof cities>[];
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
    .get("/cities/cached", async ({ redis, user, set, cacheController }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        if (!user.permissions.includes("cities.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        const res = await cacheController.getCachedCities({});
        return res;
    })
    .get(
        "/cities/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("cities.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(cities)
                .where(eq(cities.id, id))
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
        "/cities/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("cities.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: cities.id,
                })
                .from(cities)
                .where(eq(cities.id, id))
                .execute();

            await drizzle.delete(cities).where(eq(cities.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/cities",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("cities.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, cities, {});
            }
            const result = await drizzle
                .insert(cities)
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
                    slug: t.String(),
                    description: t.Optional(t.Nullable(t.String()))
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/cities/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("cities.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, cities, {});
            }
            const result = await drizzle
                .update(cities)
                .set(data)
                .where(eq(cities.id, id))
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
                    slug: t.String(),
                    description: t.Optional(t.Nullable(t.String()))
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )