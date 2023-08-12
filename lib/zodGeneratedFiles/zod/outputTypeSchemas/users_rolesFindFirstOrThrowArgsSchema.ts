import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesIncludeSchema } from '../inputTypeSchemas/users_rolesIncludeSchema'
import { users_rolesWhereInputSchema } from '../inputTypeSchemas/users_rolesWhereInputSchema'
import { users_rolesOrderByWithRelationInputSchema } from '../inputTypeSchemas/users_rolesOrderByWithRelationInputSchema'
import { users_rolesWhereUniqueInputSchema } from '../inputTypeSchemas/users_rolesWhereUniqueInputSchema'
import { Users_rolesScalarFieldEnumSchema } from '../inputTypeSchemas/Users_rolesScalarFieldEnumSchema'
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

export const users_rolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.users_rolesFindFirstOrThrowArgs> = z.object({
  select: users_rolesSelectSchema.optional(),
  include: users_rolesIncludeSchema.optional(),
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithRelationInputSchema.array(),users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Users_rolesScalarFieldEnumSchema,Users_rolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default users_rolesFindFirstOrThrowArgsSchema;
