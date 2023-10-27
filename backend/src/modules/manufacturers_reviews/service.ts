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

export class ManufacturersReviewsService {
  constructor(
    private readonly prisma: DB,
    private readonly indexReviewQueue: Queue
  ) {}

  async findMany(
    input: z.infer<typeof ManufacturersReviewsFindManyArgsSchema>
  ): Promise<PaginationType<ManufacturersReviews>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.manufacturersReviews
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
