import {
  ManufacturersCreateArgsSchema,
  ManufacturersCreateInputSchema,
  ManufacturersUncheckedCreateInputSchema,
  ManufacturersSelectSchema,
} from "@backend/lib/zod";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const ManufacturersCreateArgsSchemaWithAsset = z
  .object({
    select: ManufacturersSelectSchema.optional(),
    data: z.union([
      ManufacturersCreateInputSchema,
      ManufacturersUncheckedCreateInputSchema,
    ]),
    asset: z.string().optional(),
  })
  .strict();
