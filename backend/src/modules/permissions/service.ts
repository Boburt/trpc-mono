import type { Prisma } from "@prisma/client";
import { DB } from "@backend/trpc";
import { z } from "zod";

import {
  PermissionsFindManyArgsSchema,
  PermissionsFindUniqueArgsSchema,
  Permissions,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";

export class PermissionsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.PermissionsCreateArgs): Promise<Permissions> {
    const res = await this.prisma.permissions.create(input);
    await this.cacheControl.cachePermissions();
    return res;
  }

  async findMany(
    input: z.infer<typeof PermissionsFindManyArgsSchema>
  ): Promise<PaginationType<Permissions>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.permissions
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });

    return {
      items: permissions,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof PermissionsFindUniqueArgsSchema>
  ): Promise<Permissions | null> {
    const permission = await this.prisma.permissions.findUnique(input);
    return permission;
  }

  async update(input: Prisma.PermissionsUpdateArgs): Promise<Permissions> {
    const res = await this.prisma.permissions.update(input);
    await this.cacheControl.cachePermissions();
    return res;
  }

  async delete(input: Prisma.PermissionsDeleteArgs) {
    const res = await this.prisma.permissions.delete(input);
    await this.cacheControl.cachePermissions();
    return res;
  }

  async cachedPermissions(
    input: z.infer<typeof PermissionsFindManyArgsSchema>
  ): Promise<Permissions[]> {
    return await this.cacheControl.getCachedPermissions(input);
  }
}
