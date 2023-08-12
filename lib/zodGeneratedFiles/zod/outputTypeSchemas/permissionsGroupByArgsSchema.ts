import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsWhereInputSchema } from '../inputTypeSchemas/permissionsWhereInputSchema'
import { permissionsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/permissionsOrderByWithAggregationInputSchema'
import { PermissionsScalarFieldEnumSchema } from '../inputTypeSchemas/PermissionsScalarFieldEnumSchema'
import { permissionsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/permissionsScalarWhereWithAggregatesInputSchema'

export const permissionsGroupByArgsSchema: z.ZodType<Prisma.permissionsGroupByArgs> = z.object({
  where: permissionsWhereInputSchema.optional(),
  orderBy: z.union([ permissionsOrderByWithAggregationInputSchema.array(),permissionsOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionsScalarFieldEnumSchema.array(),
  having: permissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default permissionsGroupByArgsSchema;
