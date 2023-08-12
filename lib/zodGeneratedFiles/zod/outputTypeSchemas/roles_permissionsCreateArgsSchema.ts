import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { roles_permissionsIncludeSchema } from '../inputTypeSchemas/roles_permissionsIncludeSchema'
import { roles_permissionsCreateInputSchema } from '../inputTypeSchemas/roles_permissionsCreateInputSchema'
import { roles_permissionsUncheckedCreateInputSchema } from '../inputTypeSchemas/roles_permissionsUncheckedCreateInputSchema'
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { permissionsArgsSchema } from "../outputTypeSchemas/permissionsArgsSchema"
import { rolesArgsSchema } from "../outputTypeSchemas/rolesArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const roles_permissionsSelectSchema: z.ZodType<Prisma.roles_permissionsSelect> = z.object({
  role_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => rolesArgsSchema)]).optional(),
  users_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export const roles_permissionsCreateArgsSchema: z.ZodType<Prisma.roles_permissionsCreateArgs> = z.object({
  select: roles_permissionsSelectSchema.optional(),
  include: roles_permissionsIncludeSchema.optional(),
  data: z.union([ roles_permissionsCreateInputSchema,roles_permissionsUncheckedCreateInputSchema ]),
}).strict()

export default roles_permissionsCreateArgsSchema;
