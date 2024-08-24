import { sp_ticket_categories, sp_ticket_statuses, sp_tickets } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type SpTicketsRelatedList = InferSelectModel<typeof sp_tickets> & {
    sp_ticket_statuses: InferSelectModel<typeof sp_ticket_statuses>;
    sp_ticket_categories: InferSelectModel<typeof sp_ticket_categories>;
};