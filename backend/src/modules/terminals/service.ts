import { Prisma } from "@prisma/client";
import { DB } from "@backend/trpc";
import { z } from "zod";
import {
  terminals,
  terminalsFindManyArgsSchema,
  terminalsFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { CacheControlService } from "../cache_control/service";
import { PaginationType } from "@backend/lib/pagination_interface";

export class TerminalsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheController: CacheControlService
  ) {}

  async create(input: Prisma.terminalsCreateArgs): Promise<terminals> {
    const res = await this.prisma.terminals.create(input);
    await this.cacheController.cacheTerminals();
    return res;
  }

  async findMany(
    input: z.infer<typeof terminalsFindManyArgsSchema>
  ): Promise<PaginationType<terminals>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;

    const [terminals, meta] = await this.prisma.terminals
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: terminals,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof terminalsFindUniqueArgsSchema>
  ): Promise<terminals | null> {
    return await this.prisma.terminals.findUnique(input);
  }

  async update(input: Prisma.terminalsUpdateArgs): Promise<terminals | null> {
    await this.cacheController.cacheTerminals();
    const res = await this.prisma.terminals.update(input);
    return res;
  }

  async delete(input: Prisma.terminalsDeleteArgs): Promise<terminals | null> {
    const res = await this.prisma.terminals.delete(input);
    await this.cacheController.cacheTerminals();
    return res;
  }

  async cachedTerminals(
    input: z.infer<typeof terminalsFindManyArgsSchema>
  ): Promise<terminals[]> {
    return await this.cacheController.getCachedTerminals(input);
  }
}
