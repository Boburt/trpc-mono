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

export class ManufacturersService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
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
    const res = await this.prisma.manufacturers.delete(input);
    return res;
  }

  // async cachedLangs(
  //   input: z.infer<typeof ManufacturersFindManyArgsSchema>
  // ): Promise<Manufacturers[]> {
  //   return await this.cacheControl.getCachedLangs(input);
  // }
}
