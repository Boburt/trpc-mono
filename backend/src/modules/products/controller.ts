import Elysia, { t } from "elysia";
import { ctx } from "@backend/context";
import {
  manufacturers_users,
  products,
  permissions,
  manufacturers,
  products_properties,
  products_categories,
  assets,
  properties,
  categories,
  product_events,
} from "../../../drizzle/schema";
import {
  InferSelectModel,
  eq,
  sql,
  SQLWrapper,
  and, desc,
  inArray,
  getTableColumns
} from "drizzle-orm";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { SelectedFields } from "drizzle-orm/pg-core";
import fs from "fs";
import path from "path";
import { ProductProperties } from "./dtos/one.dto";
import { ProductsWithRelations } from "./dtos/list.dto";
import typesenseClient from "@backend/lib/typesense";
import { TypesenseProduct, TypesenseProductWithRelations } from "./typesense_schema";


const esUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/`;
const indexName = `${process.env.PROJECT_PREFIX}products`;

const indexProducts = `${process.env.PROJECT_PREFIX}products`;

type CategoryDataType = Pick<typeof categories.$inferSelect, "code" | "name"> | null;

export const productsController = new Elysia({
  name: "@api/products",
})
  .use(ctx)
  .get(
    "/products/public/facets",
    async ({
      drizzle,
      query: { filters, category, properties, query },
    }) => {
      const searchParameters: any = {
        q: query || '*',
        query_by: 'name,description,manufacturer_name,category',
        filter_by: 'active:=true',
        facet_by: 'properties',
        max_facet_values: 100,
        per_page: 0
      };

      // Handle category filtering
      if (category) {
        const categoryHierarchyQuery = sql.raw(`
          WITH RECURSIVE category_hierarchy AS (
            SELECT id, name, parent_id
            FROM categories
            WHERE code = '${category}' AND active = true
            UNION ALL
            SELECT c.id, c.name, c.parent_id
            FROM categories c
            INNER JOIN category_hierarchy ch ON ch.id = c.parent_id
            WHERE c.active = true
          )
          SELECT id FROM category_hierarchy;
        `);

        const categoryHierarchyResult = await drizzle.execute<{
          id: string;
        }>(categoryHierarchyQuery);

        const categoryIds = categoryHierarchyResult.map((row) => row.id);
        if (categoryIds.length > 0) {
          searchParameters.filter_by += ` && category_id:=[${categoryIds.join(',')}]`;
        }
      }

      // Handle property filtering
      if (properties) {
        const propertiesFilter = properties.split(',').map(prop => `properties:=${prop}`).join(' && ');
        searchParameters.filter_by += ` && (${propertiesFilter})`;
      }

      try {
        const searchResults = await typesenseClient
          .collections(indexProducts)
          .documents()
          .search(searchParameters);

        const facets = searchResults.facet_counts
          .find(facet => facet.field_name === 'properties')?.counts || [];

        const processedFacets = facets.reduce((acc, facet) => {
          const [name, value] = facet.value.split(':');
          if (!acc[name]) {
            acc[name] = [];
          }
          acc[name].push({ key: value, doc_count: facet.count });
          return acc;
        }, {});

        const propertiesFacet = Object.entries(processedFacets).map(([key, values]) => ({
          key,
          values
        }));

        const priceStats = await typesenseClient
          .collections(indexProducts)
          .documents()
          .search({
            ...searchParameters,
            facet_by: 'price_rub',
            per_page: 0
          });

        const priceRange = priceStats.facet_counts
          .find(facet => facet.field_name === 'price_rub')?.stats || { min: 0, max: 0 };

        return {
          properties: propertiesFacet,
          priceRange: {
            min: priceRange.min / 100, // Convert cents to dollars
            max: priceRange.max / 100
          }
        };
      } catch (error) {
        console.error("Error fetching facets:", error);
        throw new Error("Failed to fetch facets");
      }
    },
    {
      query: t.Object({
        filters: t.Optional(t.String()),
        category: t.Optional(t.String()),
        properties: t.Optional(t.Nullable(t.String())),
        query: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/products/public/data",
    async ({
      drizzle,
      query: { limit, page, sort, properties, fields, category, query },
    }) => {
      const searchParameters: any = {
        q: query || '*',
        query_by: 'name,description,manufacturer_name,category',
        filter_by: 'active:=true',
        per_page: limit,
        page: page,
        sort_by: sort || 'created_at_timestamp:desc'
      };

      // Handle category filtering
      if (category) {
        const categoryHierarchyQuery = sql.raw(`
          WITH RECURSIVE category_hierarchy AS (
            SELECT id, name, parent_id
            FROM categories
            WHERE code = '${category}' AND active = true
            UNION ALL
            SELECT c.id, c.name, c.parent_id
            FROM categories c
            INNER JOIN category_hierarchy ch ON ch.id = c.parent_id
            WHERE c.active = true
          )
          SELECT id FROM category_hierarchy;
        `);

        const categoryHierarchyResult = await drizzle.execute<{
          id: string;
        }>(categoryHierarchyQuery);

        const categoryIds = categoryHierarchyResult.map((row) => row.id);
        if (categoryIds.length > 0) {
          searchParameters.filter_by += ` && category_id:=[${categoryIds.join(',')}]`;
        }
      }

      // Handle property filtering
      if (properties) {
        const propertiesFilter = properties.split(',').map(prop => {
          const [propName, propValue] = prop.split(':');
          return `properties:=${propName}:${propValue}`;
        }).join(' && ');
        searchParameters.filter_by += ` && (${propertiesFilter})`;
      }

      try {
        const searchResults = await typesenseClient
          .collections<TypesenseProductWithRelations>(indexProducts)
          .documents()
          .search(searchParameters);

        const products = searchResults?.hits?.map(hit => {
          const document = hit.document;
          const processedProperties = document.properties.reduce((acc, prop) => {
            const [name, value] = prop.split(':');
            if (!acc[name]) {
              acc[name] = [];
            }
            acc[name].push(value);
            return acc;
          }, {});

          return {
            ...document,
            created_at: new Date(document.created_at).toISOString(),
            updated_at: new Date(document.updated_at).toISOString(),
            properties: Object.entries(processedProperties).map(([name, values]) => ({
              name,
              value: values.join(', ') // Join multiple values if they exist
            })),
            images: [] // We'll populate this later
          };
        });

        // Fetch images for the products
        if (products && products.length > 0) {
          const images = await drizzle.query.assets.findMany({
            where: and(
              eq(assets.code, "source"),
              eq(assets.model, "products"),
              inArray(
                assets.model_id,
                products.map((p) => p.id)
              )
            ),
          });

          products.forEach((p) => {
            p.images = images
              .filter((i) => i.model_id === p.id)
              .map((i) => ({
                path: `/public/${i.path}/${i.id}/${i.name}`,
                code: i.code ?? "",
              }));
          });
        }

        // Fetch category data if category is specified
        let categoryData: CategoryDataType = null;
        if (category) {
          categoryData = await drizzle.query.categories.findFirst({
            where: eq(categories.code, category),
            columns: {
              code: true,
              name: true,
            },
          }) as CategoryDataType;
        }

        return {
          products,
          total: searchResults.found,
          totalPages: Math.ceil(searchResults.found / limit),
          categoryData,
        };
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
    },
    {
      query: t.Object({
        limit: t.Numeric(),
        page: t.Numeric(),
        sort: t.Optional(t.String()),
        fields: t.Optional(t.String()),
        category: t.Optional(t.String()),
        query: t.Optional(t.String()),
        properties: t.Optional(t.Nullable(t.String())),
      }),
    }
  )
  .get(
    "/products/public/random",
    async ({ query: { limit }, drizzle }) => {
      const count = Math.min(Math.max(parseInt(limit), 1), 10);

      console.log("count", count);

      const esUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/`;
      const indexName = `${process.env.PROJECT_PREFIX}products`;

      const elasticQuery = {
        size: count,
        query: {
          function_score: {
            query: { term: { active: true } },
            random_score: {},
          },
        },
      };

      try {
        const response = await fetch(`${esUrl}/${indexName}/_search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
          },
          body: JSON.stringify(elasticQuery),
        });

        if (!response.ok) {
          throw new Error(
            `Elasticsearch request failed: ${response.statusText}`
          );
        }

        const result = (await response.json()) as any;
        const hits = result.hits.hits.map((hit: any) => ({
          ...hit._source,
          text_vector: undefined,
          product_vector: undefined,
        })) as ProductsWithRelations[];

        if (hits.length > 0) {
          const images = await drizzle.query.assets.findMany({
            where: and(
              eq(assets.code, "source"),
              eq(assets.model, "products"),
              inArray(
                assets.model_id,
                hits.map((p) => p.id)
              )
            ),
          });

          hits.forEach((p) => {
            p.images = images
              .filter((i) => i.model_id === p.id)
              .map((i) => ({
                path: `/public/${i.path}/${i.id}/${i.name}`,
                code: i.code ?? "",
              }));
          });
        }

        console.log("hits", hits);

        return hits;
      } catch (error) {
        console.error("Error fetching random products:", error);
        throw new Error("Failed to fetch random products");
      }
    },
    {
      query: t.Object({
        limit: t.String(),
      }),
    }
  )
  .get(
    "/products/public/by_ids",
    async ({ user, set, drizzle, query: { ids } }) => {
      const idsList = ids.split(",");
      const body = {
        size: 5,
        query: {
          bool: {
            must: [
              {
                terms: {
                  id: idsList,
                },
              },
            ],
            filter: [{ term: { active: true } }],
          },
        },
        _source: {
          excludes: ["text_vector", "product_vector"], // Optionally exclude large vector fields
        },
      };

      const response = await fetch(`${esUrl}/${indexName}/_search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Elasticsearch request failed: ${response.statusText}`);
      }

      const result = await response.json();

      const hits = result.hits.hits.map((hit: any) => ({
        ...hit._source,
      })) as ProductsWithRelations[];

      if (hits.length > 0) {
        const images = await drizzle.query.assets.findMany({
          where: and(
            eq(assets.code, "source"),
            eq(assets.model, "products"),
            inArray(
              assets.model_id,
              hits.map((m) => m.id)
            )
          ),
        });

        hits.forEach((p) => {
          p.images = images
            .filter((i) => i.model_id === p.id)
            .map((i) => ({
              path: `/public/${i.path}/${i.id}/${i.name}`,
              code: i.code ?? "",
            }));
        });
      }
      return hits;
    },
    {
      query: t.Object({
        ids: t.String(),
      }),
    }
  )
  .get(
    "/products/public/:id",
    async ({ cacheController, set, params: { id }, drizzle }) => {
      const oneProductPrepared = drizzle.query.products
        .findFirst({
          where: and(
            eq(products.id, sql.placeholder("id")),
            eq(products.active, true)
          ),
          columns: {
            id: true,
          },
        })
        .prepare("one_product_prepared");
      const product = await oneProductPrepared.execute({ id });
      if (!product) {
        set.status = 404;
        return {
          message: "Product not found",
        };
      }

      const existingProduct = await drizzle
        .select({
          ...getTableColumns(products),
          manufacturers: getTableColumns(manufacturers),
        })
        .from(products)
        .leftJoin(manufacturers, eq(products.manufacturer_id, manufacturers.id))
        .where(eq(products.id, id))
        .execute();

      const productWithManufacturer: ProductsWithRelations = {
        ...existingProduct[0],
        images: [],
        properties: [],
      };

      const images = await drizzle.query.assets.findMany({
        where: and(
          eq(assets.code, "source"),
          eq(assets.model, "products"),
          eq(assets.model_id, productWithManufacturer.id)
        ),
      });

      if (images.length > 0) {
        productWithManufacturer.images = images.map((i) => ({
          path: `/public/${i.path}/${i.id}/${i.name}`,
          code: i.code ?? "",
        }));
      }

      const propertiesList = await drizzle
        .select({
          name: properties.name,
          value: products_properties.value,
          id: products_properties.id,
        })
        .from(products_properties)
        .leftJoin(
          properties,
          eq(products_properties.property_id, properties.id)
        )
        .where(eq(products_properties.product_id, id));

      productWithManufacturer.properties = propertiesList;
      console.log('productWithManufacturer', productWithManufacturer)
      return productWithManufacturer;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .get(
    "/products/public/:id/related",
    async ({
      cacheController,
      set,
      params: { id },
      drizzle,
      query: { limit, fields },
    }) => {
      const oneProductPrepared = drizzle.query.products
        .findFirst({
          where: and(
            eq(products.id, sql.placeholder("id")),
            eq(products.active, true)
          ),
          columns: {
            id: true,
          },
        })
        .prepare("one_product_prepared");
      const product = await oneProductPrepared.execute({ id });

      if (!product) {
        set.status = 404;
        return {
          message: "Product not found",
        };
      }
      const response = await fetch(`${esUrl}/${indexName}/_doc/${product.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Elasticsearch request failed: ${response.statusText}`);
      }

      const elasticProductData = (await response.json()) as any;

      const productVector = elasticProductData._source.product_vector;

      const body = {
        size: 5,
        query: {
          bool: {
            must_not: [{ term: { _id: product.id } }],
            filter: [{ term: { active: true } }],
          },
        },
        knn: {
          field: "product_vector",
          query_vector: productVector,
          k: 6,
          num_candidates: 100,
        },
        _source: {
          excludes: ["text_vector", "product_vector"], // Optionally exclude large vector fields
        },
      };

      const relatedResponse = await fetch(`${esUrl}/${indexName}/_search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify(body),
      });
      const result = (await relatedResponse.json()) as any;

      const hits = result.hits.hits.map((hit: any) => ({
        ...hit._source,
        text_vector: undefined,
        product_vector: undefined,
      })) as ProductsWithRelations[];

      if (hits.length > 0) {
        const images = await drizzle.query.assets.findMany({
          where: and(
            eq(assets.code, "source"),
            eq(assets.model, "products"),
            inArray(
              assets.model_id,
              hits.map((m) => m.id)
            )
          ),
        });

        hits.forEach((p) => {
          p.images = images
            .filter((i) => i.model_id === p.id)
            .map((i) => ({
              path: `/public/${i.path}/${i.id}/${i.name}`,
              code: i.code ?? "",
            }));
        });
      }
      return hits;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      query: t.Object({
        limit: t.String(),
        fields: t.Optional(t.String()),
      }),
    }
  )
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

      await drizzle.insert(products_categories).values({
        product_id: newProduct[0].id,
        category_id: body.data.category_id,
      }).execute();

      await drizzle.insert(product_events).values({
        product_id: newProduct[0].id,
        event_name: "created_new_product",
        created_at: new Date(),
        user_id: user.user.id,
      }).execute();

      return newProduct[0];
    },
    {
      body: t.Object({
        data: t.Object({
          active: t.Boolean(),
          name: t.String(),
          description: t.Optional(t.Nullable(t.String())),
          price_rub: t.Optional(t.Nullable(t.String())),
          price_usd: t.Optional(t.Nullable(t.String())),
          properties: t.Optional(t.Record(t.String(), t.Any())),
          category_id: t.String(),
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
        /** @ts-ignore */
        fabric_type: res.properties?.fabric_type ?? "",
        /** @ts-ignore */
        raw_material: res.properties?.raw_material ?? "",
        /** @ts-ignore */
        fabric_density: res.properties?.fabric_density ?? "",
        /** @ts-ignore */
        color_and_design: res.properties?.color_and_design ?? "",
        /** @ts-ignore */
        strength_resistance: res.properties?.strength_resistance ?? "",
        /** @ts-ignore */
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

      if (body.data.category_id) {
        await drizzle
          .delete(products_categories)
          .where(eq(products_categories.product_id, id))
          .execute();

        await drizzle.insert(products_categories).values({
          product_id: id,
          category_id: body.data.category_id,
        }).execute();
      }

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
          price_rub: t.Optional(t.Nullable(t.String())),
          price_usd: t.Optional(t.Nullable(t.String())),
          category_id: t.Optional(t.String()),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .post(
    "/products/index",
    async ({ user, set, drizzle, indexProductsQueue }) => {
      const productsList = await drizzle
        .select({
          id: products.id,
        })
        .from(products)
        .execute();

      for (const product of productsList) {
        console.log("indexing product", product.id);
        await indexProductsQueue.add(
          product.id,
          {
            id: product.id,
          },
          {
            removeOnComplete: true,
            removeOnFail: true,
          }
        );
      }
    }
  )
  .post(
    "/products/batch",
    async ({ user, set, drizzle, body: { data } }) => {
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
        const randomManufacturer = await drizzle
          .select()
          .from(manufacturers)
          .orderBy(sql`RANDOM()`)
          .limit(1);
        const newProduct = await drizzle
          .insert(products)
          .values({
            active: true,
            name: product.name,
            description: product.description,
            price: product.price,
            manufacturer_id: randomManufacturer[0].id,
          })
          .returning({
            id: products.id,
          });

        const file = await Bun.file(product.image_url);
        const fileName = product.image_url.split("/").pop();

        const asset = await drizzle
          .insert(assets)
          .values({
            model: "products",
            model_id: newProduct[0].id,
            mime_type: file.type,
            name: fileName!,
            size: file.size,
            path: "sources",
            code: "source",
          })
          .returning({
            id: assets.id,
          });
        await fs.mkdirSync(`../uploads/sources/${asset[0].id}`, {
          recursive: true,
        });

        const outputFile = Bun.file(
          path.resolve(`../uploads/sources/${asset[0].id}/${fileName}`)
        );
        console.log("outputFile", outputFile.name);

        const response = await fetch(product.image_url);
        /** @ts-ignore */
        await Bun.write(outputFile, response);

        await drizzle.insert(products_properties).values([
          {
            product_id: newProduct[0].id,
            property_id: "6efc1fd8-38ab-477d-93fe-5f7c0fc03c03",
            value: product.properties.fabric_type,
          },
          {
            product_id: newProduct[0].id,
            property_id: "e70175de-b906-4125-b027-19339840613c",
            value: product.properties.raw_material,
          },
          {
            product_id: newProduct[0].id,
            property_id: "04fa8dd4-f7fa-4ef3-ab68-f41568558587",
            value: product.properties.fabric_density,
          },
          {
            product_id: newProduct[0].id,
            property_id: "f7744227-e547-4d9f-ba5c-a7b8d6fd1737",
            value: product.properties.color_and_design,
          },
          {
            product_id: newProduct[0].id,
            property_id: "26128908-a7fa-4869-8f3d-bd76a13eb0db",
            value: product.properties.strength_resistance,
          },
          {
            product_id: newProduct[0].id,
            property_id: "426434ac-e3d0-4ac2-a1ec-40d0f95dff63",
            value: product.properties.product_tech,
          },
        ]);

        await drizzle.insert(products_categories).values([
          {
            product_id: newProduct[0].id,
            category_id: product.category_id,
          },
        ]);
      }

      return {
        success: true,
      };
    },
    {
      body: t.Object({
        data: t.Array(
          t.Object({
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
          })
        ),
      }),
    }
  );
