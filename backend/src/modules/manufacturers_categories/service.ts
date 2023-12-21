import type { ManufacturersCategories, Prisma } from "@prisma/client";
import { z } from "zod";

import { ManufacturersCategoriesFindManyArgsSchema } from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { manufacturers_categories } from "@backend/../drizzle/schema";
import { CacheControlService } from "../cache_control/service";
import { InferSelectModel, sql } from "drizzle-orm";

export class ManufacturersCategoriesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) { }

  async assignCategoriesToManufacturer(
    input: Prisma.ManufacturersCategoriesCreateManyArgs
  ): Promise<Prisma.BatchPayload> {
    if (Array.isArray(input.data) && input.data.length > 0) {
      await this.prisma.manufacturersCategories.deleteMany({
        where: {
          manufacturer_id: input.data[0].manufacturer_id,
        },
      });
    } else {
      const data = input.data as Prisma.ManufacturersCategoriesCreateManyInput;
      await this.prisma.manufacturersCategories.deleteMany({
        where: {
          manufacturer_id: data.manufacturer_id,
        },
      });
    }

    const res = await this.prisma.manufacturersCategories.createMany(input);
    return res;
  }

  async findMany(
    input: z.infer<typeof ManufacturersCategoriesFindManyArgsSchema>
  ): Promise<
    PaginationType<InferSelectModel<typeof manufacturers_categories>>
  > {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const rolesCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(manufacturers_categories)
      .execute();

    const rolesList = await this.drizzle
      .select()
      .from(manufacturers_categories)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +rolesCount[0].count;

    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+rolesCount[0].count / take),
      totalCount: +rolesCount[0].count,
    };

    // const [permissions, meta] = await this.prisma.manufacturersCategories
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      items: rolesList,
      meta: paginationMeta,
    };
  }
}
