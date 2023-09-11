import { z } from "zod";
import { ManufacturersPropertiesCategories, Prisma } from "@prisma/client";
import {
  ManufacturersPropertiesCategoriesFindManyArgsSchema,
  ManufacturersPropertiesCategoriesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";

export class ManufacturersPropertiesCategoriesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(
    input: Prisma.ManufacturersPropertiesCategoriesCreateArgs
  ): Promise<ManufacturersPropertiesCategories> {
    const roles = await this.prisma.manufacturersPropertiesCategories.create(
      input
    );
    await this.cacheControl.cacheManufacturersPropertiesCategories();
    return roles;
  }

  async findMany(
    input: z.infer<typeof ManufacturersPropertiesCategoriesFindManyArgsSchema>
  ): Promise<PaginationType<ManufacturersPropertiesCategories>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [roles, meta] = await this.prisma.manufacturersPropertiesCategories
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
    input: z.infer<typeof ManufacturersPropertiesCategoriesFindUniqueArgsSchema>
  ): Promise<ManufacturersPropertiesCategories | null> {
    const role = await this.prisma.manufacturersPropertiesCategories.findUnique(
      input
    );

    return role;
  }

  async update(
    input: Prisma.ManufacturersPropertiesCategoriesUpdateArgs
  ): Promise<ManufacturersPropertiesCategories | null> {
    const res = await this.prisma.manufacturersPropertiesCategories.update(
      input
    );
    await this.cacheControl.cacheManufacturersPropertiesCategories();
    return res;
  }

  async delete(input: Prisma.ManufacturersPropertiesCategoriesDeleteArgs) {
    const res = await this.prisma.manufacturersPropertiesCategories.delete(
      input
    );
    await this.cacheControl.cacheManufacturersPropertiesCategories();
    return res;
  }

  async cachedManufacturersPropertiesCategories(
    input: z.infer<typeof ManufacturersPropertiesCategoriesFindManyArgsSchema>
  ): Promise<ManufacturersPropertiesCategories[]> {
    return await this.cacheControl.getCachedManufacturersPropertiesCategories(
      input
    );
  }
}
