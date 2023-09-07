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

export class ManufacturersService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(
    input: z.infer<typeof ManufacturersCreateArgsSchemaWithAsset>
  ): Promise<Manufacturers> {
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
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.manufacturers
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });

    return {
      items: permissions,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof ManufacturersFindUniqueArgsSchema>
  ): Promise<Manufacturers | null> {
    const permission = await this.prisma.manufacturers.findUnique(input);
    return permission;
  }

  async update(input: Prisma.ManufacturersUpdateArgs): Promise<Manufacturers> {
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
