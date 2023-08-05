import { DB } from "@backend/trpc";
import { z } from "zod";
import { roles_permissions } from "@prisma/client";
import {
  rolesPermissionsCreateInput,
  rolesPermissionsFindManyZod,
} from "./dto/roles_permissions.dto";

export class RolesService {
  constructor(private readonly prisma: DB) {}

  async create(input: rolesPermissionsCreateInput): Promise<roles_permissions> {
    return await this.prisma.roles_permissions.create({
      data: input,
    });
  }

  async findMany(
    input: z.infer<typeof rolesPermissionsFindManyZod>
  ): Promise<roles_permissions[]> {
    const [roles_permissions] = await this.prisma.roles_permissions
      .paginate({})
      .withPages({
        limit: input.take ?? 20,
      });
    return roles_permissions;
  }
}
