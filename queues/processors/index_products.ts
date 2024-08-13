import { drizzleDb } from "@backend/lib/db";
import {
  categories,
  manufacturers,
  products,
  products_categories,
  products_properties,
  properties,
} from "@backend/../drizzle/schema";
import { SQLWrapper, and, eq, gt, gte, isNotNull, lt, lte } from "drizzle-orm";
import dayjs from "dayjs";
import { pipeline, env } from "@xenova/transformers";
import typesenseClient from "@backend/lib/typesense";
// env.cacheDir = './model_cache';

// const embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

// async function generateEmbedding(text: string) {
//     const output = await embeddingPipeline(text, { pooling: 'mean', normalize: true });
//     return Array.from(output.data);
// }

const indexProducts = `${process.env.PROJECT_PREFIX}products`;
const productSchema = {
  name: indexProducts,
  fields: [
    { name: 'id', type: "string" },
    { name: 'manufacturer_id', type: "string" },
    { name: 'manufacturer_name', type: "string", facet: true },
    { name: 'name', type: "string" },
    { name: 'description', type: "string" },
    { name: 'active', type: 'bool' },
    { name: 'price_rub', type: 'float', facet: true },
    { name: 'price_usd', type: 'float', facet: true },
    { name: 'stock_quantity', type: 'int32' },
    { name: 'created_at', type: 'string' },
    { name: 'updated_at', type: 'string' },
    { name: 'created_at_timestamp', type: 'int64' }, // New sortable field
    { name: 'updated_at_timestamp', type: 'int64' }, // New sortable field
    { name: 'category', type: "string" },
    { name: 'category_id', type: "string" },
    { name: 'properties', type: 'string[]', facet: true },
  ],
  default_sorting_field: 'created_at_timestamp',
  enable_nested_fields: true
};


export default async function processIndexProducts(id: string) {
  try {
    const product = await drizzleDb.query.products.findFirst({
      where: eq(products.id, id),
      columns: {
        id: true,
      },
    });

    if (!product) {
      return;
    }


    try {
      await typesenseClient.collections(indexProducts).retrieve();
      console.log('Collection already exists');
    } catch (err) {
      if (err.httpStatus === 404) {
        await typesenseClient.collections().create(productSchema);
        console.log('Created schema');
      } else {
        console.error('Error creating schema:', err);
      }
    }

    console.time("productSelect");
    const existingProduct = await drizzleDb
      .select({
        id: products.id,
        manufacturer_id: products.manufacturer_id,
        manufacturer_name: manufacturers.short_name,
        name: products.name,
        description: products.description,
        active: products.active,
        price: products.price,
        price_rub: products.price_rub,
        price_usd: products.price_usd,
        stock_quantity: products.stock_quantity,
        created_at: products.created_at,
        updated_at: products.updated_at,
      })
      .from(products)
      .leftJoin(manufacturers, eq(products.manufacturer_id, manufacturers.id))
      .where(eq(products.id, id))
      .execute();

    const currentProduct = existingProduct[0];
    // get category name
    const productCategory = await drizzleDb
      .select({
        category_id: products_categories.category_id,
        name: categories.name,
      })
      .from(products_categories)
      .leftJoin(categories, eq(products_categories.category_id, categories.id))
      .where(eq(products_categories.product_id, id))

      .limit(1)
      .execute();

    const productPropertiesList = await drizzleDb
      .select({
        id: products_properties.id,
        name: properties.name,
        property_type: properties.property_type,
        value: products_properties.value,
        code: properties.code,
      })
      .from(products_properties)
      .leftJoin(properties, eq(products_properties.property_id, properties.id))
      .where(eq(products_properties.product_id, id))
      .execute();

    console.timeEnd("productSelect");
    const propertyNames = productPropertiesList.map(prop => prop.name);
    const propertyValues = productPropertiesList.map(prop => prop.value);

    const indexBody = {
      ...currentProduct,
      created_at: dayjs(currentProduct.created_at).toISOString(),
      updated_at: dayjs(currentProduct.updated_at).toISOString(),
      created_at_timestamp: dayjs(currentProduct.created_at).unix(),
      updated_at_timestamp: dayjs(currentProduct.updated_at).unix(),
      category: productCategory[0].name ?? "",
      category_id: productCategory[0].category_id ?? "",
      properties: productPropertiesList.map(prop => `${prop.name}:${prop.value}`),
      price_rub: currentProduct.price_rub ? +currentProduct.price_rub : 0,
      price_usd: currentProduct.price_usd ? +currentProduct.price_usd : 0,
      stock_quantity: currentProduct.stock_quantity ? +currentProduct.stock_quantity : 0,
    };
    // console.log('indexing', indexBody);
    console.time("indexing");

    try {
      await typesenseClient.collections(indexProducts).documents().upsert(indexBody);
      console.log(`Indexed product ${id}`);

    } catch (e) {
      console.log('indexBody', indexBody)
      console.error(`Error indexing product ${id}:`, e);
    }
    // console.log("indexResponseText", indexResponseText);
  } catch (e) {
    console.log("davr", e);
  }
}
