import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { roles_permissionsWhereInputSchema } from '../inputTypeSchemas/roles_permissionsWhereInputSchema'
import { roles_permissionsOrderByWithRelationInputSchema } from '../inputTypeSchemas/roles_permissionsOrderByWithRelationInputSchema'
import { roles_permissionsWhereUniqueInputSchema } from '../inputTypeSchemas/roles_permissionsWhereUniqueInputSchema'

export const roles_permissionsAggregateArgsSchema: z.ZodType<Prisma.roles_permissionsAggregateArgs> = z.object({
  where: roles_permissionsWhereInputSchema.optional(),
  orderBy: z.union([ roles_permissionsOrderByWithRelationInputSchema.array(),roles_permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: roles_permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default roles_permissionsAggregateArgsSchema;
