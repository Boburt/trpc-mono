import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesIncludeSchema } from '../inputTypeSchemas/rolesIncludeSchema'
import { rolesWhereUniqueInputSchema } from '../inputTypeSchemas/rolesWhereUniqueInputSchema'
import { rolesCreateInputSchema } from '../inputTypeSchemas/rolesCreateInputSchema'
import { rolesUncheckedCreateInputSchema } from '../inputTypeSchemas/rolesUncheckedCreateInputSchema'
import { rolesUpdateInputSchema } from '../inputTypeSchemas/rolesUpdateInputSchema'
import { rolesUncheckedUpdateInputSchema } from '../inputTypeSchemas/rolesUncheckedUpdateInputSchema'
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { roles_permissionsFindManyArgsSchema } from "../outputTypeSchemas/roles_permissionsFindManyArgsSchema"
import { users_rolesFindManyArgsSchema } from "../outputTypeSchemas/users_rolesFindManyArgsSchema"
import { RolesCountOutputTypeArgsSchema } from "../outputTypeSchemas/RolesCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const rolesSelectSchema: z.ZodType<Prisma.rolesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  code: z.boolean().optional(),
  active: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_roles: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RolesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const rolesUpsertArgsSchema: z.ZodType<Prisma.rolesUpsertArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereUniqueInputSchema,
  create: z.union([ rolesCreateInputSchema,rolesUncheckedCreateInputSchema ]),
  update: z.union([ rolesUpdateInputSchema,rolesUncheckedUpdateInputSchema ]),
}).strict()

export default rolesUpsertArgsSchema;
