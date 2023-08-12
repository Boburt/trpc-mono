import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma, roles_permissions } from "@prisma/client";
import {
  rolesPermissionsCreateInput,
  rolesPermissionsFindManyZod,
} from "./dto/roles_permissions.dto";
import {
  roles_permissionsFindManyArgsSchema,
  roles_permissionsFindUniqueArgsSchema,
} from "@backend/lib/zod";

export class RolesPermissionsService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.roles_permissionsCreateArgs
  ): Promise<roles_permissions> {
    return await this.prisma.roles_permissions.create(input);
  }

  async findMany(
    input: z.infer<typeof roles_permissionsFindManyArgsSchema>
  ): Promise<roles_permissions[]> {
    const [roles_permissions] = await this.prisma.roles_permissions
      .paginate({})
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
}
