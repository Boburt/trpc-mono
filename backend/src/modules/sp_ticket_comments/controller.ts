import Elysia, { t } from "elysia";

import { ctx } from "@backend/context";

import { sp_tickets_comments, users } from "backend/drizzle/schema";
import { eq, desc, asc, sql } from "drizzle-orm";

export const spTicketCommentsController = new Elysia({
  name: "@api/sp_ticket_comments",
})
  .use(ctx)
  .post(
    "/sp_ticket_comments",
    async ({ body: { data }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }
      await drizzle
        .insert(sp_tickets_comments)
        .values({
          ...data,
          user_id: user.user.id,
          created_at: new Date().toISOString(),
        })
        .returning({ comment_id: sp_tickets_comments.id })
        .execute();
    },
    {
      body: t.Object({
        data: t.Object({
          comment: t.String(),
          ticket_id: t.String(),
        }),
      }),
    }
  )
  .get(
    "/sp_ticket_comments/:id",
    async ({
      params: { id },
      query: { limit, offset },
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
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(sp_tickets_comments)
        .where(eq(sp_tickets_comments.ticket_id, id))
        .execute();
      const comments = await drizzle
        .select({
          id: sp_tickets_comments.id,
          comment: sp_tickets_comments.comment,
          created_at: sp_tickets_comments.created_at,
          user: {
            first_name: users.first_name,
            last_name: users.last_name,
          },
        })
        .from(sp_tickets_comments)
        .where(eq(sp_tickets_comments.ticket_id, id))
        .leftJoin(users, eq(users.id, sp_tickets_comments.user_id))
        .limit(+limit)
        .offset(+offset)
        .orderBy(asc(sp_tickets_comments.created_at))
        .execute();
      return { data: comments, total: rolesCount[0].count };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      query: t.Object({
        limit: t.String(),
        offset: t.String(),
      }),
    }
  );
