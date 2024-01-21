import Elysia, { t } from "elysia";

import { ctx } from "@backend/context";

import { sp_tickets_timeline } from "backend/drizzle/schema";
import { eq } from "drizzle-orm";

export const spTicketTimelineController = new Elysia({
  name: "@api/sp_ticket_timescale",
})
  .use(ctx)
  .get(
    "/sp_ticket_timescale/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      const spTicketTimescale = await drizzle
        .select()
        .from(sp_tickets_timeline)
        .where(eq(sp_tickets_timeline.ticket_id, id))
        .execute();

      if (!spTicketTimescale.length) {
        set.status = 404;
        return {
          message: "spTicketTimescale not found",
        };
      }

      return spTicketTimescale[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
