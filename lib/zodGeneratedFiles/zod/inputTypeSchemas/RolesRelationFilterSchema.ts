import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';

export const RolesRelationFilterSchema: z.ZodType<Prisma.RolesRelationFilter> = z.object({
  is: z.lazy(() => rolesWhereInputSchema).optional(),
  isNot: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export default RolesRelationFilterSchema;
