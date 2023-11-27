import { z } from "zod";
import {
  ManufacturersProperties,
  ManufacturersPropertiesValues,
  Prisma,
} from "@prisma/client";
import {
  ManufacturersPropertiesFindManyArgsSchema,
  ManufacturersPropertiesFindUniqueArgsSchema,
  ManufacturersPropertiesValuesFindManyArgsSchema,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { SetPropertiesValuesDto } from "./dto/set_properties_values.dto";
import { Queue } from "bullmq";
import { DrizzleDB } from "@backend/lib/db";
import { manufacturers_properties } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class ManufacturersPropertiesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService,
    private readonly indexQueue: Queue,
    private readonly drizzle: DrizzleDB
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
  ): Promise<
    PaginationType<InferSelectModel<typeof manufacturers_properties>>
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
      .from(manufacturers_properties)
      .execute();

    const rolesList = await this.drizzle
      .select()
      .from(manufacturers_properties)
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

    // const [roles, meta] = await this.prisma.manufacturersProperties
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

  async setPropertiesValues(input: z.infer<typeof SetPropertiesValuesDto>) {
    const { manufacturerId, properties } = input;

    const manufacturer = await this.prisma.manufacturers.findUnique({
      where: {
        id: manufacturerId,
      },
    });

    if (!manufacturer) {
      throw new Error("Manufacturer not found");
    }

    const manufacturerProperties =
      await this.cacheControl.getCachedManufacturersProperties({});

    // remove all properties by propertyId which are not in manufacturerProperties
    const propertiesToSet = properties.filter((property) => {
      return manufacturerProperties.find((p) => p.id === property.propertyId);
    });

    const propertiesToDelete = manufacturerProperties.filter((property) => {
      return !properties.find((p) => p.propertyId === property.id);
    });

    await this.prisma.manufacturersPropertiesValues.deleteMany({
      where: {
        manufacturer_id: manufacturerId,
        property_id: {
          in: propertiesToDelete.map((p) => p.id),
        },
      },
    });

    const existingPropertyValues =
      await this.prisma.manufacturersPropertiesValues.findMany({
        where: {
          manufacturer_id: manufacturerId,
          property_id: {
            in: propertiesToSet.map((p) => p.propertyId),
          },
        },
      });

    for (const property of propertiesToSet) {
      const existingPropertyValue = existingPropertyValues.find(
        (p) => p.property_id === property.propertyId
      );
      if (existingPropertyValue) {
        await this.prisma.manufacturersPropertiesValues.update({
          where: {
            id: existingPropertyValue.id,
          },
          data: {
            value:
              typeof property.value == "number"
                ? property.value.toLocaleString()
                : property.value,
          },
        });
      } else {
        await this.prisma.manufacturersPropertiesValues.create({
          data: {
            manufacturer_id: manufacturerId,
            property_id: property.propertyId,
            value:
              typeof property.value == "number"
                ? property.value.toLocaleString()
                : property.value,
          },
        });
      }
    }

    this.indexQueue.add(
      manufacturerId,
      {
        id: manufacturerId,
      },
      {
        removeOnComplete: true,
      }
    );
  }

  async getManufacturerPropertyValues(
    input: z.infer<typeof ManufacturersPropertiesValuesFindManyArgsSchema>
  ): Promise<ManufacturersPropertiesValues[]> {
    return await this.prisma.manufacturersPropertiesValues.findMany(input);
  }
}
