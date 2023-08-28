import { DB } from "@backend/db";
import {
  RolesWithRelations,
  Permissions,
  Api_tokens,
  Scheduled_reports,
  Langs,
} from "@backend/lib/zod";
import { RedisClientType } from "@backend/trpc";
import { Categories } from "@prisma/client";

export class CacheControlService {
  constructor(
    private readonly prisma: DB,
    private readonly redis: RedisClientType
  ) {
    this.cachePermissions();
    this.cacheRoles();
    this.cacheLangs();
    this.cacheCategories();
  }

  async cachePermissions() {
    const permissions = await this.prisma.permissions.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}permissions`,
      JSON.stringify(permissions)
    );
  }

  async getCachedPermissions({
    take,
  }: {
    take?: number;
  }): Promise<Permissions[]> {
    const permissions = await this.redis.get(
      `${process.env.PROJECT_PREFIX}permissions`
    );
    let res = JSON.parse(permissions ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheRoles() {
    const roles = await this.prisma.roles.findMany({
      include: {
        roles_permissions: {
          include: {
            permissions: true,
          },
        },
      },
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}roles`,
      JSON.stringify(roles)
    );
  }

  async getCachedRoles({
    take,
  }: {
    take?: number;
  }): Promise<RolesWithRelations[]> {
    const roles = await this.redis.get(`${process.env.PROJECT_PREFIX}roles`);
    let res = JSON.parse(roles ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }
  async getPermissionsByRoleId(roleId: string) {
    const roles = await this.getCachedRoles({});
    // console.log("roles", roles);
    const role = roles.find((role) => role.id === roleId);
    if (!role) {
      return [];
    }
    return role.roles_permissions.map((rolePermission) => {
      return rolePermission.permissions.slug;
    });
  }

  async cacheApiTokens() {
    const apiTokens = await this.prisma.api_tokens.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}api_tokens`,
      JSON.stringify(apiTokens)
    );
  }

  async getCachedApiTokens({ take }: { take?: number }): Promise<Api_tokens[]> {
    const apiTokens = await this.redis.get(
      `${process.env.PROJECT_PREFIX}api_tokens`
    );
    let res = JSON.parse(apiTokens ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheLangs() {
    const langs = await this.prisma.langs.findMany({
      take: 100,
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}langs`,
      JSON.stringify(langs)
    );
  }

  async getCachedLangs({ take }: { take?: number }): Promise<Langs[]> {
    const langs = await this.redis.get(`${process.env.PROJECT_PREFIX}langs`);
    let res = JSON.parse(langs ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheCategories() {
    const langs = await this.prisma.categories.findMany({
      take: 100,
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}categories`,
      JSON.stringify(langs)
    );
  }

  async getCachedCategories({
    take,
  }: {
    take?: number;
  }): Promise<Categories[]> {
    const langs = await this.redis.get(
      `${process.env.PROJECT_PREFIX}categories`
    );
    let res = JSON.parse(langs ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }
}
