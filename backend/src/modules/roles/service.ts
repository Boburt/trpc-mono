import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma, roles } from "@prisma/client";
import {
  rolesFindManyArgsSchema,
  rolesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { CacheControlService } from "../cache_control/service";

export class RolesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.rolesCreateArgs): Promise<roles> {
    const roles = await this.prisma.roles.create(input);
    await this.cacheControl.cacheRoles();
    return roles;
  }

  async findMany(
    input: z.infer<typeof rolesFindManyArgsSchema>
  ): Promise<roles[]> {
    const [roles] = await this.prisma.roles.paginate({}).withPages({
      limit: input.take ?? 20,
    });
    return roles;
  }

  async findOne(
    input: z.infer<typeof rolesFindUniqueArgsSchema>
  ): Promise<roles | null> {
    const role = await this.prisma.roles.findUnique(input);

    return role;
  }

  async update(input: Prisma.rolesUpdateArgs): Promise<roles | null> {
    return await this.prisma.roles.update(input);
  }

  async delete(input: Prisma.rolesDeleteArgs) {
    return await this.prisma.roles.delete(input);
  }

  async getCachedRoles(
    input: z.infer<typeof rolesFindManyArgsSchema>
  ): Promise<roles[]> {
    return await this.cacheControl.getCachedRoles(input);
  }
}
