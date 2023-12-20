import { Prisma } from "@prisma/client";
import {
  Users_permissionsFindManyArgsSchema,
  Users_permissionsFindUniqueArgsSchema,
  Users_permissionsWithRelations,
  Users_permissions,
} from "@backend/lib/zod";
import { z } from "zod";
import { createManyPermissionsForOneUser } from "@backend/lib/custom_zod_objects/createManyPermissionsForOneUser";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { InferSelectModel, sql } from "drizzle-orm";
import { users_permissions } from "@backend/../drizzle/schema";

export class UsersPermissionsService {
  constructor(
    private readonly prisma: DB,
    private readonly drizzle: DrizzleDB
  ) { }

  async create(
    input: Prisma.Users_permissionsCreateArgs
  ): Promise<Users_permissions> {
    return await this.prisma.users_permissions.create(input);
  }

  async findMany(
    input: z.infer<typeof Users_permissionsFindManyArgsSchema>
  ): Promise<Users_permissionsWithRelations[]> {
    const users_permissionsList = await this.drizzle
      .select()
      .from(users_permissions)
      .execute();

    // const users_permissions = await this.drizzle.query.users_permissions.findMany({
    //   ...input,
    //   with: {
    //     permissions: true,
    //   },

    //   // const users_permissions = await this.prisma.users_permissions.findMany({
    //   //   ...input,
    //   //   include: {
    //   //     permissions: true,
    //   //   },
    // });

    return users_permissionsList as Users_permissionsWithRelations[];
  }

  async findOne(
    input: z.infer<typeof Users_permissionsFindUniqueArgsSchema>
  ): Promise<Users_permissions | null> {
    const users_permissions = await this.prisma.users_permissions.findUnique(
      input
    );
    return users_permissions;
  }

  async update(
    input: Prisma.Users_permissionsUpdateArgs
  ): Promise<Users_permissions | null> {
    return await this.prisma.users_permissions.update(input);
  }

  async createManyPermissions(
    input: z.infer<typeof createManyPermissionsForOneUser>
  ): Promise<number> {
    await this.prisma.users_permissions.deleteMany({
      where: {
        user_id: input.user_id,
      },
    });

    const res = await this.prisma.users_permissions.createMany({
      data: input.permissions_ids.map((permission_id) => ({
        permission_id,
        user_id: input.user_id,
      })),
    });
    return res.count;
  }
}
