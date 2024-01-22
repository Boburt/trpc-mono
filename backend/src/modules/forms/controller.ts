import { ctx } from "@backend/context";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { forms } from "backend/drizzle/schema";
import { sql, InferSelectModel, InferInsertModel, eq, desc } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const formsController = new Elysia({
    name: '@api/forms'
})
    .use(ctx)
    .get(
        "/forms",
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

            if (!user.permissions.includes("forms.list")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields: SelectedFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, forms, {});
            }
            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(forms)
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(forms)
                .limit(+limit)
                .offset(+offset)
                .orderBy(desc(forms.created_at))
                .execute()) as InferSelectModel<typeof forms>[];
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
        "/forms/:id",
        async ({
            params: { id },
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

            if (!user.permissions.includes("forms.one")) {
                set.status = 403;
                return {
                    message: "You don't have permissions",
                };
            }

            const role = (await drizzle
                .select()
                .from(forms)
                .where(eq(forms.id, id))
                .execute()) as InferSelectModel<typeof forms>[];
            if (!role.length) {
                set.status = 404;
                return {
                    message: "Role not found",
                };
            }
            return role[0];
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )
    .post(
        "/forms",
        async ({ body: { data }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("forms.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const role = await drizzle
                .insert(forms)
                .values({
                    ...data,
                    form_json: JSON.parse(data.form_json),
                    form_recipients: JSON.parse(data.form_recipients),
                    created_at: new Date().toISOString(),
                    status: 'new'
                })
                .execute();
            return role;
        },
        {
            body: t.Object({
                data: t.Object({
                    name: t.String(),
                    form_json: t.String(),
                    form_recipients: t.String(),
                    schedule_type: t.String(),
                    schedule_time: t.Optional(t.String()),

                })
            }),
        }
    )
    .put(
        "/forms/:id",
        async ({
            params: { id },
            body: { data },
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

            if (!user.permissions.includes("forms.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            const role = await drizzle
                .update(forms)
                .set(data)
                .where(eq(forms.id, id))
                .execute();

            return {
                message: "Role updated",
            };
        },
        {
            params: t.Object({
                id: t.String(),
            }),
            body: t.Object({
                data: t.Object({
                    name: t.String(),
                    form_json: t.String(),
                    form_recipients: t.String(),
                    schedule_type: t.String(),
                    schedule_time: t.Optional(t.String()),
                })
            }),
        }
    )
    .post(
        "/forms/:id/send",
        async ({
            params: { id },
            user,
            set,
            drizzle,
            formSendTgQueueNameQueue
        }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("forms.edit")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }

            await formSendTgQueueNameQueue.add(id, { id }, {
                removeOnComplete: true,
                removeOnFail: 1000
            });

            const role = await drizzle
                .update(forms)
                .set({
                    status: 'sent'
                })
                .where(eq(forms.id, id))
                .execute();

            return {
                message: "Role updated",
            };
        },
        {
            params: t.Object({
                id: t.String(),
            })
        }
    )