
import { drizzleDb } from "@backend/lib/db";
import { forms, forms_sent_items, manufacturers, manufacturers_users, roles, sp_ticket_categories, sp_tickets, users, users_roles } from "backend/drizzle/schema";
import { SQLWrapper, and, eq, gt, gte, isNotNull, lt, lte } from "drizzle-orm";

export default async function processTicketStatusChange(id: string, status: string) {
    try {


        const ticket = await drizzleDb
            .select({
                id: sp_tickets.id,
                name: sp_tickets.name,
                created_by: sp_tickets.created_by,
            })
            .from(sp_tickets)
            .where(eq(sp_tickets.id, id))
            .execute();

        if (ticket.length == 0) {
            return;
        }

        const user = await drizzleDb
            .select({
                id: users.id,
                tg_id: users.tg_id,
            })
            .from(users)
            .where(and(
                eq(users.id, ticket[0].created_by!),
                isNotNull(users.tg_id),
            ))
            .execute();

        if (user.length == 0) {
            return;
        }

        const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            body: JSON.stringify({
                chat_id: user[0].tg_id,
                parse_mode: 'HTML',
                text: `<b>Статус Вашего обращения изменён.</b>\n<b>Тема:</b> ${ticket[0].name}\n<b>Новый статус:</b> ${status}`,
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                "text": "Открыть обращение",
                                "login_url": { "url": `${process.env.FRONTEND_URL}/profile/requests/${ticket[0].id}` }
                            }
                        ]
                    ]
                }
            }),
            headers: { "Content-Type": "application/json" },
        });

    } catch (e) {
        console.log("davr", e);
    }
}