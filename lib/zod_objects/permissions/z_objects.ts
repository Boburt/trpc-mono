import { z } from "zod";
import { paginatedZodObj } from "../pagination/z_objects";

export const permissionsList = paginatedZodObj.extend({});

export const permissionsOne = z.object({
  id: z.string(),
});

export const permissionsModel = z.object({
  id: z.string(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const permissionsMutation = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
});
