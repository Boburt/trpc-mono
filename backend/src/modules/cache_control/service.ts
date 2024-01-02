import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import {
  RolesWithRelations,
  Permissions,
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
  SeoLinks,
} from "@prisma/client";
import { permissions, roles, roles_permissions, seo_links } from "backend/drizzle/schema";
import { eq } from "drizzle-orm";

export class CacheControlService {
  constructor(
    private readonly drizzle: DrizzleDB,
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
    this.cacheSpTicketCategories();
  }

  async cachePermissions() {
    const permissions = await this.drizzle.query.permissions.findMany();
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
    const rolesList = await this.drizzle.select({
      id: roles.id,
      name: roles.name,
      code: roles.code,
      active: roles.active,
    }).from(roles).execute();


    const rolesPermissionsList = await this.drizzle.select({
      slug: permissions.slug,
      role_id: roles_permissions.role_id,
    }).from(roles_permissions).leftJoin(permissions, eq(roles_permissions.permission_id, permissions.id)).execute();

    const rolesPermissions = rolesPermissionsList.reduce((acc: any, cur: any) => {
      if (!acc[cur.role_id]) {
        acc[cur.role_id] = [];
      }
      acc[cur.role_id].push(cur.slug);
      return acc;
    }, {});

    const res = rolesList.map((role: any) => {
      return {
        ...role,
        permissions: rolesPermissions[role.id] || [],
      };
    });
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}_roles`,
      JSON.stringify(res)
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

  async cacheLangs() {
    const langs = await this.drizzle.query.langs.findMany({
      limit: 100,
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
    const langs = await this.drizzle.query.categories.findMany({
      limit: 100,
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
    const langs = await this.drizzle.query.image_sizes.findMany({
      limit: 100,
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
    const langs = await this.drizzle.query.cities.findMany({
      limit: 100,
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
    const langs = await this.drizzle.query.manufacturers_properties_categories.findMany({
      limit: 300,
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
    const langs = await this.drizzle.query.manufacturers_properties.findMany({
      limit: 300,
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

  async cacheSEOLinks(id: string, beforeLink?: string) {
    if (beforeLink) {
      // @ts-ignore
      const beforeLinkHash = Bun.hash(beforeLink);
      await this.redis.del(
        `${process.env.PROJECT_PREFIX}seo_links:${beforeLinkHash}`
      );
    }
    const seoLinks = await this.drizzle.query.seo_links.findFirst({
      where: eq(seo_links.id, id)
    });
    if (seoLinks) {
      // @ts-ignore
      const linkHash = Bun.hash(seoLinks?.link);
      await this.redis.set(
        `${process.env.PROJECT_PREFIX}seo_links:${linkHash}`,
        JSON.stringify(seoLinks)
      );
    }
  }

  async deleteSEOLinks(id: string) {
    const seoLinks = await this.drizzle.query.seo_links.findFirst({
      where: eq(seo_links.id, id),
    });
    if (seoLinks) {
      // @ts-ignore
      const linkHash = Bun.hash(seoLinks?.link);
      await this.redis.del(
        `${process.env.PROJECT_PREFIX}seo_links:${linkHash}`
      );
    }
  }

  async getCachedSEOLinks(link: string): Promise<SeoLinks | null> {
    // @ts-ignore
    const linkHash = Bun.hash(link);
    const seoLinks = await this.redis.get(
      `${process.env.PROJECT_PREFIX}seo_links:${linkHash}`
    );
    if (seoLinks) {
      return JSON.parse(seoLinks);
    } else {
      return null;
    }
  }

  async cacheSpTicketCategories() {
    const spTicketCategories = await this.drizzle.query.sp_ticket_categories.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}sp_ticket_categories`,
      JSON.stringify(spTicketCategories)
    );
  }

  async getCachedSpTicketCategories({
    take,
  }: {
    take?: number;
  }): Promise<Permissions[]> {
    const spTicketCategories = await this.redis.get(
      `${process.env.PROJECT_PREFIX}sp_ticket_categories`
    );
    let res = JSON.parse(spTicketCategories ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }
}
