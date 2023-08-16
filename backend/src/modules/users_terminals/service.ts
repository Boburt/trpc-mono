import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  users_terminalsFindManyArgsSchema,
  users_terminalsFindUniqueArgsSchema,
} from "@backend/lib/zod";

export class UsersTerminalsService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.users_terminalsCreateArgs) {
    return this.prisma.users_terminals.create(input);
  }

  async findMany(input: z.infer<typeof users_terminalsFindManyArgsSchema>) {
    return this.prisma.users_terminals.paginate({}).withPages({
      limit: input.take ?? 20,
    });
  }

  async findUnique(input: z.infer<typeof users_terminalsFindUniqueArgsSchema>) {
    return this.prisma.users_terminals.findUnique(input);
  }

  async Update(input: Prisma.users_terminalsUpdateArgs) {
    return this.prisma.users_terminals.update(input);
  }
}
