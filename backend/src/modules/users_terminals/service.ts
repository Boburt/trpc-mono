import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  Users_terminals,
  Users_terminalsFindManyArgsSchema,
  Users_terminalsFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { DB } from "@backend/db";

export class UsersTerminalsService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.Users_terminalsCreateArgs
  ): Promise<Users_terminals> {
    return this.prisma.users_terminals.create(input);
  }

  async findMany(
    input: z.infer<typeof Users_terminalsFindManyArgsSchema>
  ): Promise<PaginationType<Users_terminals>> {
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
    input: z.infer<typeof Users_terminalsFindUniqueArgsSchema>
  ): Promise<Users_terminals | null> {
    return this.prisma.users_terminals.findUnique(input);
  }

  async update(
    input: Prisma.Users_terminalsUpdateArgs
  ): Promise<Users_terminals> {
    return this.prisma.users_terminals.update(input);
  }

  async delete(input: Prisma.Users_terminalsDeleteArgs) {
    return this.prisma.users_terminals.delete(input);
  }
}
