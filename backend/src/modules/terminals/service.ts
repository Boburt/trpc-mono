import { Prisma } from "@prisma/client";
import { DB } from "@backend/trpc";
import { z } from "zod";
import {
  terminalsFindManyArgsSchema,
  terminalsFindUniqueArgsSchema,
} from "@backend/lib/zod";

export class TerminalsService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.terminalsCreateArgs) {
    return await this.prisma.terminals.create(input);
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
}
