import type { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  PermissionsFindManyArgsSchema,
  PermissionsFindUniqueArgsSchema,
  Permissions,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { permissions } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class PermissionsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) {}

  async create(input: Prisma.PermissionsCreateArgs): Promise<Permissions> {
    const res = await this.prisma.permissions.create(input);
    await this.cacheControl.cachePermissions();
    return res;
  }

  async findMany(
    input: z.infer<typeof PermissionsFindManyArgsSchema>
    ): Promise<PaginationType<InferSelectModel<typeof permissions>>> {
  // ): Promise<PaginationType<Permissions>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const permissionsCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(permissions)
      .execute();

    const permissionsList = await this.drizzle
      .select()
      .from(permissions)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +permissionsCount[0].count;

    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+permissionsCount[0].count / take),
      totalCount: +permissionsCount[0].count,
    };

    // const [permissions, meta] = await this.prisma.permissions
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      // items: permissions,
      // meta,
      items: permissionsList,
      meta: paginationMeta,
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
