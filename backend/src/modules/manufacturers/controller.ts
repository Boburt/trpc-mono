import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import {
  manufacturers,
  cities,
  manufacturers_categories,
  image_sizes,
  assets,
  categories,
  manufacturers_reviews,
  memberships,
} from "backend/drizzle/schema";
import {
  sql,
  InferSelectModel,
  eq,
  SQLWrapper,
  inArray,
  and,
  or,
} from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";
import { PublicManufacturer } from "./dto/list.dto";
import typesenseClient from "@backend/lib/typesense";
import { TypesenseManufacturer, TypesenseManufacturerWithRelations } from "./typesense_schema";
const esUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/`;
const indexName = `${process.env.PROJECT_PREFIX}manufacturers`;


const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;

export const manufacturersController = new Elysia({
  name: "@api/manufacturers",
})
  .use(ctx)
  .get("/manufacturers/facets", async ({ set, query: {
    search
  } }) => {
    try {
      const searchParameters = {
        q: search || '*',
        query_by: 'name,description,short_name',
        facet_by: 'city,capacity,certificates,staff_count',
        max_facet_values: 100,
        per_page: 0
      };

      const result = await typesenseClient
        .collections(indexManufacturers)
        .documents()
        .search(searchParameters);

      return {
        cities: result.facet_counts.find(facet => facet.field_name === 'city')?.counts || [],
        capacity: result.facet_counts.find(facet => facet.field_name === 'capacity')?.counts || [],
        certificates: result.facet_counts.find(facet => facet.field_name === 'certificates')?.counts || [],
        staff_count: result.facet_counts.find(facet => facet.field_name === 'staff_count')?.counts || []
      };
    } catch (error) {
      console.error('Error fetching facets:', error);
      set.status = 500;
      return { error: 'Failed to fetch facets' };
    }
  }, {
    query: t.Object({
      search: t.Optional(t.String())
    })
  })
  .post("/manufacturers/list", async ({ body: {
    limit, page, sort, city, capacity, fields, query
  }, set, drizzle }) => {

    const searchParameters = {
      q: query || '*',
      query_by: 'name,description,short_name',
      filter_by: 'active:true',
      sort_by: sort || 'created_at_timestamp:desc',
      per_page: limit,
      page: page,
    };

    if (city && city.length > 0) {
      searchParameters.filter_by += ` && city:=${JSON.stringify(city)}`;
    }

    if (capacity && capacity.length > 0) {
      searchParameters.filter_by += ` && capacity:=${JSON.stringify(capacity)}`;
    }
    try {
      const searchResults = await typesenseClient
        .collections<TypesenseManufacturerWithRelations>(indexManufacturers)
        .documents()
        .search(searchParameters);

      let manufacturers = searchResults?.hits?.map(hit => hit.document);

      if (manufacturers && manufacturers.length > 0) {
        const images = await drizzle.query.assets.findMany({
          where: and(
            eq(assets.code, "source"),
            eq(assets.model, "manufacturers"),
            inArray(
              assets.model_id,
              manufacturers.map((p) => p.id)
            )
          ),
        });

        manufacturers.forEach((p) => {
          p.images = images
            .filter((i) => i.model_id === p.id)
            .map((i) => ({
              path: `/public/${i.path}/${i.id}/${i.name}`,
              code: i.code ?? "",
            }));
        });
      }

      return {
        total: searchResults.found,
        totalPages: Math.ceil(searchResults.found / limit),
        manufacturers
      };
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
      throw new Error("Failed to fetch products");
    }
  }, {
    body: t.Object({
      limit: t.Numeric(),
      page: t.Numeric(),
      sort: t.Optional(t.String()),
      fields: t.Optional(t.String()),
      query: t.Optional(t.String()),
      city: t.Optional(t.Nullable(t.Array(t.String()))),
      capacity: t.Optional(t.Nullable(t.Array(t.String()))),
    })
  })
  .get(
    "/manufacturers",
    async ({
      query: { limit, offset, sort, filter, fields },
      user,
      set,
      drizzle,
    }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("manufacturers.list")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields: SelectedFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, manufacturers, {});
      }
      const rolesCount = await drizzle
        .select({ count: sql<number>`count(*)` })
        .from(manufacturers)
        .execute();
      const rolesList = (await drizzle
        .select(selectFields)
        .from(manufacturers)
        .limit(+limit)
        .offset(+offset)
        .execute()) as InferSelectModel<typeof manufacturers>[];
      return {
        total: rolesCount[0].count,
        data: rolesList,
      };
    },
    {
      query: t.Object({
        limit: t.String(),
        offset: t.String(),
        sort: t.Optional(t.String()),
        filter: t.Optional(
          t.Object({
            id: t.Number(),
            name: t.String(),
            email: t.String(),
            address: t.String(),
            phone: t.String(),
          })
        ),
        fields: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/manufacturers/facet_filter",
    async ({ query: { category }, cacheController }) => {
      const properties = await cacheController.getCachedManufacturersProperties(
        {}
      );

      // @ts-ignore
      const filterProperties = properties.filter((p) => p.show_in_filter);

      if (filterProperties.length === 0) {
        return [];
      }

      const elasticQuery: {
        size: number;
        aggs: {
          [key: string]: any;
        };
        query?: any;
      } = {
        size: 0,
        aggs: {
          city: {
            nested: {
              path: "city",
            },
            aggs: {
              city: {
                terms: {
                  field: "city.keyword_name.keyword",
                  size: 100,
                },
              },
            },
          },
        },
      };

      if (category) {
        elasticQuery.query = {
          nested: {
            path: "categories",
            query: {
              bool: {
                must: [
                  {
                    term: {
                      "categories.code": category,
                    },
                  },
                ],
              },
            },
          },
        };
      }

      // @ts-ignore
      filterProperties.forEach((p) => {
        if (["production-volume", "power"].includes(p.code)) {
          elasticQuery.aggs[p.code] = {
            range: {
              field: `properties.${p.code}`,
              ranges: [
                {
                  from: 0,
                  to: 100,
                },
                {
                  from: 100,
                  to: 500,
                },
                {
                  from: 500,
                  to: 1000,
                },
                {
                  from: 1000,
                  to: 5000,
                },
                {
                  from: 5000,
                  to: 10000,
                },
                {
                  from: 10000,
                  to: 50000,
                },
                {
                  from: 50000,
                },
              ],
            },
          };
        } else {
          elasticQuery.aggs[p.code] = {
            terms: {
              field: `properties.${p.name}.keyword`,
              size: 10000,
            },
          };
        }
      });
      const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;

      const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}/_search`;
      const elasticResponse = await fetch(elasticUrl, {
        method: "POST",
        body: JSON.stringify(elasticQuery),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
      });

      const elasticResponseJson = await elasticResponse.json();

      const facets: {
        [key: string]: {
          name: string;
          code: string;
          multiple: boolean;
          value: {
            value: string;
            count: number;
          }[];
        };
      } = {};
      // @ts-ignore
      filterProperties.forEach((p) => {
        if (["production-volume", "power"].includes(p.code)) {
          facets[p.code] = {
            name: p.name,
            code: p.code,
            multiple: false,
            value: [],
          };
          // @ts-ignore
          elasticResponseJson.aggregations[p.code].buckets.forEach((b: any) => {
            facets[p.code]["value"].push({
              value: b.key,
              count: b.doc_count,
            });
          });
        } else {
          facets[p.code] = {
            name: p.name,
            code: p.code,
            multiple: true,
            value: [],
          };
          // @ts-ignore
          elasticResponseJson.aggregations[p.code].buckets.forEach((b: any) => {
            facets[p.code]["value"].push({
              value: b.key,
              count: b.doc_count,
            });
          });
        }
      });

      let cityFacet: {
        name: string;
        code: string;
        multiple: boolean;
        value: {
          value: string;
          count: number;
        }[];
      } = {
        name: "Город",
        code: "city",
        multiple: true,
        value: [],
      };
      // @ts-ignore
      elasticResponseJson.aggregations.city.city.buckets.forEach((b: any) => {
        cityFacet["value"].push({
          value: b.key,
          count: b.doc_count,
        });
      });

      let resultFacets = [];

      if (cityFacet.value.length > 0) {
        resultFacets.push(cityFacet);
      }

      resultFacets.push(
        ...Object.values(facets).filter((f) => f.value.length > 0)
      );

      return resultFacets;
    },
    {
      query: t.Object({
        category: t.Optional(t.Nullable(t.String())),
      }),
    }
  )
  .post(
    "/manufacturers/with_facet",
    async ({
      body: { limit, offset, sort, filters, imageSizes, facets },
      user,
      set,
      drizzle,
      cacheController,
    }) => {
      let whereClause: (SQLWrapper | undefined)[] = [];
      if (filters) {
        whereClause = parseFilterFields(filters, manufacturers, {
          cities,
          manufacturers_categories,
          categories,
        });
      }
      if (facets && Object.keys(facets).length > 0) {
        const cachedProperties = (
          await cacheController.getCachedManufacturersProperties({})
        )
          // @ts-ignore
          .filter((property) => property.show_in_filter);

        let elasticQuery: {
          size: number;
          aggs: {
            [key: string]: any;
          };
          query: {
            bool: {
              filter: any[];
            };
          };
        } = {
          size: 10000,
          query: {
            bool: {
              filter: [],
            },
          },
          aggs: {
            city: {
              nested: {
                path: "city",
              },
              aggs: {
                city: {
                  terms: {
                    field: "city.keyword_name.keyword",
                    size: 100,
                  },
                },
              },
            },
          },
        };

        if (facets.city && facets.city.length > 0) {
          elasticQuery.query.bool.filter.push({
            nested: {
              path: "city",
              query: {
                bool: {
                  filter: [
                    {
                      terms: {
                        "city.keyword_name.keyword": facets.city,
                      },
                    },
                  ],
                },
              },
            },
          });
        }
        // @ts-ignore
        cachedProperties.forEach((property) => {
          if (facets![property.code] && facets![property.code].length > 0) {
            if (property.type === "number") {
              elasticQuery.query.bool.filter.push({
                range: {
                  [`properties.${property.code}`]: {
                    gte: facets![property.code][0].split("-")[0],
                    lte: facets![property.code][0].split("-")[1],
                  },
                },
              });
            } else {
              elasticQuery.query.bool.filter.push({
                terms: {
                  [`properties.${property.code}.keyword`]:
                    facets![property.code],
                },
              });
            }
          }
        });

        const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;

        const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}/_search`;

        const elasticResponse = await fetch(elasticUrl, {
          method: "POST",
          body: JSON.stringify(elasticQuery),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
          },
        });

        const elasticResponseJson = await elasticResponse.json();
        // @ts-ignore
        const ids = elasticResponseJson.hits.hits.map((h: any) => h._id);
        if (ids.length > 0) {
          whereClause.push(inArray(manufacturers.id, ids));
        }
        console.log("whereClause", ids);
      }

      // const manufacturersDbSelect = drizzle
      //   .select()
      //   .from(manufacturers)
      //   .where(and(...whereClause))
      //   .limit(+limit)
      //   .offset(+offset)
      //   .as("manufacturers");
      const manufacturersList = (await drizzle
        .select({
          id: manufacturers.id,
          name: manufacturers.name,
          short_name: manufacturers.short_name,
          description: manufacturers.description,
          active: manufacturers.active,
          city_id: manufacturers.city_id,
          rating: manufacturers.rating,
        })
        .from(manufacturers)
        .where(and(...whereClause))
        .limit(+limit)
        .offset(offset ? +offset : 0)
        .execute()) as PublicManufacturer[];

      if (imageSizes && imageSizes.length > 0) {
        const images = await drizzle.query.assets.findMany({
          where: or(
            ...imageSizes.map((i) =>
              and(
                eq(assets.code, i.image_code),
                eq(assets.resize_code, i.size_code),
                eq(assets.model, "manufacturers"),
                inArray(
                  assets.model_id,
                  manufacturersList.map((m) => m.id)
                )
              )
            )
          ),
        });

        manufacturersList.forEach((p) => {
          p.images = images
            .filter((i) => i.model_id === p.id)
            .map((i) => ({
              path: `/public/${i.path}/${i.parent_id}/${i.name}`,
              code: i.code ?? "",
            }));
        });
      }

      return { items: manufacturersList };
    },
    {
      body: t.Object({
        limit: t.String(),
        offset: t.Optional(
          t.String({
            default: "0",
          })
        ),
        sort: t.Optional(t.String()),
        filters: t.Optional(t.String()),
        facets: t.Optional(
          t.Nullable(t.Record(t.String(), t.Array(t.String())))
        ),
        imageSizes: t.Optional(
          t.Array(
            t.Object({
              image_code: t.String(),
              size_code: t.String(),
            })
          )
        ),
      }),
    }
  )
  .get(
    "/manufacturers/:id/reviews",
    async ({ params: { id }, query: { from } }) => {
      const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturer_reviews`;
      const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}/_search`;
      const response = await fetch(elasticUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify({
          size: 10,
          from: from ?? 0,
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
                    manufacturer_id: id,
                  },
                },
              ],
            },
          },
          sort: [
            {
              created_at: {
                order: "desc",
              },
            },
          ],
        }),
      });

      const responseJson = await response.json();

      return {
        // @ts-ignore
        total: responseJson.hits.total.value,
        // @ts-ignore
        items: responseJson.hits.hits.map((h: any) => h._source),
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      query: t.Object({
        from: t.Optional(t.Number()),
      }),
    }
  )
  .get(
    "/manufacturers/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("manufacturers.one")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      const permissionsRecord = await drizzle
        .select()
        .from(manufacturers)
        .where(eq(manufacturers.id, id))
        .execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .delete(
    "/manufacturers/:id",
    async ({ params: { id }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("manufacturers.delete")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }

      const permissionsRecord = await drizzle
        .select({
          id: manufacturers.id,
        })
        .from(manufacturers)
        .where(eq(manufacturers.id, id))
        .execute();

      await drizzle
        .delete(manufacturers)
        .where(eq(manufacturers.id, id))
        .execute();
      return permissionsRecord[0];
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/manufacturers",
    async ({ body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("manufacturers.add")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, manufacturers, {});
      }
      const result = await drizzle
        .insert(manufacturers)
        .values(data)
        .returning(selectFields);

      return {
        data: result[0],
      };
    },
    {
      body: t.Object({
        data: t.Object({
          short_name: t.String(),
          name: t.String(),
          description: t.Optional(t.Nullable(t.String())),
          active: t.Optional(t.Boolean()),
          city_id: t.Optional(t.Nullable(t.String())),
          rating: t.Number(),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  )
  .post(
    "/manufacturers/review",
    async ({
      body: { manufacturer_id, rating, review },
      user,
      set,
      drizzle,
      newIndexManufacturerReviewQueue,
    }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      const res = await drizzle
        .insert(manufacturers_reviews)
        .values({
          manufacturer_id,
          rating,
          comment: review,
          // @ts-ignore
          user_id: user.id,
        })
        .returning({
          id: manufacturers_reviews.id,
          rating: manufacturers_reviews.rating,
          comment: manufacturers_reviews.comment,
          user_id: manufacturers_reviews.user_id,
          manufacturer_id: manufacturers_reviews.manufacturer_id,
        });

      await newIndexManufacturerReviewQueue.add(
        res[0].id,
        {
          id: res[0].id,
        },
        {
          removeOnComplete: true,
        }
      );
      return res;
    },
    {
      body: t.Object({
        manufacturer_id: t.String(),
        rating: t.Number(),
        review: t.String(),
      }),
    }
  )

  .post(
    "/manufacturers/index",
    async ({ user, set, drizzle, newIndexManufacturersQueue }) => {
      const productsList = await drizzle
        .select({
          id: memberships.id,
        })
        .from(memberships)
        .where(eq(memberships.type, "manufacturer"))
        .execute();

      for (const product of productsList) {
        console.log("indexing manufacturer", product.id);
        await newIndexManufacturersQueue.add(
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
  .put(
    "/manufacturers/:id",
    async ({ params: { id }, body: { data, fields }, user, set, drizzle }) => {
      if (!user) {
        set.status = 401;
        return {
          message: "User not found",
        };
      }

      if (!user.permissions.includes("manufacturers.edit")) {
        set.status = 401;
        return {
          message: "You don't have permissions",
        };
      }
      let selectFields = {};
      if (fields) {
        selectFields = parseSelectFields(fields, manufacturers, {});
      }
      const result = await drizzle
        .update(manufacturers)
        .set(data)
        .where(eq(manufacturers.id, id))
        .returning(selectFields);

      return {
        data: result[0],
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        data: t.Object({
          short_name: t.String(),
          name: t.String(),
          description: t.Optional(t.Nullable(t.String())),
          active: t.Optional(t.Boolean()),
          city_id: t.Optional(t.Nullable(t.String())),
        }),
        fields: t.Optional(t.Array(t.String())),
      }),
    }
  );
