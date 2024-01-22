import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { forms, forms_sent_items } from "backend/drizzle/schema";
import { InferSelectModel, SQLWrapper, and, eq, getTableColumns, or, sql } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const formsSentItemsController = new Elysia({
    name: '@api/forms_sent_items',
})
    .use(ctx)
    .get(
        "/forms_sent_items",
        async ({
            query: { limit, offset, sort, filters, fields },
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

            let selectFields: SelectedFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, forms_sent_items, {
                    forms
                });
            }
            let whereClause: (SQLWrapper | undefined)[] = [];
            if (filters) {
                whereClause = parseFilterFields(filters, forms_sent_items, {
                    forms
                });
            }

            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(forms_sent_items)
                .leftJoin(
                    forms,
                    eq(forms_sent_items.form_id, forms.id)
                )
                .where(and(...whereClause))
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(forms_sent_items)
                .leftJoin(
                    forms,
                    eq(forms_sent_items.form_id, forms.id)
                )
                .where(and(...whereClause))
                .limit(+limit)
                .offset(+offset)
                .execute()) as InferSelectModel<typeof forms_sent_items>[];
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
                filters: t.Optional(t.String()),
                fields: t.Optional(t.String()),
            }),
        }
    )
    .get(
        "/forms_sent_items/:id",
        async ({ params: { id }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    ...getTableColumns(forms_sent_items),
                    form: getTableColumns(forms),
                })
                .from(forms_sent_items)
                .leftJoin(forms, eq(forms_sent_items.form_id, forms.id))
                .where(eq(forms_sent_items.id, id))
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
        "/forms_sent_items/:id",
        async ({ params: { id }, user, set, drizzle, cacheController }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("forms_sent_items.delete")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            const permissionsRecord = await drizzle
                .select({
                    id: forms_sent_items.id,
                })
                .from(forms_sent_items)
                .where(eq(forms_sent_items.id, id))
                .execute();

            await drizzle.delete(forms_sent_items).where(eq(forms_sent_items.id, id)).execute();
            return permissionsRecord[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .put(
        "/forms_sent_items/:id",
        async ({
            params: { id },
            body: { data, fields },
            user,
            set,
            drizzle,
            cacheController,
        }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }
            if (!user.permissions.includes("forms_sent_items.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, forms_sent_items, {});
            }

            const prevData = await drizzle
                .select()
                .from(forms_sent_items)
                .where(eq(forms_sent_items.id, id))
                .execute();

            if (!prevData[0]) {
                set.status = 404;
                return {
                    message: "Not found",
                };
            }

            const result = await drizzle
                .update(forms_sent_items)
                .set(data)
                .where(eq(forms_sent_items.id, id))
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
                    name: t.Optional(
                        t.Nullable(
                            t.String({
                                minLength: 1,
                            })
                        )
                    ),
                    description: t.Optional(t.Nullable(t.String())),
                    category_id: t.Optional(t.Nullable(t.String())),
                    status_id: t.Optional(t.Nullable(t.String())),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )