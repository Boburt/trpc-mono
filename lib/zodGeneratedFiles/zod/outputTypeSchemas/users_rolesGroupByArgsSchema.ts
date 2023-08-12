import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesWhereInputSchema } from '../inputTypeSchemas/users_rolesWhereInputSchema'
import { users_rolesOrderByWithAggregationInputSchema } from '../inputTypeSchemas/users_rolesOrderByWithAggregationInputSchema'
import { Users_rolesScalarFieldEnumSchema } from '../inputTypeSchemas/Users_rolesScalarFieldEnumSchema'
import { users_rolesScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/users_rolesScalarWhereWithAggregatesInputSchema'

export const users_rolesGroupByArgsSchema: z.ZodType<Prisma.users_rolesGroupByArgs> = z.object({
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithAggregationInputSchema.array(),users_rolesOrderByWithAggregationInputSchema ]).optional(),
  by: Users_rolesScalarFieldEnumSchema.array(),
  having: users_rolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default users_rolesGroupByArgsSchema;
