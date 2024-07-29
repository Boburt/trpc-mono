import { drizzleDb } from "@backend/lib/db";
import { productRequests } from "@backend/../drizzle/schema";
import { eq } from "drizzle-orm";
import { ru } from "date-fns/locale/ru";
import { format } from "date-fns";

export const processNewProductRequest = async (id: string) => {
    try {
        const productExistingRequest = await drizzleDb.query.productRequests.findFirst({
            where: eq(productRequests.id, id),
            columns: {
                id: true,
            }
        });

        console.log('productExistingRequest', productExistingRequest);

        if (!productExistingRequest) {
            return;
        }

        const productRequestData = await drizzleDb.select().from(productRequests).where(eq(productRequests.id, id)).limit(1).execute();
        const productRequestItem = productRequestData[0];
        const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            body: JSON.stringify({
                chat_id: process.env.PRODUCT_REQUEST_GROUP_ID,
                parse_mode: 'HTML',
                text: `<b>Поступила заявка на продукты #${productRequestItem.requestNumber}</b>.
<b>Клиент:</b> ${productRequestItem.firstName} ${productRequestItem.lastName}
<b>Дата создания:</b> ${format(new Date(productRequestItem.created_at), "dd.MM.yyyy HH:mm", {
                    locale: ru,
                })}
<b>Номер телефона:</b> ${productRequestItem.phone}
<b>E-mail:</b> ${productRequestItem.email}
                `,
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                "text": "Открыть заявку",
                                "login_url": { "url": `${process.env.FRONTEND_URL}/profile/products_requests/${productRequestItem.id}` }
                            }
                        ]
                    ]
                }
            }),
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {

    }
}