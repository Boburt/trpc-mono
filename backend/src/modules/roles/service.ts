import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import {
  RolesFindManyArgsSchema,
  RolesFindUniqueArgsSchema,
  Roles,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";

export class RolesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.RolesCreateArgs): Promise<Roles> {
    const roles = await this.prisma.roles.create(input);
    await this.cacheControl.cacheRoles();
    return roles;
  }

  async findMany(
    input: z.infer<typeof RolesFindManyArgsSchema>
  ): Promise<PaginationType<Roles>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [roles, meta] = await this.prisma.roles.paginate(input).withPages({
      limit: take,
      page: skip,
      includePageCount: true,
    });
    return {
      items: roles,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof RolesFindUniqueArgsSchema>
  ): Promise<Roles | null> {
    const role = await this.prisma.roles.findUnique(input);

    return role;
  }

  async update(input: Prisma.RolesUpdateArgs): Promise<Roles | null> {
    const res = await this.prisma.roles.update(input);
    await this.cacheControl.cacheRoles();
    return res;
  }

  async delete(input: Prisma.RolesDeleteArgs) {
    const res = await this.prisma.roles.delete(input);
    await this.cacheControl.cacheRoles();
    return res;
  }

  async cachedRoles(
    input: z.infer<typeof RolesFindManyArgsSchema>
  ): Promise<Roles[]> {
    return await this.cacheControl.getCachedRoles(input);
  }
}
