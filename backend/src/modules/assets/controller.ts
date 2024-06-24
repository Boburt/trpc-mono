import { ctx } from "@backend/context";
import { checkRestPermission } from "@backend/lib/check_rest_perm";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { assets } from "backend/drizzle/schema";
import { SQLWrapper, sql, and, InferSelectModel } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const assetsController = new Elysia({
    name: "@api/assets",
})
    .use(ctx)
    .post("/upload-assets", ({ body }) => {
        // return assetsService.addAsset(body);
        return {};
    }, {
        body: t.Object({
            model: t.String(),
            name: t.String(),
            file: t.File(),
            code: t.Optional(t.String()),
            model_id: t.Optional(t.String()),
        }),
        beforeHandle: checkRestPermission,
    })
    .get('/assets', async ({
        query: {
            limit,
            offset,
            fields,
            filters
        },
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

        if (!user.permissions.includes("assets.list")) {
            set.status = 401;
            return {
                message: "You don't have permissions",
            };
        }
        let selectFields: SelectedFields = {};
        if (fields) {
            selectFields = parseSelectFields(fields, assets, {});
        }
        let whereClause: (SQLWrapper | undefined)[] = [];
        if (filters) {
            whereClause = parseFilterFields(filters, assets, {});
        }
        const rolesCount = await drizzle
            .select({ count: sql<number>`count(*)` })
            .from(assets)
            .where(and(...whereClause))
            .execute();
        const rolesList = (await drizzle
            .select(selectFields)
            .from(assets)
            .where(and(...whereClause))
            .limit(+limit)
            .offset(+offset)
            .execute()) as InferSelectModel<typeof assets>[];
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