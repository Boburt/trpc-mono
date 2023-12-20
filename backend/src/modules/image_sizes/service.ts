import type { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  ImageSizesFindManyArgsSchema,
  ImageSizesFindUniqueArgsSchema,
  ImageSizes,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { image_sizes } from "@backend/../drizzle/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { InferSelectModel, sql } from "drizzle-orm";

export class ImageSizesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) { }

  async create(input: Prisma.ImageSizesCreateArgs): Promise<ImageSizes> {
    const res = await this.prisma.imageSizes.create(input);
    await this.cacheControl.cacheImageSizes();
    return res;
  }

  async findMany(
    input: z.infer<typeof ImageSizesFindManyArgsSchema>
  ): Promise<PaginationType<InferSelectModel<typeof image_sizes>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const imageSizesCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(image_sizes)
      .execute();

    const imageSizesList = await this.drizzle
      .select()
      .from(image_sizes)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +imageSizesCount[0].count;

    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+imageSizesCount[0].count / take),
      totalCount: +imageSizesCount[0].count,
    };

    // const [permissions, meta] = await this.prisma.imageSizes
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      items: imageSizesList,
      meta: paginationMeta,
    };
  }

  async findOne(
    input: z.infer<typeof ImageSizesFindUniqueArgsSchema>
  ): Promise<ImageSizes | null> {
    const permission = await this.prisma.imageSizes.findUnique(input);
    return permission;
  }

  async update(input: Prisma.ImageSizesUpdateArgs): Promise<ImageSizes> {
    const res = await this.prisma.imageSizes.update(input);
    await this.cacheControl.cacheImageSizes();
    return res;
  }

  async delete(input: Prisma.ImageSizesDeleteArgs) {
    const res = await this.prisma.imageSizes.delete(input);
    await this.cacheControl.cacheImageSizes();
    return res;
  }

  async cachedImageSizes(
    input: z.infer<typeof ImageSizesFindManyArgsSchema>
  ): Promise<ImageSizes[]> {
    return await this.cacheControl.getCachedImageSizes(input);
  }
}
