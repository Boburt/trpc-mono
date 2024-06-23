import Elysia, { error, t } from "elysia";
import { ctx } from "@backend/context";
import {
  manufacturers_users,
  products,
  permissions,
  manufacturers,
  products_properties,
  products_categories,
  assets,
} from "../../../drizzle/schema";
import { InferSelectModel, eq, sql, SQLWrapper, and, asc, desc } from "drizzle-orm";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";
import fs from "fs";
import path from "path";
import { ProductProperties } from "./dtos/one.dto";

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
          description: t.Optional(t.Nullable(t.String())),
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
        .orderBy(desc(products.created_at))
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

      let res = product[0];

      res.properties = {
        fabric_type: res.properties?.fabric_type ?? "",
        raw_material: res.properties?.raw_material ?? "",
        fabric_density: res.properties?.fabric_density ?? "",
        color_and_design: res.properties?.color_and_design ?? "",
        strength_resistance: res.properties?.strength_resistance ?? "",
        product_tech: res.properties?.product_tech ?? "",
      } as ProductProperties;

      return res;
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
          description: t.Optional(t.Nullable(t.String())),
          price: t.Optional(t.Nullable(t.Number())),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .post('/products/batch', async ({ user, set, drizzle, body: { data } }) => {
    // if (!user) {
    //   return {
    //     message: "User not found",
    //   };
    // }

    // if (!user.permissions.includes("products.add")) {
    //   set.status = 401;

    //   return {
    //     message: "You don't have permissions",
    //   };
    // }

    for (const product of data) {
      const randormManufacturer = await drizzle.select().from(manufacturers).orderBy(sql`RANDOM()`).limit(1);
      const newProduct = await drizzle.insert(products).values({
        active: true,
        name: product.name,
        description: product.description,
        price: product.price,
        manufacturer_id: randormManufacturer[0].id
      }).returning({
        id: products.id,
      });

      const file = await Bun.file(product.image_url);
      const fileName = product.image_url.split("/").pop();

      const asset = await drizzle.insert(assets).values({
        model: "products",
        model_id: newProduct[0].id,
        mime_type: file.type,
        name: fileName!,
        size: file.size,
        path: "sources",
        code: 'source',
      }).returning({
        id: assets.id,
      });
      await fs.mkdirSync(`../uploads/sources/${asset[0].id}`, { recursive: true });

      const outputFile = Bun.file(path.resolve(`../uploads/sources/${asset[0].id}/${fileName}`));
      console.log('outputFile', outputFile.name)

      const response = await fetch(product.image_url);
      /** @ts-ignore */
      await Bun.write(outputFile, response);

      await drizzle.insert(products_properties).values([{
        product_id: newProduct[0].id,
        property_id: '6efc1fd8-38ab-477d-93fe-5f7c0fc03c03',
        value: product.properties.fabric_type,
      }, {
        product_id: newProduct[0].id,
        property_id: 'e70175de-b906-4125-b027-19339840613c',
        value: product.properties.raw_material,
      }, {
        product_id: newProduct[0].id,
        property_id: '04fa8dd4-f7fa-4ef3-ab68-f41568558587',
        value: product.properties.fabric_density,
      }, {
        product_id: newProduct[0].id,
        property_id: 'f7744227-e547-4d9f-ba5c-a7b8d6fd1737',
        value: product.properties.color_and_design,
      }, {
        product_id: newProduct[0].id,
        property_id: '26128908-a7fa-4869-8f3d-bd76a13eb0db',
        value: product.properties.strength_resistance,
      }, {
        product_id: newProduct[0].id,
        property_id: '426434ac-e3d0-4ac2-a1ec-40d0f95dff63',
        value: product.properties.product_tech,
      }]);

      await drizzle.insert(products_categories).values([{
        product_id: newProduct[0].id,
        category_id: product.category_id,
      }]);
    }



    return {
      success: true,
    };
  }, {
    body: t.Object({
      data: t.Array(t.Object({
        category_id: t.String(),
        name: t.String(),
        description: t.String(),
        price: t.Number(),
        image_url: t.String(),
        properties: t.Object({
          fabric_type: t.String(),
          raw_material: t.String(),
          fabric_density: t.String(),
          color_and_design: t.String(),
          strength_resistance: t.String(),
          product_tech: t.String(),
        }),
      })),
    }),
  });
