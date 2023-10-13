import type { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  ManufacturersFindManyArgsSchema,
  ManufacturersFindUniqueArgsSchema,
  Manufacturers,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { ManufacturersCreateArgsSchemaWithAsset } from "./dto/create.dto";
import {
  ManufacturersWithImagesFindManyArgsSchema,
  ManufacturersWithImagesSchema,
} from "./dto/list.dto";
import { ManufacturersFindUniqueWithImageArgsSchema } from "./dto/one.dto";
import { Queue } from "bullmq";

export class ManufacturersService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly deleteManufacturerQueue: Queue
  ) {}

  async create(
    input: z.infer<typeof ManufacturersCreateArgsSchemaWithAsset>
  ): Promise<Manufacturers> {
    if (input.data.rating) {
      // not to be able to change rating
      delete input.data.rating;
    }

    const res = await this.prisma.manufacturers.create(input);
    if (input.asset) {
      await this.prisma.assets.update({
        where: {
          id: input.asset,
        },
        data: {
          model_id: res.id,
        },
      });
    }
    return res;
  }

  async findMany(
    input: z.infer<typeof ManufacturersWithImagesFindManyArgsSchema>
  ): Promise<PaginationType<z.infer<typeof ManufacturersWithImagesSchema>>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    const image_sizes = input.imageSizes;
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    delete input.imageSizes;
    const [permissions, meta] = (await this.prisma.manufacturers
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      })) as [z.infer<typeof ManufacturersWithImagesSchema>[], any];

    if (image_sizes && image_sizes.length > 0) {
      const images = await this.prisma.assets.findMany({
        where: {
          OR: image_sizes.map((i) => ({
            code: {
              equals: i.image_code,
            },
            resize_code: {
              equals: i.size_code,
            },
            model: {
              equals: "manufacturers",
            },
            model_id: {
              in: permissions.map((p) => p.id),
            },
          })),
        },
      });

      permissions.forEach((p) => {
        p.images = images
          .filter((i) => i.model_id === p.id)
          .map((i) => ({
            path: `/public/${i.path}/${i.parent_id}/${i.name}`,
            code: i.code ?? "",
          }));
      });
    }

    return {
      items: permissions,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof ManufacturersFindUniqueWithImageArgsSchema>
  ): Promise<z.infer<typeof ManufacturersWithImagesSchema> | null> {
    const image_sizes = input.imageSizes;
    delete input.imageSizes;
    const permission = (await this.prisma.manufacturers.findFirst(
      input
    )) as z.infer<typeof ManufacturersWithImagesSchema>;
    if (permission) {
      if (image_sizes && image_sizes.length > 0) {
        const images = await this.prisma.assets.findMany({
          where: {
            OR: image_sizes.map((i) => ({
              code: {
                equals: i.image_code,
              },
              resize_code: {
                equals: i.size_code,
              },
              model: {
                equals: "manufacturers",
              },
              model_id: {
                equals: permission.id,
              },
            })),
          },
        });

        permission.images = images.map((i) => ({
          path: `/public/${i.path}/${i.parent_id}/${i.name}`,
          code: i.code ?? "",
        }));
      }
    }
    return permission;
  }

  async update(input: Prisma.ManufacturersUpdateArgs): Promise<Manufacturers> {
    if (input.data.rating) {
      // not to be able to change rating
      delete input.data.rating;
    }
    const res = await this.prisma.manufacturers.update(input);
    return res;
  }

  async delete(input: Prisma.ManufacturersDeleteArgs) {
    let id = input.where.id;
    await this.prisma.manufacturersPropertiesValues.deleteMany({
      where: {
        manufacturer_id: input.where.id,
      },
    });

    await this.prisma.manufacturersCategories.deleteMany({
      where: {
        manufacturer_id: input.where.id,
      },
    });
    const res = await this.prisma.manufacturers.delete(input);

    await this.deleteManufacturerQueue.add(
      id!,
      {
        id,
      },
      {
        removeOnComplete: true,
      }
    );

    return res;
  }

  async getFacetFilter() {
    const properties = await this.cacheControl.getCachedManufacturersProperties(
      {}
    );

    const filterProperties = properties.filter((p) => p.show_in_filter);

    if (filterProperties.length === 0) {
      return [];
    }

    const elasticQuery: {
      size: number;
      aggs: {
        [key: string]: any;
      };
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
    filterProperties.forEach((p) => {
      if (["production-volume", "power"].includes(p.code)) {
        facets[p.code] = {
          name: p.name,
          code: p.code,
          multiple: false,
          value: [],
        };
console.log('elasticResponseJson', JSON.stringify(elasticResponseJson));
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

    console.log("resultFacets", resultFacets);

    return resultFacets;
  }

  // async cachedLangs(
  //   input: z.infer<typeof ManufacturersFindManyArgsSchema>
  // ): Promise<Manufacturers[]> {
  //   return await this.cacheControl.getCachedLangs(input);
  // }
}
