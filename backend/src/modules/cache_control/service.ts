import { DB, RedisClientType } from "@backend/trpc";
import { permissions } from "@prisma/client";

export class CacheControlService {
  constructor(
    private readonly prisma: DB,
    private readonly redis: RedisClientType
  ) {
    this.cachePermissions();
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
  }): Promise<permissions[]> {
    const permissions = await this.redis.get(
      `${process.env.PROJECT_PREFIX}permissions`
    );
    let res = JSON.parse(permissions ?? "[]");

    if (take && res.length > take) {
      res = res.slice(0, take);
    }

    return res;
  }
}
