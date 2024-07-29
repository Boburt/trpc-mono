import { drizzleDb } from "@backend/lib/db";
import { productRequests } from "@backend/../drizzle/schema";
import { eq } from "drizzle-orm";

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
        /*const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            body: JSON.stringify({
                chat_id: process.env.PRODUCT_REQUEST_GROUP_ID,
                parse_mode: 'HTML',
                text: `<b>Пожалуйста заполните форму "${form.name}"</b>.`,
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                "text": "Открыть форму",
                                "login_url": { "url": `${process.env.FRONTEND_URL}/profile/forms/apply/${sentItem.id}` }
                            }
                        ]
                    ]
                }
            }),
            headers: { "Content-Type": "application/json" },
        });*/
    } catch (error) {

    }
}