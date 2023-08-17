import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  users_terminals,
  users_terminalsFindManyArgsSchema,
  users_terminalsFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";

export class UsersTerminalsService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.users_terminalsCreateArgs
  ): Promise<users_terminals> {
    return this.prisma.users_terminals.create(input);
  }

  async findMany(
    input: z.infer<typeof users_terminalsFindManyArgsSchema>
  ): Promise<PaginationType<users_terminals>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [users_terminals, meta] = await this.prisma.users_terminals
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: users_terminals,
      meta,
    };
  }

  async findUnique(
    input: z.infer<typeof users_terminalsFindUniqueArgsSchema>
  ): Promise<users_terminals | null> {
    return this.prisma.users_terminals.findUnique(input);
  }

  async Update(
    input: Prisma.users_terminalsUpdateArgs
  ): Promise<users_terminals> {
    return this.prisma.users_terminals.update(input);
  }

  async delete(input: Prisma.users_terminalsDeleteArgs) {
    return this.prisma.users_terminals.delete(input);
  }
}
