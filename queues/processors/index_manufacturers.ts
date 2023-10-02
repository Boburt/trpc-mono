import { db } from "@backend/db";

export default async function processIndexManufacturer(id: string) {
  try {
    const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;
    // check if index in elasticsearch exists
    //   const indexExists = await elasticClient.indices.exists({
    //     index: indexManufacturers,
    //   });
    const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}`;
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
        mappings: {
          properties: {
            id: {
              type: "keyword",
            },
            name: {
              type: "text",
            },
            short_name: {
              type: "text",
            },
            description: {
              type: "text",
            },
            categories: {
              type: "nested",
              properties: {
                id: {
                  type: "keyword",
                },
                name: {
                  type: "text",
                },
                code: {
                  type: "keyword",
                },
              },
            },
            properties: {
              type: "nested",
              properties: {
                id: {
                  type: "keyword",
                },
                name: {
                  type: "keyword",
                },
                code: {
                  type: "keyword",
                },
                show_in_filter: {
                  type: "boolean",
                },
                show_in_list: {
                  type: "boolean",
                },
                value: {
                  type: "text",
                },
              },
            },
          },
        },
      };

      const response = await fetch(elasticUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify(indexMapping),
      });
    } else {
      console.log("index exists, updating");
    }
    console.log("console is created");
    const manufacturer = await db.manufacturers.findFirst({
      where: {
        id,
      },
      include: {
        manufacturers_categories: {
          select: {
            manufacturers_categories_categories: {
              select: {
                name: true,
                code: true,
                id: true,
              },
            },
          },
        },
        manyfacturers_properties_values_manufacturers_properties: {
          select: {
            property_id: true,
            value: true,
            manufacturers_properties_values_manufacturers_properties: {
              select: {
                name: true,
                code: true,
                id: true,
                show_in_filter: true,
                show_in_list: true,
              },
            },
          },
        },
      },
    });
    console.log("manufacturer", manufacturer);
    if (manufacturer) {
      // index manufacturer in elasticsearch using fetch
      const indexUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}/_doc/${manufacturer.id}`;
      const indexBody = {
        id: manufacturer.id,
        name: manufacturer.name,
        short_name: manufacturer.short_name,
        description: manufacturer.description,
        categories: manufacturer.manufacturers_categories.map((item) => {
          return {
            id: item.manufacturers_categories_categories.id,
            name: item.manufacturers_categories_categories.name,
            code: item.manufacturers_categories_categories.code,
          };
        }),
        properties:
          manufacturer.manyfacturers_properties_values_manufacturers_properties.map(
            (item) => {
              return {
                id: item
                  .manufacturers_properties_values_manufacturers_properties.id,
                name: item
                  .manufacturers_properties_values_manufacturers_properties
                  .name,
                code: item
                  .manufacturers_properties_values_manufacturers_properties
                  .code,
                show_in_filter:
                  item.manufacturers_properties_values_manufacturers_properties
                    .show_in_filter,
                show_in_list:
                  item.manufacturers_properties_values_manufacturers_properties
                    .show_in_list,
                value: item.value,
              };
            }
          ),
      };
      console.log("before indexing");
      const response = await fetch(indexUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify(indexBody),
      });
      console.log("data is indexed");
    }
  } catch (error) {
    console.log("error", error);
  }
}
