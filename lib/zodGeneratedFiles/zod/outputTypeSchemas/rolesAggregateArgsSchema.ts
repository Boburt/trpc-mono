import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesWhereInputSchema } from '../inputTypeSchemas/rolesWhereInputSchema'
import { rolesOrderByWithRelationInputSchema } from '../inputTypeSchemas/rolesOrderByWithRelationInputSchema'
import { rolesWhereUniqueInputSchema } from '../inputTypeSchemas/rolesWhereUniqueInputSchema'

export const rolesAggregateArgsSchema: z.ZodType<Prisma.rolesAggregateArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
  orderBy: z.union([ rolesOrderByWithRelationInputSchema.array(),rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default rolesAggregateArgsSchema;
