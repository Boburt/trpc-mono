import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersWhereInputSchema } from '../inputTypeSchemas/usersWhereInputSchema'
import { usersOrderByWithRelationInputSchema } from '../inputTypeSchemas/usersOrderByWithRelationInputSchema'
import { usersWhereUniqueInputSchema } from '../inputTypeSchemas/usersWhereUniqueInputSchema'

export const usersAggregateArgsSchema: z.ZodType<Prisma.usersAggregateArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default usersAggregateArgsSchema;
