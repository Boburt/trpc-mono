import type { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  ManufacturersReviewsFindManyArgsSchema,
  ManufacturersReviewsFindUniqueArgsSchema,
  ManufacturersReviews,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { Queue } from "bullmq";
import { DrizzleDB } from "@backend/lib/db";
import { manufacturers_reviews } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class ManufacturersReviewsService {
  constructor(
    private readonly prisma: DB,
    private readonly indexReviewQueue: Queue,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) {}

  async findMany(
    input: z.infer<typeof ManufacturersReviewsFindManyArgsSchema>
  ): Promise<PaginationType<InferSelectModel<typeof manufacturers_reviews>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const permissionsCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(manufacturers_reviews)
      .execute();

    const permissionsList = await this.drizzle
      .select()
      .from(manufacturers_reviews)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +permissionsCount[0].count;
    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+permissionsCount[0].count / take),
      totalCount: +permissionsCount[0].count,
    };

    // const [permissions, meta] = await this.prisma.manufacturersReviews
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      items: permissionsList,
      meta: paginationMeta,
    };
  }

  async findOne(
    input: z.infer<typeof ManufacturersReviewsFindUniqueArgsSchema>
  ): Promise<ManufacturersReviews | null> {
    const permission = await this.prisma.manufacturersReviews.findUnique(input);
    return permission;
  }

  async update(
    input: Prisma.ManufacturersReviewsUpdateArgs
  ): Promise<ManufacturersReviews> {
    const res = await this.prisma.manufacturersReviews.update(input);
    await this.indexReviewQueue.add(
      res.id,
      {
        id: res.id,
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      }
    );
    return res;
  }

  async delete(input: Prisma.ManufacturersReviewsDeleteArgs) {
    const res = await this.prisma.manufacturersReviews.delete(input);
    return res;
  }
}
