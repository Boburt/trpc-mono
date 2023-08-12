import type { Prisma } from "@prisma/client";
import { paginate } from "prisma-extension-pagination";
import { DB } from "@backend/trpc";
import { z } from "zod";

import { permissions } from "@lib/zodGeneratedFiles/zod/modelSchema";
import {
  permissionsCreateArgsSchema,
  permissionsFindManyArgsSchema,
  permissionsFindUniqueArgsSchema,
  permissionsUpdateArgsSchema,
} from "@lib/zodGeneratedFiles/zod/outputTypeSchemas";

export class PermissionsService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.permissionsCreateArgs): Promise<permissions> {
    return await this.prisma.permissions.create(input);
  }

  async findMany(
    input: z.infer<typeof permissionsFindManyArgsSchema>
  ): Promise<permissions[]> {
    const [permissions] = await this.prisma.permissions.paginate({}).withPages({
      limit: input.take ?? 20,
    });
    return permissions;
  }

  async findOne(
    input: z.infer<typeof permissionsFindUniqueArgsSchema>
  ): Promise<permissions | null> {
    const permission = await this.prisma.permissions.findUnique(input);
    return permission;
  }

  async update(input: Prisma.permissionsUpdateArgs): Promise<permissions> {
    return await this.prisma.permissions.update(input);
  }

  async remove(id: string) {
    return `This action removes a #${id} permission`;
  }
}
