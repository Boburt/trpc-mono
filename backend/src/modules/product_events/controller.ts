import Elysia, { t } from "elysia";
import { ctx } from "@backend/context";
import { product_events, products } from "../../../drizzle/schema";
import { eq, desc, gte, and } from "drizzle-orm";

export const productEventsController = new Elysia({
    name: "@api/product-events",
})
    .use(ctx)
    .post(
        "/product_events/:productId",
        async ({ params: { productId }, user, set, drizzle, body: {
            created_at
        } }) => {
            if (!user) {
                set.status = 401;
                return { message: "Unauthorized" };
            }

            if (!user.permissions.includes("products.add")) {
                set.status = 403;
                return { message: "Forbidden" };
            }

            const events = await drizzle
                .select()
                .from(product_events)
                .where(and(eq(product_events.product_id, productId), gte(product_events.created_at, new Date(created_at))))
                .orderBy(desc(product_events.created_at));

            return events;
        },
        {
            params: t.Object({
                productId: t.String(),
            }),
            body: t.Object({
                created_at: t.String(),
            }),
        }
    );