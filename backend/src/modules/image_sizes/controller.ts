import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { image_sizes } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const imageSizesController = new Elysia({
    name: "@api/image_sizes"
}).use(ctx).get(
    "/image_sizes",
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

        if (!user.permissions.includes("image_sizes.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        let selectFields: SelectedFields = {};
        if (fields) {
            selectFields = parseSelectFields(fields, image_sizes, {});
        }
        const rolesCount = await drizzle
            .select({ count: sql<number>`count(*)` })
            .from(image_sizes)
            .execute();
        const rolesList = (await drizzle
            .select(selectFields)
            .from(image_sizes)
            .limit(+limit)
            .offset(+offset)
            .execute()) as InferSelectModel<typeof image_sizes>[];
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
    .get("/image_sizes/cached", async ({ redis, user, set, cacheController }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        if (!user.permissions.includes("image_sizes.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        const res = await cacheController.getCachedImageSizes({});
        return res;
    })
    .get(
        "/image_sizes/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("image_sizes.one")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const permissionsRecord = await drizzle
                .select()
                .from(image_sizes)
                .where(eq(image_sizes.id, id))
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
        "/image_sizes/:id",
        async ({ params: { id }, user, set, drizzle,
            cacheController }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("image_sizes.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: image_sizes.id,
                })
                .from(image_sizes)
                .where(eq(image_sizes.id, id))
                .execute();

            await drizzle.delete(image_sizes).where(eq(image_sizes.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/image_sizes",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("image_sizes.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, image_sizes, {});
            }
            const result = await drizzle
                .insert(image_sizes)
                .values(data)
                .returning(selectFields);

            return {
                data: result[0],
            };
        },
        {
            body: t.Object({
                data: t.Object({
                    code: t.String(),
                    width: t.Number(),
                    height: t.Number(),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )
    .put(
        "/image_sizes/:id",
        async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("image_sizes.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, image_sizes, {});
            }
            const result = await drizzle
                .update(image_sizes)
                .set(data)
                .where(eq(image_sizes.id, id))
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
                    code: t.String(),
                    width: t.Number(),
                    height: t.Number(),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )