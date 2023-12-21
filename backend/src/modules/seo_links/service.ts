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
import { DrizzleDB } from "@backend/lib/db";
import { seo_links } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class SeoLinksService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) { }

  async create(input: Prisma.SeoLinksCreateArgs): Promise<SeoLinks> {
    const res = await this.prisma.seoLinks.create(input);
    await this.cacheControl.cacheSEOLinks(res.id);
    return res;
  }

  async findMany(
    input: z.infer<typeof SeoLinksFindManyArgsSchema>
  ): Promise<PaginationType<InferSelectModel<typeof seo_links>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    delete input.take;
    delete input.skip;

    const seoLinksCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(seo_links)
      .execute();

    const seoLinksList = await this.drizzle
      .select()
      .from(seo_links)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +seoLinksCount[0].count;

    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+seoLinksCount[0].count / take),
      totalCount: +seoLinksCount[0].count,
    };

    return {
      items: seoLinksList,
      meta: paginationMeta,
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
