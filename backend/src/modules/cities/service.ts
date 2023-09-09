import type { Cities, Prisma } from "@prisma/client";
import { z } from "zod";

import {
  CitiesFindFirstArgsSchema,
  CitiesFindManyArgsSchema,
  CategoriesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";

export class CitiesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.CitiesCreateArgs): Promise<Cities> {
    const res = await this.prisma.cities.create(input);
    await this.cacheControl.cacheCities();
    return res;
  }

  async findMany(
    input: z.infer<typeof CitiesFindManyArgsSchema>
  ): Promise<PaginationType<Cities>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.cities
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
    input: z.infer<typeof CitiesFindFirstArgsSchema>
  ): Promise<Cities | null> {
    const permission = await this.prisma.cities.findFirst(input);
    return permission;
  }

  async update(input: Prisma.CitiesUpdateArgs): Promise<Cities> {
    const res = await this.prisma.cities.update(input);
    await this.cacheControl.cacheCities();
    return res;
  }

  async delete(input: Prisma.CitiesDeleteArgs) {
    const res = await this.prisma.cities.delete(input);
    await this.cacheControl.cacheCities();
    return res;
  }

  async cachedCities(
    input: z.infer<typeof CitiesFindManyArgsSchema>
  ): Promise<Cities[]> {
    return await this.cacheControl.getCachedCities(input);
  }
}
