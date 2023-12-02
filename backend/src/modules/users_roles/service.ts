import {
  Users_roles,
  Users_rolesFindManyArgsSchema,
  Users_rolesFindUniqueArgsSchema,
  Users_rolesWithRelations,
} from "@backend/lib/zod";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createManyRolesForUserSchema } from "@backend/lib/custom_zod_objects/createManyRolesForUser";
import { DB, db } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { users_roles } from "@backend/../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export class UsersRolesService {
  constructor(
    private readonly prisma: DB,
    private readonly drizzle: DrizzleDB
  ) {}

  async create(input: Prisma.Users_rolesCreateArgs): Promise<Users_roles> {
    return await this.prisma.users_roles.create(input);
  }

  async findMany(
    input: z.infer<typeof Users_rolesFindManyArgsSchema>
  ): Promise<Users_rolesWithRelations[]> {
    const users_rolesList = await this.drizzle
      .select()
      .from(users_roles)
      .execute();

    // const users_roles = await this.drizzle.users_roles.findMany({
    //   ...input,
    //   include: {
    //     roles: true,
    //   },

    // const users_roles = await this.prisma.users_roles.findMany({
    //   ...input,
    //   include: {
    //     roles: true,
    //   },
    // });
    return users_rolesList as Users_rolesWithRelations[];
  }

  async findOne(
    input: z.infer<typeof Users_rolesFindUniqueArgsSchema>
  ): Promise<Users_roles | null> {
    return await this.prisma.users_roles.findUnique(input);
  }

  async update(input: Prisma.Users_rolesUpdateArgs): Promise<Users_roles> {
    return await this.prisma.users_roles.update(input);
  }

  async createManyRoles(
    input: z.infer<typeof createManyRolesForUserSchema>
  ): Promise<number> {
    await this.prisma.users_roles.deleteMany({
      where: {
        user_id: input.user_id,
      },
    });

    const res = await this.prisma.users_roles.createMany({
      data: input.roles_ids.map((role_id) => ({
        role_id,
        user_id: input.user_id,
      })),
    });
    return res.count;
  }
}
