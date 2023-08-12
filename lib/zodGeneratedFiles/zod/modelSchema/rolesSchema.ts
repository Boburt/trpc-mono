import { z } from 'zod';

/////////////////////////////////////////
// ROLES SCHEMA
/////////////////////////////////////////

export const rolesSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string().nullish(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type roles = z.infer<typeof rolesSchema>

/////////////////////////////////////////
// ROLES OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const rolesOptionalDefaultsSchema = rolesSchema.merge(z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type rolesOptionalDefaults = z.infer<typeof rolesOptionalDefaultsSchema>

export default rolesSchema;
