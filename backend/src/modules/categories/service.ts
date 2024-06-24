import type { Categories, Prisma } from "@prisma/client";
import { z } from "zod";

import {
  CategoriesFindFirstArgsSchema,
  CategoriesFindManyArgsSchema,
  CategoriesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { InferSelectModel, sql } from "drizzle-orm";
import { categories } from "@backend/../drizzle/schema";

export class CategoriesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) { }

  async create(input: Prisma.CategoriesCreateArgs): Promise<Categories> {
    const res = await this.prisma.categories.create(input);
    await this.cacheControl.cacheCategories();
    await this.cacheControl.cacheTreeCategories();
    return res;
  }

  async findMany(
    input: z.infer<typeof CategoriesFindManyArgsSchema>
  ): Promise<PaginationType<InferSelectModel<typeof categories>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0; //: Math.round(input.skip / take);
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const categoriesCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(categories)
      .execute();

    const categoriesList = await this.drizzle
      .select()
      .from(categories)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +categoriesCount[0].count;

    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+categoriesCount[0].count / take),
      totalCount: +categoriesCount[0].count,
    };

    // const [permissions, meta] = await this.prisma.categories
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      items: categoriesList,
      meta: paginationMeta,
    };
  }

  async findOne(
    input: z.infer<typeof CategoriesFindFirstArgsSchema>
  ): Promise<Categories | null> {
    const permission = await this.prisma.categories.findFirst(input);
    return permission;
  }

  async update(input: Prisma.CategoriesUpdateArgs): Promise<Categories> {
    const res = await this.prisma.categories.update(input);
    await this.cacheControl.cacheCategories();
    await this.cacheControl.cacheTreeCategories();
    return res;
  }

  async delete(input: Prisma.CategoriesDeleteArgs) {
    const res = await this.prisma.categories.delete(input);
    await this.cacheControl.cacheCategories();
    await this.cacheControl.cacheTreeCategories();
    return res;
  }

  async cachedCategories(
    input: z.infer<typeof CategoriesFindManyArgsSchema>
  ): Promise<Categories[]> {
    return await this.cacheControl.getCachedCategories(input);
  }

  async activeCachedCategories(
    input: z.infer<typeof CategoriesFindManyArgsSchema>
  ): Promise<Categories[]> {
    return await this.cacheControl.getActiveCachedCategories(input);
  }
}
