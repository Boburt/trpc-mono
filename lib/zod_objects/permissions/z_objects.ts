import { z } from "zod";
export const permissionsAdd = z.object({
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
});

export const permissionsRenew = z.object({
  id: z.string(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
});

export const permissionsList = z.object({
  take: z.number().optional(),
});

export const permissionsOne = z.object({
  id: z.string(),
});
