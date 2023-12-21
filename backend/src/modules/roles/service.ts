import { z } from "zod";
import { Prisma } from "@prisma/client";
import {
  RolesFindManyArgsSchema,
  RolesFindUniqueArgsSchema,
  Roles,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { roles } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class RolesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
  ) { }

  async create(input: Prisma.RolesCreateArgs): Promise<Roles> {
    const roles = await this.prisma.roles.create(input);
    await this.cacheControl.cacheRoles();
    return roles;
  }

  async findMany(
    input: z.infer<typeof RolesFindManyArgsSchema>
  ): Promise<PaginationType<InferSelectModel<typeof roles>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const rolesCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(roles)
      .execute();

    const rolesList = await this.drizzle
      .select()
      .from(roles)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +rolesCount[0].count;

    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+rolesCount[0].count / take),
      totalCount: +rolesCount[0].count,
    };

    // const [roles, meta] = await this.prisma.roles.paginate(input).withPages({
    //   limit: take,
    //   page: skip,
    //   includePageCount: true,
    // });

    return {
      items: rolesList,
      meta: paginationMeta,
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
