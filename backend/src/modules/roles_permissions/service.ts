import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma, roles_permissions } from "@prisma/client";
import {
  roles_permissionsFindManyArgsSchema,
  roles_permissionsFindUniqueArgsSchema,
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
    const [roles_permissions] = await this.prisma.roles_permissions
      .paginate({
        ...input,
        include: {
          permissions: true,
        },
      })
      .withPages({
        limit: input.take ?? 20,
      });
    return roles_permissions;
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
    const res = await this.prisma.roles_permissions.createMany({
      data: input.permissions_ids.map((permission_id) => ({
        permission_id,
        role_id: input.role_id,
      })),
    });
    return res.count;
  }
}
