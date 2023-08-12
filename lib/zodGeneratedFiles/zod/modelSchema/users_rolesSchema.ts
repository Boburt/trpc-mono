import { z } from 'zod';

/////////////////////////////////////////
// USERS ROLES SCHEMA
/////////////////////////////////////////

export const users_rolesSchema = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().nullish(),
  updated_by: z.string().nullish(),
})

export type users_roles = z.infer<typeof users_rolesSchema>

/////////////////////////////////////////
// USERS ROLES OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const users_rolesOptionalDefaultsSchema = users_rolesSchema.merge(z.object({
}))

export type users_rolesOptionalDefaults = z.infer<typeof users_rolesOptionalDefaultsSchema>

export default users_rolesSchema;
