import {
  usersFindManyArgsSchema,
  usersFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma, users } from "@prisma/client";
import { z } from "zod";

export class UsersService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.usersCreateArgs): Promise<users> {
    return await this.prisma.users.create(input);
  }

  async findMany(
    input: z.infer<typeof usersFindManyArgsSchema>
  ): Promise<users[]> {
    const [users] = await this.prisma.users.paginate({}).withPages({
      limit: input.take ?? 20,
    });
    return users;
  }

  async findOne(
    input: z.infer<typeof usersFindUniqueArgsSchema>
  ): Promise<users | null> {
    const user = await this.prisma.users.findUnique(input);
    return user;
  }

  async update(input: Prisma.usersUpdateArgs): Promise<users> {
    return await this.prisma.users.update(input);
  }
}
