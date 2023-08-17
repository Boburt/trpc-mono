import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import {
  roles_permissionsFindManyArgsSchema,
  roles_permissionsFindUniqueArgsSchema,
  roles_permissions,
  roles_permissionsWithRelations,
} from "@backend/lib/zod";
import { createManyPermissionsForOneRole } from "@backend/lib/custom_zod_objects/createManyPermissionsForOneRole";

export class RolesPermissionsService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.roles_permissionsCreateArgs
  ): Promise<roles_permissions> {
    return await this.prisma.roles_permissions.create(input);
  }

  async findMany(
    input: z.infer<typeof roles_permissionsFindManyArgsSchema>
  ): Promise<roles_permissionsWithRelations[]> {
    const roles_permissions = await this.prisma.roles_permissions.findMany({
      ...input,
      include: {
        permissions: true,
      },
    });
    return roles_permissions as roles_permissionsWithRelations[];
  }

  async findOne(
    input: z.infer<typeof roles_permissionsFindUniqueArgsSchema>
  ): Promise<roles_permissions | null> {
    const roles_permissions = await this.prisma.roles_permissions.findUnique(
      input
    );
    return roles_permissions;
  }

  async update(
    input: Prisma.roles_permissionsUpdateArgs
  ): Promise<roles_permissions | null> {
    return await this.prisma.roles_permissions.update(input);
  }

  async createManyPermissions(
    input: z.infer<typeof createManyPermissionsForOneRole>
  ): Promise<number> {
    await this.prisma.roles_permissions.deleteMany({
      where: {
        role_id: input.role_id,
      },
    });

    const res = await this.prisma.roles_permissions.createMany({
      data: input.permissions_ids.map((permission_id) => ({
        permission_id,
        role_id: input.role_id,
      })),
    });
    return res.count;
  }
}
