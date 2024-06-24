import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { form_filled_values, forms, forms_sent_items, manufacturers_users } from "backend/drizzle/schema";
import { InferSelectModel, SQLWrapper, and, eq, getTableColumns, or, sql } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

type JsonNode = {
    [key: string]: any;
    type?: string;
    children?: JsonNode[];
};

const typesToFind: string[] = ["RsInput", "RsNumberFormat", "RsDropdown", "RsTextArea", "RsCheckbox", "RsRadioGroup", "RsPatternFormat"];

function findObjectsByType(node: JsonNode | JsonNode[], types: string[]): JsonNode[] {
    let result: JsonNode[] = [];
    if (Array.isArray(node)) {
        node.forEach(childNode => result = result.concat(findObjectsByType(childNode, types)));
    } else if (node !== null && typeof node === 'object') {
        if (node.type && types.includes(node.type)) {
            result.push(node);
        }
        Object.keys(node).forEach(key => {
            const childNode = node[key];
            if (typeof childNode === 'object' && childNode !== null) {
                result = result.concat(findObjectsByType(childNode, types));
            }
        });
    }
    return result;
}

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

            if (!user.permissions.includes("forms_sent_items.list")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
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
    .get('/forms_sent_items/:id/filled_values', async ({ user, drizzle, params: { id }, set }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        const formSentItem = await drizzle
            .select({
                id: forms_sent_items.id,
                status: forms_sent_items.status,
            })
            .from(forms_sent_items)
            .where(eq(forms_sent_items.id, id))
            .execute();

        if (!formSentItem[0]) {
            set.status = 404;
            return {
                message: "Not found",
            };
        }

        if (formSentItem[0].status != 'filled') {
            set.status = 400;
            return {
                message: "Form not filled",
            };
        }

        const filledValues = await drizzle
            .select()
            .from(form_filled_values)
            .where(eq(form_filled_values.form_sent_item_id, id))
            .execute();

        return filledValues;
    }, {
        params: t.Object({
            id: t.String()
        }),
    })
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
                // @ts-ignore
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
    .post('/forms_sent_items/:id/opened', async ({ user, drizzle, params: { id }, set }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        const formSentItem = await drizzle
            .select({
                ...getTableColumns(forms_sent_items),
                form: getTableColumns(forms),
            })
            .from(forms_sent_items)
            .leftJoin(forms, eq(forms_sent_items.form_id, forms.id))
            .where(eq(forms_sent_items.id, id))
            .execute();

        if (!formSentItem[0]) {
            set.status = 404;
            return {
                message: "Not found",
            };
        }

        if (formSentItem[0].status == 'filled') {
            set.status = 400;
            return {
                message: "Form already filled",
            };
        }

        const model = formSentItem[0].model;
        console.log('user', user)
        console.log('formSentItem[0]', formSentItem[0])
        if (model == 'manufacturers') {
            const manufacturersUsers = await drizzle
                .select()
                .from(manufacturers_users)
                .where(
                    and(
                        eq(manufacturers_users.manufacturer_id, formSentItem[0].model_id),
                        eq(manufacturers_users.user_id, user.user.id)
                    )
                )
                .execute();

            if (!manufacturersUsers[0]) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
        }

        await drizzle.update(forms_sent_items).set({
            status: 'opened',
            opened_at: (new Date()).toISOString(),
            opened_by: user.user.id,
        }).where(eq(forms_sent_items.id, id)).execute();
    }, {
        params: t.Object({
            id: t.String()
        }),
    })
    .post('/forms_sent_items/:id/fill', async ({ user, drizzle, body: { data }, params: { id }, set }) => {
        if (!user) {
            set.status = 401;
            return {
                message: "User not found",
            };
        }

        const formSentItem = await drizzle
            .select({
                ...getTableColumns(forms_sent_items),
                form: getTableColumns(forms),
            })
            .from(forms_sent_items)
            .leftJoin(forms, eq(forms_sent_items.form_id, forms.id))
            .where(eq(forms_sent_items.id, id))
            .execute();

        if (!formSentItem[0]) {
            set.status = 404;
            return {
                message: "Not found",
            };
        }

        if (formSentItem[0].status == 'filled') {
            set.status = 400;
            return {
                message: "Form already filled",
            };
        }

        const model = formSentItem[0].model;
        console.log('user', user)
        console.log('formSentItem[0]', formSentItem[0])
        if (model == 'manufacturers') {
            const manufacturersUsers = await drizzle
                .select()
                .from(manufacturers_users)
                .where(
                    and(
                        eq(manufacturers_users.manufacturer_id, formSentItem[0].model_id),
                        eq(manufacturers_users.user_id, user.user.id)
                    )
                )
                .execute();

            if (!manufacturersUsers[0]) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
        }

        const fields = findObjectsByType(formSentItem[0].form?.form_json as JsonNode, typesToFind);
        const fieldsData: {
            [key: string]: {
                field: string;
                label: string;
                value: any
            };
        } = fields.reduce((acc, field) => {
            acc[field.key] = {
                field: field.key,
                label: field?.props?.label?.value || field?.key,
                value: null
            };
            return acc;
        }, {});

        Object.keys(data).forEach(key => {
            if (fieldsData[key]) {
                fieldsData[key].value = data[key];
            }
        });

        console.log('fieldsData', fieldsData)

        await drizzle.insert(form_filled_values).values(Object.keys(fieldsData).map(key => ({
            form_id: formSentItem[0].form_id,
            form_sent_item_id: id,
            field_id: fieldsData[key].field,
            field_label: fieldsData[key].label,
            value: JSON.stringify(fieldsData[key].value)
        })));

        await drizzle.update(forms_sent_items).set({
            status: 'filled',
            applied_by: user.user.id,
        }).where(eq(forms_sent_items.id, id)).execute();

        return {
            data: {
                status: 'filled'
            }
        };
    }, {
        params: t.Object({
            id: t.String()
        }),
        body: t.Object({
            data: t.Record(
                t.String(),
                t.Any()
            )
        }),
    })