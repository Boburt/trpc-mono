import { imageAssetsSelectObj } from "@backend/lib/z_objects";
import {
  AssetsSchema,
  ManufacturersFindManyArgsSchema,
  ManufacturersIncludeSchema,
  ManufacturersOrderByWithRelationInputSchema,
  ManufacturersScalarFieldEnumSchema,
  ManufacturersSchema,
  ManufacturersSelectSchema,
  ManufacturersWhereInputSchema,
  ManufacturersWhereUniqueInputSchema,
} from "@backend/lib/zod";
import { z } from "zod";

export const ManufacturersWithImagesSchema = ManufacturersSchema.extend({
  images: z
    .array(
      z.object({
        path: z.string(),
        code: z.string(),
      })
    )
    .optional(),
});

export const ManufacturersWithImagesFindManyArgsSchema = z
  .object({
    select: ManufacturersSelectSchema.optional(),
    include: ManufacturersIncludeSchema.optional(),
    where: ManufacturersWhereInputSchema.optional(),
    orderBy: z
      .union([
        ManufacturersOrderByWithRelationInputSchema.array(),
        ManufacturersOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ManufacturersWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([
        ManufacturersScalarFieldEnumSchema,
        ManufacturersScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .merge(imageAssetsSelectObj);
