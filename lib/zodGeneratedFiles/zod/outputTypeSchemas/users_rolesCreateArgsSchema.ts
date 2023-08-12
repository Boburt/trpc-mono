import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesIncludeSchema } from '../inputTypeSchemas/users_rolesIncludeSchema'
import { users_rolesCreateInputSchema } from '../inputTypeSchemas/users_rolesCreateInputSchema'
import { users_rolesUncheckedCreateInputSchema } from '../inputTypeSchemas/users_rolesUncheckedCreateInputSchema'
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { rolesArgsSchema } from "../outputTypeSchemas/rolesArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const users_rolesSelectSchema: z.ZodType<Prisma.users_rolesSelect> = z.object({
  user_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  users_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export const users_rolesCreateArgsSchema: z.ZodType<Prisma.users_rolesCreateArgs> = z.object({
  select: users_rolesSelectSchema.optional(),
  include: users_rolesIncludeSchema.optional(),
  data: z.union([ users_rolesCreateInputSchema,users_rolesUncheckedCreateInputSchema ]),
}).strict()

export default users_rolesCreateArgsSchema;
