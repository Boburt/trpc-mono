import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesWhereInputSchema } from '../inputTypeSchemas/rolesWhereInputSchema'
import { rolesOrderByWithAggregationInputSchema } from '../inputTypeSchemas/rolesOrderByWithAggregationInputSchema'
import { RolesScalarFieldEnumSchema } from '../inputTypeSchemas/RolesScalarFieldEnumSchema'
import { rolesScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/rolesScalarWhereWithAggregatesInputSchema'

export const rolesGroupByArgsSchema: z.ZodType<Prisma.rolesGroupByArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithAggregationInputSchema.array(),rolesOrderByWithAggregationInputSchema ]).optional(),
  by: RolesScalarFieldEnumSchema.array(),
  having: rolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default rolesGroupByArgsSchema;
