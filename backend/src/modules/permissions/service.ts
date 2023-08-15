import type { Prisma } from "@prisma/client";
import { paginate } from "prisma-extension-pagination";
import { DB } from "@backend/trpc";
import { z } from "zod";

import {
  permissionsFindManyArgsSchema,
  permissionsFindUniqueArgsSchema,
  permissions,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";

export class PermissionsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.permissionsCreateArgs): Promise<permissions> {
    const res = await this.prisma.permissions.create(input);
    await this.cacheControl.cachePermissions();
    return res;
  }

  async findMany(
    input: z.infer<typeof permissionsFindManyArgsSchema>
  ): Promise<PaginationType<permissions>> {
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
    input: z.infer<typeof permissionsFindUniqueArgsSchema>
  ): Promise<permissions | null> {
    const permission = await this.prisma.permissions.findUnique(input);
    return permission;
  }

  async update(input: Prisma.permissionsUpdateArgs): Promise<permissions> {
    const res = await this.prisma.permissions.update(input);
    await this.cacheControl.cachePermissions();
    return res;
  }

  async delete(input: Prisma.permissionsDeleteArgs) {
    return await this.prisma.permissions.delete(input);
  }

  async cachedPermissions(
    input: z.infer<typeof permissionsFindManyArgsSchema>
  ): Promise<permissions[]> {
    return await this.cacheControl.getCachedPermissions(input);
  }
}
