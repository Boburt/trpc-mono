import { Prisma } from "@prisma/client";
import { DB } from "@backend/trpc";
import { z } from "zod";
import {
  terminals,
  terminalsFindManyArgsSchema,
  terminalsFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { CacheControlService } from "../cache_control/service";

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

  async findMany(input: z.infer<typeof terminalsFindManyArgsSchema>) {
    return await this.prisma.terminals.paginate({}).withPages({
      limit: input.take ?? 20,
    });
  }

  async findOne(input: z.infer<typeof terminalsFindUniqueArgsSchema>) {
    return await this.prisma.terminals.findUnique(input);
  }

  async update(input: Prisma.terminalsUpdateArgs) {
    return await this.prisma.terminals.update(input);
  }

  async delete(input: Prisma.terminalsDeleteArgs) {
    return await this.prisma.terminals.delete(input);
  }
}
