import { paginatedZodObj } from "@backend/lib/z_objects";
import { z } from "zod";

export type rolesCreateInput = {
  id?: string;
  name: string;
  code?: string;
  active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
};

export const rolesFindManyZod = paginatedZodObj.extend({
  where: z
    .object({
      name: z.string().optional(),
      code: z.string().optional(),
      active: z.boolean().optional(),
      created_at: z.date().optional(),
    })
    .optional(),
});
