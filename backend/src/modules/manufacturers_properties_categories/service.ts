import { z } from "zod";
import { ManufacturersPropertiesCategories, Prisma } from "@prisma/client";
import {
  ManufacturersPropertiesCategoriesFindManyArgsSchema,
  ManufacturersPropertiesCategoriesFindUniqueArgsSchema,
  manufacturers_properties_typesType,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { DrizzleDB } from "@backend/lib/db";
import { manufacturers_properties_categories } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class ManufacturersPropertiesCategoriesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly drizzle: DrizzleDB
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
  ): Promise<
    PaginationType<InferSelectModel<typeof manufacturers_properties_categories>>
  > {
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
      .from(manufacturers_properties_categories)
      .execute();

    const rolesList = await this.drizzle
      .select()
      .from(manufacturers_properties_categories)
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
    // const [roles, meta] = await this.prisma.manufacturersPropertiesCategories
    //   .paginate(input)
    //   .withPages({
    //     limit: take,
    //     page: skip,
    //     includePageCount: true,
    //   });

    return {
      items: rolesList,
      meta: paginationMeta,
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
