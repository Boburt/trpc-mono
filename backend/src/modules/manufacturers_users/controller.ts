import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { manufacturers_users, manufacturers, users } from "backend/drizzle/schema";
import { SQLWrapper, sql, eq, and, InferSelectModel, getTableColumns } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";

export const ManufacturersUsersController = new Elysia({
    name: '@api/manufacturers_users'
})
    .use(ctx)
    .get(
        "/manufacturers_users",
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
                selectFields = parseSelectFields(fields, manufacturers_users, {
                    manufacturers,
                    users
                });
            }
            let whereClause: (SQLWrapper | undefined)[] = [];
            if (filters) {
                whereClause = parseFilterFields(filters, manufacturers_users, {
                    manufacturers,
                    users
                });
            }

            const rolesCount = await drizzle
                .select({ count: sql<number>`count(*)` })
                .from(manufacturers_users)
                .leftJoin(
                    manufacturers,
                    eq(manufacturers_users.manufacturer_id, manufacturers.id)
                )
                .leftJoin(
                    users,
                    eq(manufacturers_users.user_id, users.id)
                )
                .where(and(...whereClause))
                .execute();
            const rolesList = (await drizzle
                .select(selectFields)
                .from(manufacturers_users)
                .leftJoin(
                    manufacturers,
                    eq(manufacturers_users.manufacturer_id, manufacturers.id)
                )
                .leftJoin(
                    users,
                    eq(manufacturers_users.user_id, users.id)
                )
                .where(and(...whereClause))
                .limit(+limit)
                .offset(+offset)
                .execute()) as InferSelectModel<typeof manufacturers_users>[];
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
                filters: t.Optional(
                    t.String()
                ),
                fields: t.Optional(
                    t.String()
                ),
            }),
        }
    )

