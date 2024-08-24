import Elysia, { t } from "elysia";

import { ctx } from "@backend/context";

import { sp_tickets_timeline } from "backend/drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const spTicketTimelineController = new Elysia({
  name: "@api/sp_ticket_timeline",
})
  .use(ctx)
  .get(
    "/sp_ticket_timeline/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      const spTicketTimeline = await drizzle
        .select()
        .from(sp_tickets_timeline)
        .where(eq(sp_tickets_timeline.ticket_id, id))
        .orderBy(desc(sp_tickets_timeline.created_at))
        .execute();

      if (!spTicketTimeline.length) {
        set.status = 404;
        return {
          message: "spTicketTimeline not found",
        };
      }

      return spTicketTimeline;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
