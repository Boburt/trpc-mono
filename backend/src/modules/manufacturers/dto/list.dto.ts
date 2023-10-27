import { imageAssetsSelectObj } from "@backend/lib/z_objects";
import {
  AssetsSchema,
  CitiesWithRelationsSchema,
  ManufacturersCategoriesWithRelationsSchema,
  ManufacturersFindManyArgsSchema,
  ManufacturersIncludeSchema,
  ManufacturersOrderByWithRelationInputSchema,
  ManufacturersPropertiesValuesWithRelationsSchema,
  ManufacturersScalarFieldEnumSchema,
  ManufacturersSchema,
  ManufacturersSelectSchema,
  ManufacturersWhereInputSchema,
  ManufacturersWhereUniqueInputSchema,
} from "@backend/lib/zod";
import { z } from "zod";

export const ManufacturersWithImagesSchema = ManufacturersSchema.merge(
  z.object({
    manufacturers_categories: z
      .lazy(() => ManufacturersCategoriesWithRelationsSchema)
      .array(),
    cities: z.lazy(() => CitiesWithRelationsSchema).nullish(),
  })
).extend({
  images: z
    .array(
      z.object({
        path: z.string(),
        code: z.string(),
      })
    )
    .optional(),
});

export const ManufacturersWithImagesAndPropertiesSchema =
  ManufacturersWithImagesSchema.extend({
    properties: z
      .array(ManufacturersPropertiesValuesWithRelationsSchema)
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
    facets: z.record(z.string(), z.array(z.string())).optional().nullable(),
  })
  .merge(imageAssetsSelectObj);

export const manufacturersFacetsSchema = z.object({
  manufacturers_categories: z.string().optional().nullable(),
});

export const manufacturerReviewsCountArgsSchema = z.object({
  id: z.string(),
});
