import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesWhereInputSchema } from '../inputTypeSchemas/users_rolesWhereInputSchema'
import { users_rolesOrderByWithRelationInputSchema } from '../inputTypeSchemas/users_rolesOrderByWithRelationInputSchema'
import { users_rolesWhereUniqueInputSchema } from '../inputTypeSchemas/users_rolesWhereUniqueInputSchema'

export const users_rolesAggregateArgsSchema: z.ZodType<Prisma.users_rolesAggregateArgs> = z.object({
  where: users_rolesWhereInputSchema.optional(),
  orderBy: z.union([ users_rolesOrderByWithRelationInputSchema.array(),users_rolesOrderByWithRelationInputSchema ]).optional(),
  cursor: users_rolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default users_rolesAggregateArgsSchema;
