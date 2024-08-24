import { DB } from "@backend/db";
import {
  Terminals,
  RolesWithRelations,
  Organization,
  Permissions,
  Work_schedules,
  Api_tokens,
  Scheduled_reports,
} from "@backend/lib/zod";
import { RedisClientType } from "@backend/trpc";

export class CacheControlService {
  constructor(
    private readonly prisma: DB,
    private readonly redis: RedisClientType
  ) {
    this.cachePermissions();
    this.cacheOrganization();
    this.cacheRoles();
    this.cacheTerminals();
    this.chacheWorkSchedules();
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

  async cacheOrganization() {
    const organization = await this.prisma.organization.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}organization`,
      JSON.stringify(organization)
    );
  }

  async getCachedOrganization({
    take,
  }: {
    take?: number;
  }): Promise<Organization[]> {
    const organization = await this.redis.get(
      `${process.env.PROJECT_PREFIX}organization`
    );
    let res = JSON.parse(organization ?? "[]");

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

  async cacheTerminals() {
    const terminals = await this.prisma.terminals.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}terminals`,
      JSON.stringify(terminals)
    );
  }

  async getCachedTerminals({ take }: { take?: number }): Promise<Terminals[]> {
    const terminals = await this.redis.get(
      `${process.env.PROJECT_PREFIX}terminals`
    );
    let res = JSON.parse(terminals ?? "[]");

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

  async chacheWorkSchedules() {
    const workSchedules = await this.prisma.work_schedules.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}work_schedules`,
      JSON.stringify(workSchedules)
    );
  }

  async getCachedWorkSchedules({
    take,
  }: {
    take?: number;
  }): Promise<Work_schedules[]> {
    const workSchedules = await this.redis.get(
      `${process.env.PROJECT_PREFIX}work_schedules`
    );
    let res = JSON.parse(workSchedules ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
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

  async cacheScheduledReports() {
    const scheduledReports = await this.prisma.scheduled_reports.findMany();
    await this.redis.set(
      `${process.env.PROJECT_PREFIX}scheduled_reports`,
      JSON.stringify(scheduledReports)
    );
  }

  async getCachedScheduledReports({
    take,
  }: {
    take?: number;
  }): Promise<Scheduled_reports[]> {
    const scheduledReports = await this.redis.get(
      `${process.env.PROJECT_PREFIX}scheduled_reports`
    );
    let res = JSON.parse(scheduledReports ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }
}
