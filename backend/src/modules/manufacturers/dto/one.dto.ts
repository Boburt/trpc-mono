import { imageAssetsSelectObj } from "@backend/lib/z_objects";
import {
  ManufacturersIncludeSchema,
  ManufacturersSelectSchema,
  ManufacturersWhereInputSchema,
  ManufacturersWhereUniqueInputSchema,
} from "@backend/lib/zod";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const ManufacturersFindUniqueWithImageArgsSchema = z
  .object({
    select: ManufacturersSelectSchema.optional(),
    include: ManufacturersIncludeSchema.optional(),
    where: ManufacturersWhereInputSchema,
  })
  .merge(imageAssetsSelectObj);

export const ManufacturerAddReviewArgsSchema = z.object({
  id: z.string(),
  review: z.string(),
  rating: z.optional(z.number()),
});
