import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesIncludeSchema } from '../inputTypeSchemas/rolesIncludeSchema'
import { rolesWhereInputSchema } from '../inputTypeSchemas/rolesWhereInputSchema'
import { rolesOrderByWithRelationInputSchema } from '../inputTypeSchemas/rolesOrderByWithRelationInputSchema'
import { rolesWhereUniqueInputSchema } from '../inputTypeSchemas/rolesWhereUniqueInputSchema'
import { RolesScalarFieldEnumSchema } from '../inputTypeSchemas/RolesScalarFieldEnumSchema'
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { roles_permissionsFindManyArgsSchema } from "../outputTypeSchemas/roles_permissionsFindManyArgsSchema"
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

export const rolesFindManyArgsSchema: z.ZodType<Prisma.rolesFindManyArgs> = z.object({
  select: rolesSelectSchema.optional(),
  include: rolesIncludeSchema.optional(),
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesScalarFieldEnumSchema,RolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default rolesFindManyArgsSchema;