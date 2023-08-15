import {
  users_rolesFindManyArgsSchema,
  users_rolesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createManyRolesForUserSchema } from "@backend/lib/custom_zod_objects/createManyRolesForUser";

export class UsersRolesService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.users_rolesCreateArgs) {
    return await this.prisma.users_roles.create(input);
  }

  async findMany(input: z.infer<typeof users_rolesFindManyArgsSchema>) {
    return await this.prisma.users_roles.paginate({}).withPages({
      limit: input.take ?? 20,
    });
  }

  async findOne(input: z.infer<typeof users_rolesFindUniqueArgsSchema>) {
    return await this.prisma.users_roles.findUnique(input);
  }

  async update(input: Prisma.users_rolesUpdateArgs) {
    return await this.prisma.users_roles.update(input);
  }

  async createManyRoles(
    input: z.infer<typeof createManyRolesForUserSchema>
  ): Promise<number> {
    const res = await this.prisma.users_roles.createMany({
      data: input.roles_ids.map((role_id) => ({
        role_id,
        user_id: input.user_id,
      })),
    });
    return res.count;
  }
}
