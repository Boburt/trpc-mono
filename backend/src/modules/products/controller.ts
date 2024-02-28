import Elysia, { error, t } from "elysia";
import { ctx } from "@backend/context";
import {
  manufacturers_users,
  products,
  permissions,
} from "../../../drizzle/schema";
import { InferSelectModel, eq, sql, SQLWrapper, and } from "drizzle-orm";
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
          price: t.Optional(t.Nullable(t.Number())),
          properties: t.Optional(t.Record(t.String(), t.Any())),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .get(
    "/products",
    async ({
      user,
      set,
      drizzle,
      query: { limit, offset, sort, filters, fields },
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
      const manufacturer_id = await drizzle
        .select({
          manufacturer_id: manufacturers_users.manufacturer_id,
        })
        .from(manufacturers_users)
        .where(eq(manufacturers_users.user_id, user.user.id))
        .execute();
      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, products, {});
      }

      let whereClause: (SQLWrapper | undefined)[] = [];

      if (filters) {
        whereClause = parseFilterFields(filters, products, {
          permissions,
        });
      }

      const productsCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(
          and(
            eq(products.manufacturer_id, manufacturer_id[0].manufacturer_id),
            ...whereClause
          )
        )
        .execute();

      const productsList = (await drizzle
        .select(selectFields)
        .from(products)
        .where(and(...whereClause))
        .limit(+limit)
        .offset(+offset)
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
        filters: t.Optional(t.String()),
        fields: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/products/:id",
    async ({ user, set, drizzle, params: { id } }) => {
      if (!user) {
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("products.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      const product = await drizzle
        .select()
        .from(products)
        .where(eq(products.id, id))
        .execute();

      return product[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .put(
    "/products/:id",
    async ({ user, set, drizzle, body, params: { id } }) => {
      if (!user) {
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("products.edit")) {
        set.status = 401;

        return {
          message: "You don't have permissions",
        };
      }

      const updatedProduct = await drizzle
        .update(products)
        .set({
          ...body.data,
        })
        .where(eq(products.id, id))
        .returning()
        .execute();

      return updatedProduct[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        data: t.Object({
          active: t.Optional(t.Boolean()),
          name: t.Optional(t.String()),
          description: t.Optional(t.String()),
          price: t.Optional(t.Nullable(t.Number())),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
