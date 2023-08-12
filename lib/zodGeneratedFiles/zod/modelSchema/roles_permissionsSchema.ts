import { z } from 'zod';

/////////////////////////////////////////
// ROLES PERMISSIONS SCHEMA
/////////////////////////////////////////

export const roles_permissionsSchema = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type roles_permissions = z.infer<typeof roles_permissionsSchema>

/////////////////////////////////////////
// ROLES PERMISSIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const roles_permissionsOptionalDefaultsSchema = roles_permissionsSchema.merge(z.object({
}))

export type roles_permissionsOptionalDefaults = z.infer<typeof roles_permissionsOptionalDefaultsSchema>

export default roles_permissionsSchema;
