import type { Categories, Prisma } from "@prisma/client";
import { z } from "zod";

import {
  CategoriesFindManyArgsSchema,
  CategoriesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";

export class CategoriesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.CategoriesCreateArgs): Promise<Categories> {
    const res = await this.prisma.categories.create(input);
    await this.cacheControl.cacheCategories();
    return res;
  }

  async findMany(
    input: z.infer<typeof CategoriesFindManyArgsSchema>
  ): Promise<PaginationType<Categories>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.categories
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
    input: z.infer<typeof CategoriesFindUniqueArgsSchema>
  ): Promise<Categories | null> {
    const permission = await this.prisma.categories.findUnique(input);
    return permission;
  }

  async update(input: Prisma.CategoriesUpdateArgs): Promise<Categories> {
    const res = await this.prisma.categories.update(input);
    await this.cacheControl.cacheCategories();
    return res;
  }

  async delete(input: Prisma.CategoriesDeleteArgs) {
    const res = await this.prisma.categories.delete(input);
    await this.cacheControl.cacheCategories();
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
