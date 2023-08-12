import { z } from 'zod';

/////////////////////////////////////////
// USERS PERMISSIONS SCHEMA
/////////////////////////////////////////

export const users_permissionsSchema = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type users_permissions = z.infer<typeof users_permissionsSchema>

/////////////////////////////////////////
// USERS PERMISSIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const users_permissionsOptionalDefaultsSchema = users_permissionsSchema.merge(z.object({
}))

export type users_permissionsOptionalDefaults = z.infer<typeof users_permissionsOptionalDefaultsSchema>

export default users_permissionsSchema;
