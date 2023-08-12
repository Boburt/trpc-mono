import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersWhereInputSchema } from '../inputTypeSchemas/usersWhereInputSchema'
import { usersOrderByWithAggregationInputSchema } from '../inputTypeSchemas/usersOrderByWithAggregationInputSchema'
import { UsersScalarFieldEnumSchema } from '../inputTypeSchemas/UsersScalarFieldEnumSchema'
import { usersScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/usersScalarWhereWithAggregatesInputSchema'

export const usersGroupByArgsSchema: z.ZodType<Prisma.usersGroupByArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithAggregationInputSchema.array(),usersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(),
  having: usersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default usersGroupByArgsSchema;
