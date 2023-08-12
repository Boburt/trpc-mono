import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_permissionsWhereInputSchema } from '../inputTypeSchemas/users_permissionsWhereInputSchema'
import { users_permissionsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/users_permissionsOrderByWithAggregationInputSchema'
import { Users_permissionsScalarFieldEnumSchema } from '../inputTypeSchemas/Users_permissionsScalarFieldEnumSchema'
import { users_permissionsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/users_permissionsScalarWhereWithAggregatesInputSchema'

export const users_permissionsGroupByArgsSchema: z.ZodType<Prisma.users_permissionsGroupByArgs> = z.object({
  where: users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ users_permissionsOrderByWithAggregationInputSchema.array(),users_permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: Users_permissionsScalarFieldEnumSchema.array(),
  having: users_permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default users_permissionsGroupByArgsSchema;
