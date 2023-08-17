import { PaginationType } from "@backend/lib/pagination_interface";
import {
  usersFindManyArgsSchema,
  usersFindUniqueArgsSchema,
  users as usersSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class UsersService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.usersCreateArgs): Promise<usersSchema> {
    return await this.prisma.users.create(input);
  }

  async findMany(
    input: z.infer<typeof usersFindManyArgsSchema>
  ): Promise<PaginationType<Omit<usersSchema, "password">>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [users, meta] = await this.prisma.users.paginate(input).withPages({
      limit: take,
      page: skip,
      includePageCount: true,
    });
    return {
      items: users.map((user) => {
        return this.exclude(user, ["password"]) as Omit<
          usersSchema,
          "password"
        >;
      }),
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof usersFindUniqueArgsSchema>
  ): Promise<Omit<usersSchema, "password"> | null> {
    const user = await this.prisma.users.findUnique(input);

    if (!user) {
      return null;
    }

    return this.exclude(user, ["password"]) as Omit<usersSchema, "password">;
  }

  private exclude<User extends Record<string, unknown>, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    const filteredEntries = Object.entries(
      user as Record<string, unknown>
    ).filter(([key]) => !keys.includes(key as Key));
    const filteredObject = Object.fromEntries(
      filteredEntries
    ) as unknown as Omit<User, Key>;
    return filteredObject;
  }

  async update(input: Prisma.usersUpdateArgs): Promise<usersSchema> {
    return await this.prisma.users.update(input);
  }

  async delete(input: Prisma.usersDeleteArgs): Promise<usersSchema> {
    return await this.prisma.users.delete(input);
  }
}
