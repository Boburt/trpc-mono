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
import { DrizzleDB } from "@backend/lib/db";
import { cities } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class CitiesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) {}

  async create(input: Prisma.CitiesCreateArgs): Promise<Cities> {
    const res = await this.prisma.cities.create(input);
    await this.cacheControl.cacheCities();
    return res;
  }

  async findMany(
    input: z.infer<typeof CitiesFindManyArgsSchema>
  ): Promise<PaginationType<InferSelectModel<typeof cities>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    delete input.take;
    delete input.skip;

    const citiesCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(cities)
      .execute();

    const citiesList = await this.drizzle
      .select()
      .from(cities)
      .limit(take)
      .offset(skip);

    /*
    create new object variable called paginationMeta that will contain data like this:
        {
          "isFirstPage": true,
          "isLastPage": false,
          "currentPage": 1,
          "previousPage": null,
          "nextPage": 2,
          "pageCount": 2,
          "totalCount": 14
      } 
    */
    const isLastPage = skip + take >= +citiesCount[0].count;
    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+citiesCount[0].count / take),
      totalCount: +citiesCount[0].count,
    };

    // const permissions = await this.drizzle.select().from(cities);

    // const [permissions, meta] = await this.prisma.cities
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      items: citiesList,
      meta: paginationMeta,
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
