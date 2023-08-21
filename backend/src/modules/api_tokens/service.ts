import { DB } from "@backend/trpc";
import { CacheControlService } from "../cache_control/service";
import { Prisma } from "@prisma/client";
import {
  Api_tokens,
  Api_tokensFindManyArgsSchema,
  Api_tokensFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { z } from "zod";

export class ApiTokensService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControlService: CacheControlService
  ) {}

  async create(input: Prisma.Api_tokensCreateArgs): Promise<Api_tokens> {
    const res = await this.prisma.api_tokens.create(input);
    await this.cacheControlService.cacheApiTokens();
    return res;
  }

  async findMany(
    input: z.infer<typeof Api_tokensFindManyArgsSchema>
  ): Promise<PaginationType<Api_tokens>> {
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
    input: z.infer<typeof Api_tokensFindUniqueArgsSchema>
  ): Promise<Api_tokens | null> {
    return await this.prisma.api_tokens.findUnique(input);
  }

  async update(input: Prisma.Api_tokensUpdateArgs): Promise<Api_tokens> {
    const res = await this.prisma.api_tokens.update(input);
    await this.cacheControlService.cacheApiTokens();
    return res;
  }

  async delete(input: Prisma.Api_tokensDeleteArgs) {
    const res = await this.prisma.api_tokens.delete(input);
    await this.cacheControlService.cacheApiTokens();
    return res;
  }

  async cachedApiTokens(
    input: z.infer<typeof Api_tokensFindManyArgsSchema>
  ): Promise<Api_tokens[]> {
    return await this.cacheControlService.getCachedApiTokens(input);
  }
}
