import {
  sp_ticket_categories,
  sp_ticket_statuses,
  sp_tickets,
  sp_tickets_timeline,
} from "backend/drizzle/schema";
import {
  InferSelectModel,
  SQLWrapper,
  and,
  desc,
  eq,
  getTableColumns,
  isNotNull,
  or,
  sql,
} from "drizzle-orm";
import Elysia, { t } from "elysia";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";
import { ctx } from "@backend/context";
import { SpTicketsRelatedList } from "./sp_tickets.dto";
import { parseFilterFields } from "@backend/lib/parseFilterFields";

export const spTicketsController = new Elysia({
  name: "@api/sp_tickets",
})
  .use(ctx)
  .get(
    "/sp_tickets",
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
        selectFields = parseSelectFields(fields, sp_tickets, {
          sp_ticket_statuses,
          sp_ticket_categories,
        });
      }
      let whereClause: (SQLWrapper | undefined)[] = [];
      if (filters) {
        whereClause = parseFilterFields(filters, sp_tickets, {
          sp_ticket_statuses,
          sp_ticket_categories,
        });
      }
      if (user.permissions.includes("sp_tickets.edit")) {
        whereClause.push(
          or(
            eq(sp_tickets.created_by, user.user.id),
            isNotNull(sp_tickets.created_by)
          )
        );
      } else {
        whereClause.push(eq(sp_tickets.created_by, user.user.id));
      }
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(sp_tickets)
        .leftJoin(
          sp_ticket_statuses,
          eq(sp_ticket_statuses.id, sp_tickets.status_id)
        )
        .leftJoin(
          sp_ticket_categories,
          eq(sp_ticket_categories.id, sp_tickets.category_id)
        )
        .where(and(...whereClause))
        .execute();
      const rolesList = (await drizzle
        .select(selectFields)
        .from(sp_tickets)
        .leftJoin(
          sp_ticket_statuses,
          eq(sp_ticket_statuses.id, sp_tickets.status_id)
        )
        .leftJoin(
          sp_ticket_categories,
          eq(sp_ticket_categories.id, sp_tickets.category_id)
        )
        .where(and(...whereClause))
        .limit(+limit)
        .offset(+offset)
        .orderBy(desc(sp_tickets.created_at))
        .execute()) as SpTicketsRelatedList[];
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
    async ({ params: { id }, user, set, drizzle, cacheController }) => {
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
    async ({ body: { data, fields }, user, set, drizzle, cacheController, newTicketQueue }) => {
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

      const spTicketStatuses = await cacheController.getCachedSpTicketStatuses(
        {}
      );

      const firstTicketStatus = spTicketStatuses.find(
        (status) => status.sort == 1
      );
      const result = await drizzle
        .insert(sp_tickets)
        .values({
          ...data,
          created_by: user.user.id,
          created_at: new Date().toISOString(),
          status_id: firstTicketStatus!.id,
        })
        .returning({
          id: sp_tickets.id,
        });

      await newTicketQueue.add(result[0].id, {
        id: result[0].id,
      }, {
        removeOnComplete: true,
        removeOnFail: true,
      })

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
    async ({
      params: { id },
      body: { data, fields },
      user,
      set,
      drizzle,
      cacheController,
      ticketStatusChangedQueue
    }) => {
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

      const prevData = await drizzle
        .select()
        .from(sp_tickets)
        .where(eq(sp_tickets.id, id))
        .execute();

      if (!prevData[0]) {
        set.status = 404;
        return {
          message: "Not found",
        };
      }

      const result = await drizzle
        .update(sp_tickets)
        // @ts-ignore
        .set(data)
        .where(eq(sp_tickets.id, id))
        .returning(selectFields);
      if (prevData[0].status_id !== data.status_id) {
        const spTicketStatuses =
          await cacheController.getCachedSpTicketStatuses({});
        const prevStatus = spTicketStatuses.find(
          (status) => status.id === prevData[0].status_id
        );
        const nextStatus = spTicketStatuses.find(
          (status) => status.id === data.status_id
        );
        if (prevStatus && nextStatus) {
          try {
            await drizzle
              .insert(sp_tickets_timeline)
              .values({
                ticket_id: id,
                user_id: user.user.id,
                timeline_type: "status",
                before_value: prevStatus.name,
                after_value: nextStatus.name,
                created_at: new Date().toISOString(),
                comment: "",
              })
              .execute();
            await ticketStatusChangedQueue.add(id, {
              id,
              newStatus: nextStatus.name,
            }, {
              removeOnComplete: true,
              removeOnFail: true,
            })
          } catch (e) {
            console.log("e", e);
          }
        }
      }

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
  );
