import { PrismaClient, permissions } from "@prisma/client";
import { paginate } from "prisma-extension-pagination";
import { DB } from "@backend/trpc";
import { z } from "zod";

import { permissionsCreateInputSchema } from "@lib/zodGeneratedFiles/zod/inputTypeSchemas";
import { permissionsOptionalDefaults } from "@lib/zodGeneratedFiles/zod/modelSchema";
import { permissionsFindManyArgsSchema } from "@lib/zodGeneratedFiles/zod/outputTypeSchemas";

export class PermissionsService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: z.infer<typeof permissionsCreateInputSchema>
  ): Promise<permissionsOptionalDefaults> {
    return await this.prisma.permissions.create({
      data: input,
    });
  }

  async findMany(
    input: z.infer<typeof permissionsFindManyArgsSchema>
  ): Promise<permissionsOptionalDefaults[]> {
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
