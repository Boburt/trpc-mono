import { sp_ticket_categories, sp_ticket_statuses } from "backend/drizzle/schema";
import { InferSelectModel, eq, sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";
import { ctx } from "@backend/context";

export const spTicketStatusesController = new Elysia({
  name: "@api/sp_ticket_statuses",
})
  .use(ctx)
  .get(
    "/sp_ticket_statuses",
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

      if (!user.permissions.includes("sp_ticket_statuses.list")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_ticket_statuses, {});
      }
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(sp_ticket_statuses)
        .execute();
      const rolesList = (await drizzle
        .select(selectFields)
        .from(sp_ticket_statuses)
        .limit(+limit)
        .offset(+offset)
        .execute()) as InferSelectModel<typeof sp_ticket_statuses>[];
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
  .get("/sp_ticket_statuses/cached", async ({ redis, user, set, cacheController }) => {
    if (!user) {
      set.status = 401;
      return {
        message: "User not found",
      };
    }

    if (!user.permissions.includes("sp_ticket_statuses.list")) {
      set.status = 401;
      return {
        message: "You don't have permissions",
      };
    }
    const res = await cacheController.getCachedSpTicketStatuses({});
    return res;
  })
  .get(
    "/sp_ticket_statuses/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_statuses.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      const permissionsRecord = await drizzle
        .select()
        .from(sp_ticket_statuses)
        .where(eq(sp_ticket_statuses.id, id))
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
    "/sp_ticket_statuses/:id",
    async ({ params: { id }, user, set, drizzle,
      cacheController }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_statuses.delete")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      const permissionsRecord = await drizzle
        .select({
          id: sp_ticket_statuses.id,
        })
        .from(sp_ticket_statuses)
        .where(eq(sp_ticket_statuses.id, id))
        .execute();

      await drizzle.delete(sp_ticket_statuses).where(eq(sp_ticket_statuses.id, id)).execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/sp_ticket_statuses",
    async ({ body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_statuses.add")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_ticket_statuses, {});
      }
      const result = await drizzle
        .insert(sp_ticket_statuses)
        .values(data)
        .returning(selectFields);

      return {
        data: result[0],
      };
    },
    {
      body: t.Object({
        data: t.Object({
          name: t.String({
            minLength: 1,
          }),
          code: t.Optional(t.Nullable(t.String())),
          color: t.Optional(t.Nullable(t.String())),
          sort: t.Number(),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .put(
    "/sp_ticket_statuses/:id",
    async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_ticket_statuses.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_ticket_statuses, {});
      }
      const result = await drizzle
        .update(sp_ticket_statuses)
        .set(data)
        .where(eq(sp_ticket_statuses.id, id))
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
          name: t.String({
            minLength: 1,
          }),
          code: t.Optional(t.Nullable(t.String())),
          color: t.Optional(t.Nullable(t.String())),
          sort: t.Number(),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
