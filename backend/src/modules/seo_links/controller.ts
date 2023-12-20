import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { seo_links } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const seoLinksController = new Elysia({
    name: '@api/seo_links'
}).use(ctx).get(
    "/seo_links",
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

        if (!user.permissions.includes("seo_links.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        let selectFields: SelectedFields = {};
        if (fields) {
            selectFields = parseSelectFields(fields, seo_links, {});
        }
        const rolesCount = await drizzle
            .select({ count: sql<number>`count(*)` })
            .from(seo_links)
            .execute();
        const rolesList = (await drizzle
            .select(selectFields)
            .from(seo_links)
            .limit(+limit)
            .offset(+offset)
            .execute()) as InferSelectModel<typeof seo_links>[];
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
        "/seo_links/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("seo_links.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(seo_links)
                .where(eq(seo_links.id, id))
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
        "/seo_links/:id",
        async ({ params: { id }, user, set, drizzle,
            cacheController }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("seo_links.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: seo_links.id,
                })
                .from(seo_links)
                .where(eq(seo_links.id, id))
                .execute();

            await drizzle.delete(seo_links).where(eq(seo_links.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/seo_links",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("seo_links.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, seo_links, {});
            }
            const result = await drizzle
                .insert(seo_links)
                .values(data)
                .returning(selectFields);

            return {
                data: result[0],
            };
        },
        {
            body: t.Object({
                data: t.Object({
                    title: t.String(),
                    link: t.String(),
                    description: t.Optional(t.Nullable(t.String()))
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/seo_links/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("seo_links.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, seo_links, {});
            }
            const result = await drizzle
                .update(seo_links)
                .set(data)
                .where(eq(seo_links.id, id))
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
                    title: t.String(),
                    link: t.String(),
                    description: t.Optional(t.Nullable(t.String()))
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )