import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsIncludeSchema } from '../inputTypeSchemas/permissionsIncludeSchema'
import { permissionsWhereUniqueInputSchema } from '../inputTypeSchemas/permissionsWhereUniqueInputSchema'
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { roles_permissionsFindManyArgsSchema } from "../outputTypeSchemas/roles_permissionsFindManyArgsSchema"
import { users_permissionsFindManyArgsSchema } from "../outputTypeSchemas/users_permissionsFindManyArgsSchema"
import { PermissionsCountOutputTypeArgsSchema } from "../outputTypeSchemas/PermissionsCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const permissionsSelectSchema: z.ZodType<Prisma.permissionsSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  active: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  users_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const permissionsDeleteArgsSchema: z.ZodType<Prisma.permissionsDeleteArgs> = z.object({
  select: permissionsSelectSchema.optional(),
  include: permissionsIncludeSchema.optional(),
  where: permissionsWhereUniqueInputSchema,
}).strict()

export default permissionsDeleteArgsSchema;
