import { ctx } from "@backend/context";
import { productRequestItems, productRequests } from "backend/drizzle/schema";
import { Elysia, t } from "elysia";

export const productRequestsController = new Elysia({
    name: '@api/product_requests',
})
    .use(ctx)
    .post(
        "/product_requests",
        async ({ body, user, set, drizzle }) => {
            const { firstName, lastName, phone, email, products } = body;

            const newRequest = await drizzle
                .insert(productRequests)
                .values({
                    userId: user?.user.id,
                    firstName,
                    lastName,
                    phone,
                    email,
                })
                .returning()
                .execute();

            const requestId = newRequest[0].id;

            const requestItems = products.map((product: any) => ({
                requestId,
                productId: product.id,
                quantity: product.quantity
            }));

            await drizzle
                .insert(productRequestItems)
                .values(requestItems)
                .execute();

            return {
                message: "Product request submitted successfully",
                requestId,
            };
        },
        {
            body: t.Object({
                firstName: t.String(),
                lastName: t.String(),
                phone: t.String(),
                email: t.Optional(t.String()),
                products: t.Array(
                    t.Object({
                        id: t.String(),
                        quantity: t.Number(),
                    })
                ),
            }),
        }
    )
