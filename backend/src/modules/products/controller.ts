import Elysia, { t } from "elysia";
import { ctx } from "@backend/context";
import { manufacturers_users, products } from "../../../drizzle/schema";
import { InferSelectModel, eq, sql } from "drizzle-orm";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";

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

      if (!user.permissions.includes("products.add")) {
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

      const newProduct = await drizzle
        .insert(products)
        .values({
          ...body.data,
          manufacturer_id: manufacturer_id[0].manufacturer_id,
        })
        .returning()
        .execute();
      return newProduct[0];
    },
    {
      body: t.Object({
        data: t.Object({
          active: t.Boolean(),
          name: t.String(),
          description: t.Optional(t.String()),
          price: t.Optional(t.Number()),
        }),
      }),
    }
  )
  .get(
    "/products",
    async ({
      user,
      set,
      drizzle,
      query: {
        limit,
        offset,
        sort,
        //filter,
        // fields
      },
    }) => {
      if (!user) {
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("products.list")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      // let selectFields: SelectedFields = {};
      // if (fields) {
      //   selectFields = parseSelectFields(fields, products, {});
      // }

      const manufacturer_id = await drizzle
        .select({
          manufacturer_id: manufacturers_users.manufacturer_id,
        })
        .from(manufacturers_users)
        .where(eq(manufacturers_users.user_id, user.user.id))
        .execute();

      const productsCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(eq(products.manufacturer_id, manufacturer_id[0].manufacturer_id))
        .execute();

      const productsList = (await drizzle
        .select()
        .from(products)
        .where(eq(products.manufacturer_id, manufacturer_id[0].manufacturer_id))
        .limit(+limit)
        .offset(+offset)
        //.sort(sort)
        //.filter(parseFilterFields(filter, products))
        .execute()) as InferSelectModel<typeof products>[];

      return {
        total: productsCount[0].count,
        data: productsList,
      };
    },
    {
      query: t.Object({
        limit: t.Numeric(),
        offset: t.Numeric(),
        sort: t.Optional(t.String()),
        filter: t.Optional(t.String()),
        fields: t.Optional(t.String()),
      }),
    }
  );
