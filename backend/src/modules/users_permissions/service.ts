import { Prisma } from "@prisma/client";
import { DB } from "@backend/trpc";
import { users_permissions } from "@prisma/client";
import {
  users_permissionsFindManyArgsSchema,
  users_permissionsFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { z } from "zod";
import { createManyPermissionsForOneUser } from "@backend/lib/custom_zod_objects/createManyPermissionsForOneUser";

export class UsersPermissionsService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.users_permissionsCreateArgs
  ): Promise<users_permissions> {
    return await this.prisma.users_permissions.create(input);
  }

  async findMany(
    input: z.infer<typeof users_permissionsFindManyArgsSchema>
  ): Promise<users_permissions[]> {
    const [users_permissions] = await this.prisma.users_permissions
      .paginate({})
      .withPages({
        limit: input.take ?? 20,
      });
    return users_permissions;
  }

  async findOne(
    input: z.infer<typeof users_permissionsFindUniqueArgsSchema>
  ): Promise<users_permissions | null> {
    const users_permissions = await this.prisma.users_permissions.findUnique(
      input
    );
    return users_permissions;
  }

  async update(
    input: Prisma.users_permissionsUpdateArgs
  ): Promise<users_permissions> {
    return await this.prisma.users_permissions.update(input);
  }

  async createManyPermissions(
    input: z.infer<typeof createManyPermissionsForOneUser>
  ): Promise<number> {
    const res = await this.prisma.users_permissions.createMany({
      data: input.permissions_ids.map((permission_id) => ({
        permission_id,
        user_id: input.user_id,
      })),
    });
    return res.count;
  }
}
