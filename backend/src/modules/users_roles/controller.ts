import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { users_roles } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq, SQLWrapper, and } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const usersRolesController = new Elysia({
    name: '@api/users_roles'
})
    .use(ctx)
    .get(
        "/users_roles",
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

            if (!user.permissions.includes("users_roles.list")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields: SelectedFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, users_roles, {});
            }
            let whereClause: (SQLWrapper | undefined)[] = [];
            if (filters) {
                whereClause = parseFilterFields(filters, users_roles, {});
            }
            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(users_roles)
                .where(and(...whereClause))
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(users_roles)
                .where(and(...whereClause))
                .limit(+limit)
                .offset(+offset)
                .execute()) as InferSelectModel<typeof users_roles>[];
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
    .post(
        "/users_roles",
        async ({ body: { data, fields }, user, set, drizzle }) => {
            if (!user) {
                set.status = 401;
                return {
                    message: "User not found",
                };
            }

            if (!user.permissions.includes("users_roles.add")) {
                set.status = 401;
                return {
                    message: "You don't have permissions",
                };
            }
            let selectFields = {};
            if (fields) {
                selectFields = parseSelectFields(fields, users_roles, {});
            }
            const result = await drizzle
                .insert(users_roles)
                .values(data)
                .returning(selectFields);

            return {
                data: result[0],
            };
        },
        {
            body: t.Object({
                data: t.Object({
                    user_id: t.String(),
                    role_id: t.String(),
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
        }
    )