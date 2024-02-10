import Elysia, { t } from "elysia";
import { ctx } from "@backend/context";
import { manufacturers_users, products } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";

export const productsController = new Elysia({
  name: "@api/products",
})
  .use(ctx)
  .post(
    "/products",
    async ({ body, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("products.create")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      const manufacturer_id = await drizzle
        .select({
          manufacturer_id: manufacturers_users.manufacturer_id,
        })
        .from(manufacturers_users)
        .where(eq(manufacturers_users.user_id, user.user.id))
        .execute();

      await drizzle
        .insert(products)
        .values({
          ...body,
          manufacturer_id: manufacturer_id[0].manufacturer_id,
        })
        .returning()
        .execute();
    },
    {
      body: t.Object({
        active: t.Boolean(),
        name: t.String(),
        description: t.Optional(t.String()),
        price: t.Optional(t.Number()),
      }),
    }
  );
