import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { manufacturers_categories, permissions, manufacturers_properties } from "backend/drizzle/schema";
import { SQLWrapper, sql, and, InferSelectModel, eq } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const manufacturersCategoriesController = new Elysia({
    name: '@api/manufacturers_categories'
})
    .use(ctx)
    .get('/manufacturers_categories', async ({
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

        if (!user.permissions.includes("manufacturers_categories.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        let selectFields: SelectedFields = {};
        if (fields) {
            selectFields = parseSelectFields(fields, manufacturers_categories, {});
        }
        let whereClause: (SQLWrapper | undefined)[] = [];
        if (filters) {
            whereClause = parseFilterFields(filters, manufacturers_categories, {
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
    }, {
        query: t.Object({
            limit: t.String(),
            offset: t.String(),
            sort: t.Optional(t.String()),
            filters: t.Optional(t.String()),
            fields: t.Optional(t.String()),
        }),
    })
    .post('/manufacturers_categories/assign_category', async ({
        body: { manufacturer_id, category_id },
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

        if (!user.permissions.includes("manufacturers_categories.add")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }

        await drizzle.delete(manufacturers_categories).where(eq(manufacturers_categories.manufacturer_id, manufacturer_id)).execute();

        await drizzle.insert(manufacturers_categories).values(category_id.map(id => ({
            manufacturer_id,
            category_id: id
        }))).execute();

        return {
            success: true
        }
    }, {
        body: t.Object({
            manufacturer_id: t.String(),
            category_id: t.Array(t.String())
        })
    })