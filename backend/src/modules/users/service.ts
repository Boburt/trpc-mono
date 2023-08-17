import { PaginationType } from "@backend/lib/pagination_interface";
import {
  usersFindManyArgsSchema,
  usersFindUniqueArgsSchema,
  users,
  users_roles,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { hashPassword } from "@backend/lib/bcrypt";
import { z } from "zod";

export class UsersService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.usersCreateArgs): Promise<users> {
    if (input.data.password) {
      const { hash, salt } = await hashPassword(input.data.password);
      input.data.password = md5hash(input.data.password);
      input.data.salt = salt;
    }
    return await this.prisma.users.create(input);
  }

  async findMany(
    input: z.infer<typeof usersFindManyArgsSchema>
  ): Promise<PaginationType<users>> {
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
    return { items: users, meta };
  }

  async findOne(
    input: z.infer<typeof usersFindUniqueArgsSchema>
  ): Promise<users | null> {
    return this.prisma.users.findUnique(input);
  }

  async update(input: Prisma.usersUpdateArgs): Promise<users> {
    if (input.data.password) {
      const { hash, salt } = await hashPassword(input.data.password);
      input.data.password = md5hash(input.data.password);
      input.data.salt = salt;
    }
    return await this.prisma.users.update(input);
  }

  async delete(input: Prisma.usersDeleteArgs): Promise<users> {
    return await this.prisma.users.delete(input);
  }

  async assignRole(
    input: Prisma.users_rolesUncheckedCreateInput
  ): Promise<users_roles> {
    await this.prisma.users_roles.deleteMany({
      where: {
        user_id: input.user_id,
      },
    });
    console.log("user role input", input);
    return await this.prisma.users_roles.create({ data: input });
  }
}
