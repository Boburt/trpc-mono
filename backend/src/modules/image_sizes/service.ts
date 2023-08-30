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

export class ImageSizesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.ImageSizesCreateArgs): Promise<ImageSizes> {
    const res = await this.prisma.imageSizes.create(input);
    await this.cacheControl.cacheImageSizes();
    return res;
  }

  async findMany(
    input: z.infer<typeof ImageSizesFindManyArgsSchema>
  ): Promise<PaginationType<ImageSizes>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.imageSizes
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
