
import { drizzleDb } from "@backend/lib/db";
import { categories, manufacturers, products, products_categories, products_properties, properties } from "@backend/../drizzle/schema";
import { SQLWrapper, and, eq, gt, gte, isNotNull, lt, lte } from "drizzle-orm";
import dayjs from "dayjs";
import { pipeline, env } from '@xenova/transformers';
// env.cacheDir = './model_cache';

// const embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

// async function generateEmbedding(text: string) {
//     const output = await embeddingPipeline(text, { pooling: 'mean', normalize: true });
//     return Array.from(output.data);
// }

const model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

export default async function processIndexProducts(id: string) {
    try {
        const product = await drizzleDb.query.products.findFirst({
            where: eq(products.id, id),
            columns: {
                id: true,
            }
        });

        if (!product) {
            return;
        }

        const indexProducts = `${process.env.PROJECT_PREFIX}products`;
        // check if index in elasticsearch exists
        //   const indexExists = await elasticClient.indices.exists({
        //     index: indexProducts,
        //   });
        const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexProducts}`;
        // const agent = new Agent({
        //   connect: {
        //     rejectUnauthorized: false,
        //   },
        // });

        // setGlobalDispatcher(agent);
        const response = await fetch(elasticUrl, {
            method: "HEAD",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
            },
            verbose: true,
        });
        console.log("response", response);
        if (response.status == 404) {
            // create index with mapping and settings using fetch
            console.log("index does not exist, creating");

            const indexMapping = {
                settings: {
                    number_of_shards: 1,
                    number_of_replicas: 0,
                    analysis: {
                        filter: {
                            front_ngram: {
                                type: "edge_ngram",
                                min_gram: "1",
                                max_gram: "12",
                            },
                            bigram_joiner: {
                                max_shingle_size: "2",
                                token_separator: "",
                                output_unigrams: "false",
                                type: "shingle",
                            },
                            bigram_max_size: {
                                type: "length",
                                max: "16",
                                min: "0",
                            },
                            "en-stem-filter": {
                                name: "light_english",
                                type: "stemmer",
                                language: "light_english",
                            },
                            bigram_joiner_unigrams: {
                                max_shingle_size: "2",
                                token_separator: "",
                                output_unigrams: "true",
                                type: "shingle",
                            },
                            delimiter: {
                                split_on_numerics: "true",
                                generate_word_parts: "true",
                                preserve_original: "false",
                                catenate_words: "true",
                                generate_number_parts: "true",
                                catenate_all: "true",
                                split_on_case_change: "true",
                                type: "word_delimiter_graph",
                                catenate_numbers: "true",
                                stem_english_possessive: "true",
                            },
                            "en-stop-words-filter": {
                                type: "stop",
                                stopwords: "_english_",
                            },
                        },
                        analyzer: {
                            i_prefix: {
                                filter: [
                                    "cjk_width",
                                    "lowercase",
                                    "asciifolding",
                                    "front_ngram",
                                ],
                                type: "custom",
                                tokenizer: "standard",
                            },
                            iq_text_delimiter: {
                                filter: [
                                    "delimiter",
                                    "cjk_width",
                                    "lowercase",
                                    "asciifolding",
                                    "en-stop-words-filter",
                                    "en-stem-filter",
                                ],
                                type: "custom",
                                tokenizer: "whitespace",
                            },
                            q_prefix: {
                                filter: ["cjk_width", "lowercase", "asciifolding"],
                                type: "custom",
                                tokenizer: "standard",
                            },
                            iq_text_base: {
                                filter: [
                                    "cjk_width",
                                    "lowercase",
                                    "asciifolding",
                                    "en-stop-words-filter",
                                ],
                                type: "custom",
                                tokenizer: "standard",
                            },
                            iq_text_stem: {
                                filter: [
                                    "cjk_width",
                                    "lowercase",
                                    "asciifolding",
                                    "en-stop-words-filter",
                                    "en-stem-filter",
                                ],
                                type: "custom",
                                tokenizer: "standard",
                            },
                            i_text_bigram: {
                                filter: [
                                    "cjk_width",
                                    "lowercase",
                                    "asciifolding",
                                    "en-stem-filter",
                                    "bigram_joiner",
                                    "bigram_max_size",
                                ],
                                type: "custom",
                                tokenizer: "standard",
                            },
                            q_text_bigram: {
                                filter: [
                                    "cjk_width",
                                    "lowercase",
                                    "asciifolding",
                                    "en-stem-filter",
                                    "bigram_joiner_unigrams",
                                    "bigram_max_size",
                                ],
                                type: "custom",
                                tokenizer: "standard",
                            },
                        },
                    },
                },
                "mappings": {
                    "properties": {
                        "id": { "type": "keyword" },
                        "manufacturer_id": { "type": "keyword" },
                        "manufacturer_name": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword"
                                }
                            }
                        },
                        "category": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword"
                                }
                            }
                        },
                        "category_id": {
                            "type": "keyword"
                        },
                        "name": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword"
                                }
                            }
                        },
                        "description": { "type": "text" },
                        "active": { "type": "boolean" },
                        "price": { "type": "integer" },
                        "stock_quantity": { "type": "integer" },
                        "created_at": { "type": "date" },
                        "updated_at": { "type": "date" },
                        "properties": {
                            "type": "nested",
                            "properties": {
                                "id": { "type": "keyword" },
                                "name": { "type": "keyword" },
                                "property_type": { "type": "keyword" },
                                "value": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword"
                                        }
                                    }
                                },
                                "code": { "type": "keyword" }
                            }
                        },
                        text_vector: {
                            type: 'dense_vector',
                            dims: 384,
                            index: true,
                            similarity: 'cosine'
                        },
                        product_vector: {
                            type: 'dense_vector',
                            dims: 384,
                            index: true,
                            similarity: 'cosine'
                        }
                    }
                }
            };

            const response = await fetch(elasticUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
                },
                body: JSON.stringify(indexMapping),
                verbose: true,
            });
        }
        console.time('productSelect');
        const existingProduct = await drizzleDb.select({
            id: products.id,
            manufacturer_id: products.manufacturer_id,
            manufacturer_name: manufacturers.short_name,
            name: products.name,
            description: products.description,
            active: products.active,
            price: products.price,
            stock_quantity: products.stock_quantity,
            created_at: products.created_at,
            updated_at: products.updated_at,
        })
            .from(products)
            .leftJoin(
                manufacturers,
                eq(products.manufacturer_id, manufacturers.id)
            )
            .where(eq(products.id, id))
            .execute();

        const currentProduct = existingProduct[0];
        const textToEmbed = `${currentProduct.name} ${currentProduct.description}`;
        const textEmbedding = await model(textToEmbed, { pooling: 'mean', normalize: true });

        // get category name
        const productCategory = await drizzleDb.select({
            category_id: products_categories.category_id,
            name: categories.name
        })
            .from(products_categories)
            .leftJoin(
                categories,
                eq(products_categories.category_id, categories.id)
            )
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
            .leftJoin(
                properties,
                eq(products_properties.property_id, properties.id)
            )
            .where(eq(products_properties.product_id, id))
            .execute();

        console.timeEnd('productSelect');
        const indexUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexProducts}/_doc/${currentProduct.id}`;

        // For product_vector, we might want to include more fields
        const productToEmbed = `${currentProduct.name} ${currentProduct.description} ${productCategory[0].name} ${currentProduct.manufacturer_name}`;
        const productEmbedding = await model(productToEmbed, { pooling: 'mean', normalize: true });


        const indexBody = {
            ...currentProduct,
            created_at: dayjs(currentProduct.created_at).toISOString(),
            updated_at: dayjs(currentProduct.updated_at).toISOString(),
            category: productCategory[0].name ?? "",
            category_id: productCategory[0].category_id ?? "",
            properties: productPropertiesList,
            text_vector: Array.from(textEmbedding.data),
            product_vector: Array.from(productEmbedding.data)
        };
        // console.log('indexing', indexBody);
        console.time('indexing');
        const indexResponse = await fetch(indexUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
            },
            body: JSON.stringify(indexBody),
            verbose: true,
        });
        console.timeEnd('indexing');

        const indexResponseText = await indexResponse.text();
        // console.log("indexResponseText", indexResponseText);
    } catch (e) {
        console.log("davr", e);
    }
}