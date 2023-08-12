import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';

export const RolesListRelationFilterSchema: z.ZodType<Prisma.RolesListRelationFilter> = z.object({
  every: z.lazy(() => rolesWhereInputSchema).optional(),
  some: z.lazy(() => rolesWhereInputSchema).optional(),
  none: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export default RolesListRelationFilterSchema;
