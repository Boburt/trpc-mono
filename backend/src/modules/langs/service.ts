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

export class LangsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.LangsCreateArgs): Promise<Langs> {
    const res = await this.prisma.langs.create(input);
    await this.cacheControl.cacheLangs();
    return res;
  }

  async findMany(
    input: z.infer<typeof LangsFindManyArgsSchema>
  ): Promise<PaginationType<Langs>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.langs
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
