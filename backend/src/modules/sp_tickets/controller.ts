import { sp_ticket_categories, sp_ticket_statuses, sp_tickets } from "backend/drizzle/schema";
import { InferSelectModel, and, eq, getTableColumns, sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";
import { ctx } from "@backend/context";

export const spTicketsController = new Elysia({
  name: "@api/sp_tickets",
})
  .use(ctx)
  .get(
    "/sp_tickets",
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

      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_tickets, {});
      }
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(sp_tickets)
        .where(and(
          eq(sp_tickets.created_by, user.user.id)
        ))
        .execute();
      const rolesList = (await drizzle
        .select(selectFields)
        .from(sp_tickets)
        .where(and(
          eq(sp_tickets.created_by, user.user.id)
        ))
        .limit(+limit)
        .offset(+offset)
        .execute()) as InferSelectModel<typeof sp_tickets>[];
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
    "/sp_tickets/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_tickets.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      const permissionsRecord = await drizzle
        .select()
        .from(sp_tickets)
        .where(eq(sp_tickets.id, id))
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
    "/sp_tickets/:id",
    async ({ params: { id }, user, set, drizzle,
      cacheController }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_tickets.delete")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      const permissionsRecord = await drizzle
        .select({
          id: sp_tickets.id,
        })
        .from(sp_tickets)
        .where(eq(sp_tickets.id, id))
        .execute();

      await drizzle.delete(sp_tickets).where(eq(sp_tickets.id, id)).execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/sp_tickets",
    async ({ body: { data, fields }, user, set, drizzle, cacheController }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_tickets, {});
      } else {
        selectFields = getTableColumns(sp_tickets);
      }

      const spTicketStatuses = await cacheController.getCachedSpTicketStatuses({});

      const firstTicketStatus = spTicketStatuses.find((status) => status.sort == 1);
      console.log('firstTicketStatus', firstTicketStatus)
      const result = await drizzle
        .insert(sp_tickets)
        .values({
          ...data,
          created_by: user.user.id,
          created_at: new Date().toISOString(),
          status_id: firstTicketStatus!.id
        })
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
          description: t.Optional(t.Nullable(t.String())),
          category_id: t.String(),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .put(
    "/sp_tickets/:id",
    async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("sp_tickets.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, sp_tickets, {});
      }
      const result = await drizzle
        .update(sp_tickets)
        .set(data)
        .where(eq(sp_tickets.id, id))
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
          description: t.Optional(t.Nullable(t.String())),
          category_id: t.String(),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
