import { PaginationType } from "@backend/lib/pagination_interface";
import {
  Sessions,
  SessionsFindManyArgsSchema,
  SessionsFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class SessionsService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.SessionsCreateArgs) {
    return this.prisma.sessions.create(input);
  }

  async findMany(
    input: z.infer<typeof SessionsFindManyArgsSchema>
  ): Promise<PaginationType<Sessions>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [sessions, meta] = await this.prisma.sessions
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });

    return {
      items: sessions,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof SessionsFindUniqueArgsSchema>
  ): Promise<Sessions | null> {
    const session = await this.prisma.sessions.findUnique(input);
    return session;
  }

  async update(input: Prisma.SessionsUpdateArgs): Promise<Sessions> {
    return this.prisma.sessions.update(input);
  }

  async delete(input: Prisma.SessionsDeleteArgs) {
    return this.prisma.sessions.delete(input);
  }
}
