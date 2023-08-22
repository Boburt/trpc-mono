import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import {
  Roles_permissionsFindManyArgsSchema,
  Roles_permissionsFindUniqueArgsSchema,
  Roles_permissions,
  Roles_permissionsWithRelations,
} from "@backend/lib/zod";
import { createManyPermissionsForOneRole } from "@backend/lib/custom_zod_objects/createManyPermissionsForOneRole";
import { CacheControlService } from "../cache_control/service";

export class RolesPermissionsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheController: CacheControlService
  ) {}

  async create(
    input: Prisma.Roles_permissionsCreateArgs
  ): Promise<Roles_permissions> {
    return await this.prisma.roles_permissions.create(input);
  }

  async findMany(
    input: z.infer<typeof Roles_permissionsFindManyArgsSchema>
  ): Promise<Roles_permissionsWithRelations[]> {
    const roles_permissions = await this.prisma.roles_permissions.findMany({
      ...input,
      include: {
        permissions: true,
      },
    });
    return roles_permissions as Roles_permissionsWithRelations[];
  }

  async findOne(
    input: z.infer<typeof Roles_permissionsFindUniqueArgsSchema>
  ): Promise<Roles_permissions | null> {
    const roles_permissions = await this.prisma.roles_permissions.findUnique(
      input
    );
    return roles_permissions;
  }

  async update(
    input: Prisma.Roles_permissionsUpdateArgs
  ): Promise<Roles_permissions | null> {
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
    this.cacheController.cacheRoles();
    return res.count;
  }
}
