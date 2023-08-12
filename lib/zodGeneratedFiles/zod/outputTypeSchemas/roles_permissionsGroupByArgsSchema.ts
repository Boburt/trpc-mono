import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { roles_permissionsWhereInputSchema } from '../inputTypeSchemas/roles_permissionsWhereInputSchema'
import { roles_permissionsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/roles_permissionsOrderByWithAggregationInputSchema'
import { Roles_permissionsScalarFieldEnumSchema } from '../inputTypeSchemas/Roles_permissionsScalarFieldEnumSchema'
import { roles_permissionsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/roles_permissionsScalarWhereWithAggregatesInputSchema'

export const roles_permissionsGroupByArgsSchema: z.ZodType<Prisma.roles_permissionsGroupByArgs> = z.object({
  where: roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ roles_permissionsOrderByWithAggregationInputSchema.array(),roles_permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: Roles_permissionsScalarFieldEnumSchema.array(),
  having: roles_permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default roles_permissionsGroupByArgsSchema;
