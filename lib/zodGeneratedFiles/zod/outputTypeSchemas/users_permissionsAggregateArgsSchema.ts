import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_permissionsWhereInputSchema } from '../inputTypeSchemas/users_permissionsWhereInputSchema'
import { users_permissionsOrderByWithRelationInputSchema } from '../inputTypeSchemas/users_permissionsOrderByWithRelationInputSchema'
import { users_permissionsWhereUniqueInputSchema } from '../inputTypeSchemas/users_permissionsWhereUniqueInputSchema'

export const users_permissionsAggregateArgsSchema: z.ZodType<Prisma.users_permissionsAggregateArgs> = z.object({
  where: users_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ users_permissionsOrderByWithRelationInputSchema.array(),users_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: users_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default users_permissionsAggregateArgsSchema;
