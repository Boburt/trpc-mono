import { z } from "zod";
import { ManufacturersProperties, Prisma } from "@prisma/client";
import {
  ManufacturersPropertiesFindManyArgsSchema,
  ManufacturersPropertiesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";

export class ManufacturersPropertiesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(
    input: Prisma.ManufacturersPropertiesCreateArgs
  ): Promise<ManufacturersProperties> {
    const roles = await this.prisma.manufacturersProperties.create(input);
    await this.cacheControl.cacheManufacturersProperties();
    return roles;
  }

  async findMany(
    input: z.infer<typeof ManufacturersPropertiesFindManyArgsSchema>
  ): Promise<PaginationType<ManufacturersProperties>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [roles, meta] = await this.prisma.manufacturersProperties
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: roles,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof ManufacturersPropertiesFindUniqueArgsSchema>
  ): Promise<ManufacturersProperties | null> {
    const role = await this.prisma.manufacturersProperties.findUnique(input);

    return role;
  }

  async update(
    input: Prisma.ManufacturersPropertiesUpdateArgs
  ): Promise<ManufacturersProperties | null> {
    const res = await this.prisma.manufacturersProperties.update(input);
    await this.cacheControl.cacheManufacturersProperties();
    return res;
  }

  async delete(input: Prisma.ManufacturersPropertiesDeleteArgs) {
    const res = await this.prisma.manufacturersProperties.delete(input);
    await this.cacheControl.cacheManufacturersProperties();
    return res;
  }

  async cachedManufacturersProperties(
    input: z.infer<typeof ManufacturersPropertiesFindManyArgsSchema>
  ): Promise<ManufacturersProperties[]> {
    return await this.cacheControl.getCachedManufacturersProperties(input);
  }
}
