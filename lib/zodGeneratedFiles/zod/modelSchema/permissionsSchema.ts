import { z } from 'zod';

/////////////////////////////////////////
// PERMISSIONS SCHEMA
/////////////////////////////////////////

export const permissionsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type permissions = z.infer<typeof permissionsSchema>

/////////////////////////////////////////
// PERMISSIONS PARTIAL SCHEMA
/////////////////////////////////////////

export const permissionsPartialSchema = permissionsSchema.partial()

export type permissionsPartial = z.infer<typeof permissionsPartialSchema>

/////////////////////////////////////////
// PERMISSIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const permissionsOptionalDefaultsSchema = permissionsSchema.merge(z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type permissionsOptionalDefaults = z.infer<typeof permissionsOptionalDefaultsSchema>

export default permissionsSchema;
