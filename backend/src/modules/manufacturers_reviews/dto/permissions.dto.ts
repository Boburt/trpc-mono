import { paginatedZodObj } from "@backend/lib/z_objects";
import { z } from "zod";

export type permissionsCreateInput = {
  id?: string;
  slug: string;
  description: string;
  active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
};

export const permissionsFindManyZod = paginatedZodObj.extend({
  where: z
    .object({
      slug: z.string().optional(),
      description: z.string().optional(),
      active: z.boolean().optional(),
      created_at: z.date().optional(),
    })
    .optional(),
});
