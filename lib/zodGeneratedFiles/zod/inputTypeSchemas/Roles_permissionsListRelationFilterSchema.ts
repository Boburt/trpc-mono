import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereInputSchema } from './roles_permissionsWhereInputSchema';

export const Roles_permissionsListRelationFilterSchema: z.ZodType<Prisma.Roles_permissionsListRelationFilter> = z.object({
  every: z.lazy(() => roles_permissionsWhereInputSchema).optional(),
  some: z.lazy(() => roles_permissionsWhereInputSchema).optional(),
  none: z.lazy(() => roles_permissionsWhereInputSchema).optional()
}).strict();

export default Roles_permissionsListRelationFilterSchema;
