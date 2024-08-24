
import { drizzleDb } from "@backend/lib/db";
import { forms, forms_sent_items, manufacturers, manufacturers_users, roles, sp_ticket_categories, sp_tickets, users, users_roles } from "backend/drizzle/schema";
import { SQLWrapper, and, eq, gt, gte, isNotNull, lt, lte } from "drizzle-orm";

export default async function processNewTicket(id: string) {
    try {

        const ticket = await drizzleDb
            .select({
                id: sp_tickets.id,
                name: sp_tickets.name,
                description: sp_tickets.description,
                category: sp_ticket_categories.name,
            })
            .from(sp_tickets)
            .leftJoin(sp_ticket_categories, eq(sp_ticket_categories.id, sp_tickets.category_id))
            .where(eq(sp_tickets.id, id))
            .execute();

        if (ticket.length == 0) {
            return;
        }

        const prom_operators = await drizzleDb
            .select({
                id: users.id,
                tg_id: users.tg_id,
            })
            .from(users)
            .leftJoin(users_roles, eq(users_roles.user_id, users.id))
            .leftJoin(roles, eq(roles.id, users_roles.role_id))
            .where(and(
                eq(roles.code, 'prom_operator'),
                isNotNull(users.tg_id),
                eq(users.status, 'active')
            ))
            .execute();

        const prom_operators_tg_ids = prom_operators.map((prom_operator) => prom_operator.tg_id).filter((value, index, self) => self.indexOf(value) === index);

        if (prom_operators_tg_ids.length == 0) {
            return;
        }

        for (const prom_operator_tg_id of prom_operators_tg_ids) {
            const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
                method: "POST",
                body: JSON.stringify({
                    chat_id: prom_operator_tg_id,
                    parse_mode: 'HTML',
                    text: `<b>Добавлено новое обращение</b>\n<b>Тема:</b> ${ticket[0].name}\n<b>Описание:</b> ${ticket[0].description}\n<b>Категория:</b> ${ticket[0].category}`,
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
        }

    } catch (e) {
        console.log("davr", e);
    }
}