import { drizzleDb } from "@backend/lib/db";
import {
  memberships,
  profiles
} from "@backend/../drizzle/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";
import { pipeline } from "@xenova/transformers";

const HttpsAgent = require("agentkeepalive").HttpsAgent;
const agent = new HttpsAgent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000,
  freeSocketTimeout: 30000,
});

const model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

export default async function processIndexManufacturer(id: string) {
  try {
    const manufacturer = await drizzleDb.query.memberships.findFirst({
      where: eq(memberships.id, id),
      columns: {
        id: true,
      },
    });

    if (!manufacturer) {
      return;
    }

    const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;
    const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}`;

    const response = await fetch(elasticUrl, {
      method: "HEAD",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
      },
      verbose: true,
    });

    if (response.status == 404) {
      console.log("index does not exist, creating");

      const indexMapping = {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0,
          analysis: {
            analyzer: {
              text_analyzer: {
                tokenizer: "standard",
                filter: [
                  "lowercase",
                  "asciifolding",
                  "russian_morphology",
                  "english_morphology",
                  "my_edge_ngram",
                ],
              },
              search_analyzer: {
                tokenizer: "standard",
                filter: [
                  "lowercase",
                  "asciifolding",
                  "russian_morphology",
                  "english_morphology",
                ],
              },
            },
            filter: {
              my_edge_ngram: {
                type: "edge_ngram",
                min_gram: 2,
                max_gram: 20,
              },
              russian_morphology: {
                type: "icu_collation",
                language: "ru",
              },
              english_morphology: {
                type: "icu_collation",
                language: "en",
              },
            },
          },
        },
        mappings: {
          properties: {
            id: { type: "keyword" },
            name: {
              type: "text",
              analyzer: "text_analyzer",
              search_analyzer: "search_analyzer",
              fields: {
                keyword: {
                  type: "keyword",
                },
              },
            },
            short_name: {
              type: "text",
              analyzer: "text_analyzer",
              search_analyzer: "search_analyzer",
            },
            description: {
              type: "text",
              analyzer: "text_analyzer",
              search_analyzer: "search_analyzer",
            },
            active: { type: "boolean" },
            rating: { type: "float" },
            country: { type: "keyword" },
            type: { type: "keyword" },
            org_type: { type: "keyword" },
            city: { type: "keyword" },
            ein: { type: "integer" },
            address: { type: "text" },
            fact_address: { type: "text" },
            email: { type: "keyword" },
            web_site: { type: "keyword" },
            vat: { type: "boolean" },
            verified: { type: "boolean" },
            verified_date: { type: "date" },
            created_at: { type: "date" },
            updated_at: { type: "date" },
            "profiles": {
              "type": "nested",
              "properties": {
                "field_name": {
                  "type": "keyword"
                },
                "field_value": {
                  "dynamic": "true",
                  "properties": {
                    "measure": {
                      "type": "text",
                      "fields": {
                        "keyword": {
                          "type": "keyword",
                          "ignore_above": 256
                        }
                      }
                    },
                    "name": {
                      "type": "text",
                      "fields": {
                        "keyword": {
                          "type": "keyword",
                          "ignore_above": 256
                        }
                      }
                    },
                    "value": {
                      "type": "long"
                    }
                  }
                }
              }
            },
            text_vector: {
              type: "dense_vector",
              dims: 384,
              index: true,
              similarity: "cosine",
            },
          },
        },
      };

      const createIndexResponse = await fetch(elasticUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify(indexMapping),
      });
      console.log(await createIndexResponse.text());
    }

    console.time("manufacturerSelect");
    const existingManufacturer = await drizzleDb
      .select()
      .from(memberships)
      .where(eq(memberships.id, id))
      .execute();

    const currentManufacturer = existingManufacturer[0];

    const manufacturerProfiles = await drizzleDb
      .select({
        field_name: profiles.field_name,
        field_value: profiles.field_value,
      })
      .from(profiles)
      .where(eq(profiles.references_id, id))
      .execute();

    console.timeEnd("manufacturerSelect");

    const textToEmbed = `${currentManufacturer.name} ${currentManufacturer.description || ''} ${currentManufacturer.short_name || ''}`;
    const textEmbedding = await model(textToEmbed, {
      pooling: "mean",
      normalize: true,
    });

    const indexUrl = `${elasticUrl}/_doc/${currentManufacturer.id}`;

    const indexBody = {
      ...currentManufacturer,
      created_at: dayjs(currentManufacturer.created_at).toISOString(),
      updated_at: dayjs(currentManufacturer.updated_at).toISOString(),
      verified_date: currentManufacturer.verified_date
        ? dayjs(currentManufacturer.verified_date).toISOString()
        : null,
      profiles: manufacturerProfiles,
      text_vector: Array.from(textEmbedding.data),
    };

    console.time("indexing");
    const indexResponse = await fetch(indexUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
      },
      body: JSON.stringify(indexBody),
    });
    console.timeEnd("indexing");

    const indexResponseText = await indexResponse.text();
    console.log("Indexing response:", indexResponseText);
  } catch (e) {
    console.error("Error indexing manufacturer:", e);
  }
}