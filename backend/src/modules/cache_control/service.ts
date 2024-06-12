import { verifyJwt } from "@backend/lib/bcrypt";
import { DrizzleDB } from "@backend/lib/db";
import { userById, userFirstRole } from "@backend/lib/prepare_statements";
import { Permissions, Scheduled_reports, Langs } from "@backend/lib/zod";
import {
  categories,
  permissions,
  roles,
  roles_permissions,
  seo_links,
  sp_ticket_categories,
  sp_ticket_statuses,
  users,
} from "backend/drizzle/schema";
import { InferSelectModel, eq } from "drizzle-orm";
import { Redis } from "ioredis";
import { RolesWithRelations } from "../roles/dto/roles.dto";

export class CacheControlService {
  constructor(
    private readonly drizzle: DrizzleDB,
    private readonly redis: Redis
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
    this.cacheSpTicketStatuses();
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
    const rolesList = await this.drizzle
      .select({
        id: roles.id,
        name: roles.name,
        code: roles.code,
        active: roles.active,
      })
      .from(roles)
      .execute();

    const rolesPermissionsList = await this.drizzle
      .select({
        slug: permissions.slug,
        role_id: roles_permissions.role_id,
      })
      .from(roles_permissions)
      .leftJoin(
        permissions,
        eq(roles_permissions.permission_id, permissions.id)
      )
      .execute();

    const rolesPermissions = rolesPermissionsList.reduce(
      (acc: any, cur: any) => {
        if (!acc[cur.role_id]) {
          acc[cur.role_id] = [];
        }
        acc[cur.role_id].push(cur.slug);
        return acc;
      },
      {}
    );

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

  async getCachedRoles({ take }: { take?: number }) {
    const rolesList = await this.redis.get(
      `${process.env.PROJECT_PREFIX}_roles`
    );
    let res = JSON.parse(rolesList ?? "[]") as RolesWithRelations[];

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }
  async getPermissionsByRoleId(roleId: string) {
    const roles = await this.getCachedRoles({});
    const role = roles.find((role) => role.id === roleId);
    if (!role) {
      return [];
    }
    return role.permissions;
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

  // async getCachedCategories({
  //   take,
  // }: {
  //   take?: number;
  // }): Promise<Categories[]> {
  //   const langs = await this.redis.get(
  //     `${process.env.PROJECT_PREFIX}categories`
  //   );
  //   let res = JSON.parse(langs ?? "[]");

  //   if (take && res.length > take) {
  //     res = res.slice(0, take);
  //   }

  //   return res;
  // }

  async getActiveCachedCategories({ take }: { take?: number }) {
    const langs = await this.redis.get(
      `${process.env.PROJECT_PREFIX}categories`
    );

    let res = JSON.parse(langs ?? "[]") as InferSelectModel<
      typeof categories
    >[];

    res = res.filter((category) => category.active);

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res.filter((category) => category.active);
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

  async getCachedImageSizes({ take }: { take?: number }) {
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

  // async getCachedCities({ take }: { take?: number }): Promise<Cities[]> {
  //   const langs = await this.redis.get(`${process.env.PROJECT_PREFIX}cities`);
  //   let res = JSON.parse(langs ?? "[]");

  //   if (take && res.length > take) {
  //     res = res.slice(0, take);
  //   }

  //   return res;
  // }

  async cacheManufacturersPropertiesCategories() {
    const langs =
      await this.drizzle.query.manufacturers_properties_categories.findMany({
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
  }) {
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

  async getCachedManufacturersProperties({ take }: { take?: number }) {
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
      where: eq(seo_links.id, id),
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

  async getCachedSEOLinks(link: string) {
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
    const spTicketCategories =
      await this.drizzle.query.sp_ticket_categories.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}sp_ticket_categories`,
      JSON.stringify(spTicketCategories)
    );
  }

  async getCachedSpTicketCategories({ take }: { take?: number }) {
    const spTicketCategories = await this.redis.get(
      `${process.env.PROJECT_PREFIX}sp_ticket_categories`
    );
    let res = JSON.parse(spTicketCategories ?? "[]") as InferSelectModel<
      typeof sp_ticket_categories
    >[];

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheSpTicketStatuses() {
    const spTicketStatuses =
      await this.drizzle.query.sp_ticket_statuses.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}sp_ticket_statuses`,
      JSON.stringify(spTicketStatuses)
    );
  }

  async getCachedSpTicketStatuses({ take }: { take?: number }) {
    const spTicketStatuses = await this.redis.get(
      `${process.env.PROJECT_PREFIX}sp_ticket_statuses`
    );
    let res = JSON.parse(spTicketStatuses ?? "[]") as InferSelectModel<
      typeof sp_ticket_statuses
    >[];

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }

  async cacheUserDataByToken(
    accessToken: string,
    refreshToken: string,
    userId: any
  ) {
    const foundUser = (await userById.execute({
      id: userId,
    })) as InferSelectModel<typeof users>;
    if (!foundUser) {
      return null;
    }

    if (foundUser.status != "active") {
      return null;
    }

    const userRole = await userFirstRole.execute({ user_id: foundUser.id });

    // getting rights
    let permissions: string[] = [];
    if (userRole) {
      permissions = await this.getPermissionsByRoleId(userRole.role_id);
    }
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}user_data:${accessToken}`,
      JSON.stringify({
        user: foundUser,
        accessToken,
        refreshToken,
        permissions: permissions,
      })
    );

    return {
      user: foundUser,
      accessToken,
      refreshToken,
      permissions: permissions,
    };
  }

  async deleteUserDataByToken(accessToken: string) {
    try {
      await this.redis.del(
        `${process.env.PROJECT_PREFIX}user_data:${accessToken}`
      );
    } catch (e) {}
  }

  async getCachedUserDataByToken(accessToken: string): Promise<{
    user: InferSelectModel<typeof users>;
    accessToken: string;
    refreshToken: string;
    permissions: string[];
  } | null> {
    try {
      let jwtResult = await verifyJwt(accessToken);
      if (!jwtResult.payload.id) {
        return null;
      }
      const data = await this.redis.get(
        `${process.env.PROJECT_PREFIX}user_data:${accessToken}`
      );
      if (data) {
        return JSON.parse(data);
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}
