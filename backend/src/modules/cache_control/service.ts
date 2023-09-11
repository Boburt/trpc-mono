import { DB } from "@backend/db";
import {
  RolesWithRelations,
  Permissions,
  Api_tokens,
  Scheduled_reports,
  Langs,
} from "@backend/lib/zod";
import { RedisClientType } from "@backend/trpc";
import {
  Categories,
  Cities,
  ImageSizes,
  ManufacturersProperties,
  ManufacturersPropertiesCategories,
} from "@prisma/client";

export class CacheControlService {
  constructor(
    private readonly prisma: DB,
    private readonly redis: RedisClientType
  ) {
    this.cachePermissions();
    this.cacheRoles();
    this.cacheLangs();
    this.cacheCategories();
    this.cacheImageSizes();
    this.cacheCities();
    this.cacheManufacturersPropertiesCategories();
    this.cacheManufacturersProperties();
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

  async getActiveCachedCategories({
    take,
  }: {
    take?: number;
  }): Promise<Categories[]> {
    const langs = await this.redis.get(
      `${process.env.PROJECT_PREFIX}categories`
    );

    let res = JSON.parse(langs ?? "[]");

    res = res.filter((category: Categories) => category.active);

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res.filter((category: Categories) => category.active);
  }

  async cacheImageSizes() {
    const langs = await this.prisma.imageSizes.findMany({
      take: 100,
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}image_sizes`,
      JSON.stringify(langs)
    );
  }

  async getCachedImageSizes({
    take,
  }: {
    take?: number;
  }): Promise<ImageSizes[]> {
    const langs = await this.redis.get(
      `${process.env.PROJECT_PREFIX}image_sizes`
    );
    let res = JSON.parse(langs ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheCities() {
    const langs = await this.prisma.cities.findMany({
      take: 100,
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}cities`,
      JSON.stringify(langs)
    );
  }

  async getCachedCities({ take }: { take?: number }): Promise<Cities[]> {
    const langs = await this.redis.get(`${process.env.PROJECT_PREFIX}cities`);
    let res = JSON.parse(langs ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheManufacturersPropertiesCategories() {
    const langs = await this.prisma.manufacturersPropertiesCategories.findMany({
      take: 300,
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}manufacturersPropertiesCategories`,
      JSON.stringify(langs)
    );
  }

  async getCachedManufacturersPropertiesCategories({
    take,
  }: {
    take?: number;
  }): Promise<ManufacturersPropertiesCategories[]> {
    const langs = await this.redis.get(
      `${process.env.PROJECT_PREFIX}manufacturersPropertiesCategories`
    );
    let res = JSON.parse(langs ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheManufacturersProperties() {
    const langs = await this.prisma.manufacturersProperties.findMany({
      take: 300,
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}manufacturersProperties`,
      JSON.stringify(langs)
    );
  }

  async getCachedManufacturersProperties({
    take,
  }: {
    take?: number;
  }): Promise<ManufacturersProperties[]> {
    const langs = await this.redis.get(
      `${process.env.PROJECT_PREFIX}manufacturersProperties`
    );
    let res = JSON.parse(langs ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }
}
