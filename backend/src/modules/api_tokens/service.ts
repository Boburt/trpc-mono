import { DB } from "@backend/trpc";
import { CacheControlService } from "../cache_control/service";
import { Prisma } from "@prisma/client";
import {
  api_tokens,
  api_tokensFindManyArgsSchema,
  api_tokensFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { z } from "zod";

export class ApiTokensService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControlService: CacheControlService
  ) {}

  async create(input: Prisma.api_tokensCreateArgs): Promise<api_tokens> {
    const res = await this.prisma.api_tokens.create(input);
    await this.cacheControlService.cacheApiTokens();
    return res;
  }

  async findMany(
    input: z.infer<typeof api_tokensFindManyArgsSchema>
  ): Promise<PaginationType<api_tokens>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [api_tokens, meta] = await this.prisma.api_tokens
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: api_tokens,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof api_tokensFindUniqueArgsSchema>
  ): Promise<api_tokens | null> {
    return await this.prisma.api_tokens.findUnique(input);
  }

  async update(input: Prisma.api_tokensUpdateArgs): Promise<api_tokens> {
    const res = await this.prisma.api_tokens.update(input);
    await this.cacheControlService.cacheApiTokens();
    return res;
  }

  async delete(input: Prisma.api_tokensDeleteArgs) {
    const res = await this.prisma.api_tokens.delete(input);
    await this.cacheControlService.cacheApiTokens();
    return res;
  }

  async cachedApiTokens(
    input: z.infer<typeof api_tokensFindManyArgsSchema>
  ): Promise<api_tokens[]> {
    return await this.cacheControlService.getCachedApiTokens(input);
  }
}
