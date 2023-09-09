import type { ManufacturersCategories, Prisma } from "@prisma/client";
import { z } from "zod";

import { ManufacturersCategoriesFindManyArgsSchema } from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { DB } from "@backend/db";

export class ManufacturersCategoriesService {
  constructor(private readonly prisma: DB) {}

  async assignCategoriesToManufacturer(
    input: Prisma.ManufacturersCategoriesCreateManyArgs
  ): Promise<Prisma.BatchPayload> {
    if (Array.isArray(input.data) && input.data.length > 0) {
      await this.prisma.manufacturersCategories.deleteMany({
        where: {
          manufacturer_id: input.data[0].manufacturer_id,
        },
      });
    } else {
      const data = input.data as Prisma.ManufacturersCategoriesCreateManyInput;
      await this.prisma.manufacturersCategories.deleteMany({
        where: {
          manufacturer_id: data.manufacturer_id,
        },
      });
    }

    const res = await this.prisma.manufacturersCategories.createMany(input);
    return res;
  }

  async findMany(
    input: z.infer<typeof ManufacturersCategoriesFindManyArgsSchema>
  ): Promise<PaginationType<ManufacturersCategories>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [permissions, meta] = await this.prisma.manufacturersCategories
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });

    return {
      items: permissions,
      meta,
    };
  }
}
