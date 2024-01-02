import { ctx } from "@backend/context";
import { parseFilterFields } from "@backend/lib/parseFilterFields";
import { parseSelectFields } from "@backend/lib/parseSelectFields";
import { manufacturers, cities, manufacturers_categories, image_sizes, assets, categories } from "backend/drizzle/schema";
import { sql, InferSelectModel, eq, SQLWrapper, inArray, and, or } from "drizzle-orm";
import { SelectedFields } from "drizzle-orm/pg-core";
import Elysia, { t } from "elysia";
import { PublicManufacturer } from "./dto/list.dto";



export const manufacturersController = new Elysia({
    name: '@api/manufacturers'
})
    .use(ctx)
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
    .get('/manufacturers/with_facet', async ({ query: { limit, offset, sort, filters, imageSizes, facets }, user, set, drizzle, cacheController }) => {

        let whereClause: (SQLWrapper | undefined)[] = [];
        if (filters) {
            whereClause = parseFilterFields(filters, manufacturers, {
                cities,
                manufacturers_categories,
                categories
            });
        }
        if (facets && Object.keys(facets).length > 0) {
            const cachedProperties = (
                await cacheController.getCachedManufacturersProperties({})
            ).filter((property) => property.show_in_filter);


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
                                [`properties.${property.code}.keyword`]: facets![property.code],
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

            const ids = elasticResponseJson.hits.hits.map((h: any) => h._id);

            whereClause.push(inArray(manufacturers.id, ids));
        }

        const manufacturersList = (await drizzle.select({
            id: manufacturers.id,
            name: manufacturers.name,
            short_name: manufacturers.short_name,
            description: manufacturers.description,
            active: manufacturers.active,
            city_id: manufacturers.city_id,
            rating: manufacturers.rating,
        }).from(manufacturers)
            .leftJoin(manufacturers_categories, eq(manufacturers_categories.manufacturer_id, manufacturers.id))
            .leftJoin(categories, eq(categories.id, manufacturers_categories.category_id))
            .leftJoin(cities, eq(cities.id, manufacturers.city_id))
            .where(and(...whereClause))
            .limit(+limit)
            .offset(+offset)
            .execute()) as PublicManufacturer[];

        if (imageSizes && imageSizes.length > 0) {
            const images = await drizzle.query.assets.findMany({
                where: or(...imageSizes.map(i => and(
                    eq(assets.code, i.image_code),
                    eq(assets.resize_code, i.size_code),
                    eq(assets.model, "manufacturers"),
                    inArray(assets.model_id, manufacturersList.map(m => m.id))
                )))
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

        return { items: manufacturersList }
    }, {
        query: t.Object({
            limit: t.String(),
            offset: t.String({
                default: "0"
            }),
            sort: t.Optional(t.String()),
            filters: t.Optional(
                t.String()
            ),
            facets: t.Optional(t.Nullable(t.Record(t.String(), t.Array(t.String())))),
            imageSizes: t.Optional(t.Array(t.Object({
                image_code: t.String(),
                size_code: t.String()
            })))
        }),
    })
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

            await drizzle.delete(manufacturers).where(eq(manufacturers.id, id)).execute();
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
                    rating: t.Number()
                }),
                fields: t.Optional(t.Array(t.String())),
            }),
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
    )