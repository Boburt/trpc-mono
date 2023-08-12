import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsWhereInputSchema } from '../inputTypeSchemas/permissionsWhereInputSchema'
import { permissionsOrderByWithRelationInputSchema } from '../inputTypeSchemas/permissionsOrderByWithRelationInputSchema'
import { permissionsWhereUniqueInputSchema } from '../inputTypeSchemas/permissionsWhereUniqueInputSchema'

export const permissionsAggregateArgsSchema: z.ZodType<Prisma.permissionsAggregateArgs> = z.object({
  where: permissionsWhereInputSchema.optional(),
  orderBy: z.union([ permissionsOrderByWithRelationInputSchema.array(),permissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: permissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default permissionsAggregateArgsSchema;
