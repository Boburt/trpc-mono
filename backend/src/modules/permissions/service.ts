import { PrismaClient, permissions } from "@prisma/client";
import {
  permissionsCreateInput,
  permissionsFindManyZod,
} from "./dto/permissions.dto";
import { paginate } from "prisma-extension-pagination";
import { DB } from "@backend/trpc";
import { z } from "zod";

export class PermissionsService {
  constructor(private readonly prisma: DB) {}

  async create(input: permissionsCreateInput): Promise<permissions> {
    return await this.prisma.permissions.create({
      data: input,
    });
  }

  async findMany(
    input: z.infer<typeof permissionsFindManyZod>
  ): Promise<permissions[]> {
    const [permissions] = await this.prisma.permissions.paginate({}).withPages({
      limit: input.take ?? 20,
    });
    return permissions;
  }

  async findOne(id: string): Promise<permissions | null> {
    const permission = await this.prisma.permissions.findUnique({
      where: {
        id: id,
      },
    });

    if (!permission) {
      throw new Error(`Permission with id ${id} not found.`);
    }

    return permission;
  }

  async update(
    id: string,
    input: permissionsCreateInput
  ): Promise<permissions | null> {
    return await this.prisma.permissions.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: string, input: permissionsCreateInput) {
    return `This action removes a #${id} permission`;
  }
}
