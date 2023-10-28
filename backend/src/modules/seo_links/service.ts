import type { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  SeoLinksFindManyArgsSchema,
  SeoLinksFindUniqueArgsSchema,
  SeoLinks,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";

export class SeoLinksService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.SeoLinksCreateArgs): Promise<SeoLinks> {
    const res = await this.prisma.seoLinks.create(input);
    await this.cacheControl.cacheSEOLinks(res.id);
    return res;
  }

  async findMany(
    input: z.infer<typeof SeoLinksFindManyArgsSchema>
  ): Promise<PaginationType<SeoLinks>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.seoLinks
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
    input: z.infer<typeof SeoLinksFindUniqueArgsSchema>
  ): Promise<SeoLinks | null> {
    const permission = await this.prisma.seoLinks.findUnique(input);
    return permission;
  }

  async update(input: Prisma.SeoLinksUpdateArgs): Promise<SeoLinks> {
    const existing = await this.prisma.seoLinks.findUnique({
      where: input.where,
    });
    const beforeLink = existing?.link ?? "";
    const res = await this.prisma.seoLinks.update(input);
    await this.cacheControl.cacheSEOLinks(res.id, beforeLink);
    return res;
  }

  async delete(input: Prisma.SeoLinksDeleteArgs) {
    const res = await this.prisma.seoLinks.delete(input);
    await this.cacheControl.deleteSEOLinks(res.id);
    return res;
  }

  async getByLink(input: { link: string }): Promise<SeoLinks | null> {
    return await this.cacheControl.getCachedSEOLinks(input.link);
  }
}
