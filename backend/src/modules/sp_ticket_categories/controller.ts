import { sp_ticket_categories } from "backend/drizzle/schema";
import { InferSelectModel, eq, sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";
import { ctx } from "@backend/context";

export const spTicketCategoriesController = new Elysia({
  name: "@api/sp_ticket_categories",
})
  .use(ctx)
  .get(
    "/sp_ticket_categories",
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

      if (!user.permissions.includes("sp_ticket_categories.list")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_ticket_categories, {});
      }
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(sp_ticket_categories)
        .execute();
      const rolesList = (await drizzle
        .select(selectFields)
        .from(sp_ticket_categories)
        .limit(+limit)
        .offset(+offset)
        .execute()) as InferSelectModel<typeof sp_ticket_categories>[];
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
  .get("/sp_ticket_categories/cached", async ({ redis, user, set, cacheController }) => {
    if (!user) {
      set.status = 401;
      return {
        message: "User not found",
      };
    }

    if (!user.permissions.includes("sp_ticket_categories.list")) {
      set.status = 401;
      return {
        message: "You don't have permissions",
      };
    }
    const res = await cacheController.getCachedSpTicketCategories({});
    return res;
  })
  .get(
    "/sp_ticket_categories/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_categories.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      const permissionsRecord = await drizzle
        .select()
        .from(sp_ticket_categories)
        .where(eq(sp_ticket_categories.id, id))
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
    "/sp_ticket_categories/:id",
    async ({ params: { id }, user, set, drizzle,
      cacheController }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_categories.delete")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      const permissionsRecord = await drizzle
        .select({
          id: sp_ticket_categories.id,
        })
        .from(sp_ticket_categories)
        .where(eq(sp_ticket_categories.id, id))
        .execute();

      await drizzle.delete(sp_ticket_categories).where(eq(sp_ticket_categories.id, id)).execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/sp_ticket_categories",
    async ({ body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_categories.add")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_ticket_categories, {});
      }
      const result = await drizzle
        .insert(sp_ticket_categories)
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
          description: t.Optional(t.String()),
          sort: t.Number(),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .put(
    "/sp_ticket_categories/:id",
    async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_categories.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_ticket_categories, {});
      }
      const result = await drizzle
        .update(sp_ticket_categories)
        .set(data)
        .where(eq(sp_ticket_categories.id, id))
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
          description: t.Optional(t.String()),
          sort: t.Number(),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
