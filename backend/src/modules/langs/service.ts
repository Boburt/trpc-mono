import type { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  LangsFindManyArgsSchema,
  LangsFindUniqueArgsSchema,
  Langs,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { langs } from "@backend/../drizzle/schema";
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";

export class LangsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) { }

  async create(input: Prisma.LangsCreateArgs): Promise<Langs> {
    const res = await this.prisma.langs.create(input);
    await this.cacheControl.cacheLangs();
    return res;
  }

  async findMany(
    input: z.infer<typeof LangsFindManyArgsSchema>
  ): Promise<PaginationType<InferSelectModel<typeof langs>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0; //: Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const langsCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(langs)
      .execute();

    const langsList = await this.drizzle
      .select()
      .from(langs)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +langsCount[0].count;

    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+langsCount[0].count / take),
      totalCount: +langsCount[0].count,
    };

    // const [permissions, meta] = await this.prisma.langs
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      items: langsList,
      meta: paginationMeta,
    };
  }

  async findOne(
    input: z.infer<typeof LangsFindUniqueArgsSchema>
  ): Promise<Langs | null> {
    const permission = await this.prisma.langs.findUnique(input);
    return permission;
  }

  async update(input: Prisma.LangsUpdateArgs): Promise<Langs> {
    const res = await this.prisma.langs.update(input);
    await this.cacheControl.cacheLangs();
    return res;
  }

  async delete(input: Prisma.LangsDeleteArgs) {
    const res = await this.prisma.langs.delete(input);
    await this.cacheControl.cacheLangs();
    return res;
  }

  async cachedLangs(
    input: z.infer<typeof LangsFindManyArgsSchema>
  ): Promise<Langs[]> {
    return await this.cacheControl.getCachedLangs(input);
  }
}
