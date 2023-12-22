import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { manufacturers, manufacturers_properties, manufacturers_properties_values, permissions, roles_permissions } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq, SQLWrapper, and, inArray } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";


export const manufacturersPropertiesController = new Elysia({
    name: '@api/manufacturers_properties'
})
    .use(ctx)
    .get(
        "/manufacturers_properties",
        async ({
            query: { limit, offset, fields,
                filters },
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
            let whereClause: (SQLWrapper | undefined)[] = [];
            if (filters) {
                whereClause = parseFilterFields(filters, manufacturers_properties, {
                    permissions,
                });
            }
            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(manufacturers_properties)
                .where(and(...whereClause))
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(manufacturers_properties)
                .where(and(...whereClause))
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
                filters: t.Optional(t.String()),
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
    .get('/manufacturers_properties/property_value/:manufacturerId', async ({
        params: {
            manufacturerId
        },
        drizzle,
        set,
        user
    }) => {
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
        const res = await drizzle.select().from(manufacturers_properties_values).where(eq(manufacturers_properties_values.manufacturer_id, manufacturerId)).execute();

        return res;
    }, {
        params: t.Object({
            manufacturerId: t.String()
        })
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
    .post("/manufacturers_properties/set_properties/:manufacturerId", async ({
        params: {
            manufacturerId
        },
        body: {
            properties
        },
        user,
        set,
        drizzle,
        cacheController
    }) => {
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

        const manufacturer = await drizzle.query.manufacturers.findFirst({
            where: eq(manufacturers.id, manufacturerId)
        });

        if (!manufacturer) {
            set.status = 404;
            return {
                message: 'Manufacturer is not found'
            }
        }

        const manufacturerProperties =
            await cacheController.getCachedManufacturersProperties({});

        // remove all properties by propertyId which are not in manufacturerProperties
        const propertiesToSet = properties.filter((property) => {
            return manufacturerProperties.find((p) => p.id === property.propertyId);
        });

        const propertiesToDelete = manufacturerProperties.filter((property) => {
            return !properties.find((p) => p.propertyId === property.id);
        });

        await drizzle.delete(manufacturers_properties_values).where(and(
            eq(manufacturers_properties_values.manufacturer_id, manufacturerId),
            inArray(manufacturers_properties_values.property_id, propertiesToDelete.map(p => p.id))
        ))

    }, {
        params: t.Object({
            manufacturerId: t.String()
        }),
        body: t.Object({
            properties: t.Array(t.Object({
                propertyId: t.String(),
                value: t.Union([t.String(), t.Number()])
            }))
        })
    })
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
                    additional_data: t.Optional(t.Unknown()),
                    show_in_filter: t.Optional(t.Boolean()),
                    show_in_list: t.Optional(t.Boolean())
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
                    additional_data: t.Optional(t.Unknown()),
                    show_in_filter: t.Optional(t.Boolean()),
                    show_in_list: t.Optional(t.Boolean())
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )