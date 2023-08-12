import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_permissionsIncludeSchema } from '../inputTypeSchemas/users_permissionsIncludeSchema'
import { users_permissionsCreateInputSchema } from '../inputTypeSchemas/users_permissionsCreateInputSchema'
import { users_permissionsUncheckedCreateInputSchema } from '../inputTypeSchemas/users_permissionsUncheckedCreateInputSchema'
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { permissionsArgsSchema } from "../outputTypeSchemas/permissionsArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const users_permissionsSelectSchema: z.ZodType<Prisma.users_permissionsSelect> = z.object({
  user_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  users_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export const users_permissionsCreateArgsSchema: z.ZodType<Prisma.users_permissionsCreateArgs> = z.object({
  select: users_permissionsSelectSchema.optional(),
  include: users_permissionsIncludeSchema.optional(),
  data: z.union([ users_permissionsCreateInputSchema,users_permissionsUncheckedCreateInputSchema ]),
}).strict()

export default users_permissionsCreateArgsSchema;
