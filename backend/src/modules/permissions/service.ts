import { PrismaClient, permissions } from "@prisma/client";
import { paginate } from "prisma-extension-pagination";
import { DB } from "@backend/trpc";
import { z } from "zod";

import {
  permissionsAdd,
  permissionsList,
  permissionsMutation,
  permissionsOne,
  permissionsRenew,
} from "@lib/zod_objects/permissions/z_objects";

export class PermissionsService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: z.infer<typeof permissionsMutation>
  ): Promise<permissions> {
    return await this.prisma.permissions.create({
      data: input,
    });
  }

  async findMany(
    input: z.infer<typeof permissionsList>
  ): Promise<permissions[]> {
    const [permissions] = await this.prisma.permissions.paginate({}).withPages({
      limit: input.take ?? 20,
    });
    return permissions;
  }

  async findOne(input: z.infer<typeof permissionsOne>): Promise<permissions> {
    const permission = await this.prisma.permissions.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!permission) {
      throw new Error(`Permission with id ${input.id} not found.`);
    }

    return permission;
  }

  async update(
    input: z.infer<typeof permissionsMutation>
  ): Promise<permissions> {
    return await this.prisma.permissions.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  }

  async remove(id: string) {
    return `This action removes a #${id} permission`;
  }
}
