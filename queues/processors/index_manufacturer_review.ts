import { db } from "@backend/db";

export default async function processIndexManufacturerReview(id: string) {
  try {
    const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturer_reviews`;
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
            manufacturer_id: {
              type: "keyword",
            },
            user_id: {
              type: "keyword",
            },
            active: {
              type: "boolean",
            },
            rating: {
              type: "integer",
            },
            review: {
              type: "text",
              analyzer: "iq_text_delimiter",
              fields: {
                base: {
                  type: "text",
                  analyzer: "iq_text_base",
                },
                bigram: {
                  type: "text",
                  analyzer: "i_text_bigram",
                },
                prefix: {
                  type: "text",
                  analyzer: "i_prefix",
                },
                stem: {
                  type: "text",
                  analyzer: "iq_text_stem",
                },
              },
            },
            created_at: {
              type: "date",
            },
            user_data: {
              type: "object",
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
    }

    const review = await db.manufacturersReviews.findFirst({
      where: {
        id,
      },
      include: {
        manufacturers_reviews_users: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    console.log("review", review);

    if (!review) {
      return;
    }

    const indexBody = {
      id: review.id,
      manufacturer_id: review.manufacturer_id,
      user_id: review.user_id,
      active: review.active,
      rating: review.rating,
      review: review.comment,
      created_at: review.created_at,
      user_data: review.manufacturers_reviews_users,
    };

    const indexingResponse = await fetch(`${elasticUrl}/_doc/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
      },
      body: JSON.stringify(indexBody),
    });
    console.log("indexingResponse", indexingResponse);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const reviewsResponse = await fetch(`${elasticUrl}/_search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
      },
      body: JSON.stringify({
        size: 0,
        query: {
          bool: {
            must: [
              {
                term: {
                  active: true,
                },
              },
              {
                term: {
                  manufacturer_id: review.manufacturer_id,
                },
              },
            ],
          },
        },
        aggs: {
          average_rating: {
            avg: {
              field: "rating",
            },
          },
        },
      }),
    });
    const reviewsResponseJson = await reviewsResponse.json();
    if (reviewsResponseJson?.aggregations?.average_rating?.value) {
      await db.manufacturers.update({
        where: {
          id: review.manufacturer_id,
        },
        data: {
          rating: reviewsResponseJson.aggregations.average_rating.value,
        },
      });
    }
  } catch (e) {
    console.log("davr", e);
  }
}
