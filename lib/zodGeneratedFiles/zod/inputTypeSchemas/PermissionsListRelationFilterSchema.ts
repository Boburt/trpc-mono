import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';

export const PermissionsListRelationFilterSchema: z.ZodType<Prisma.PermissionsListRelationFilter> = z.object({
  every: z.lazy(() => permissionsWhereInputSchema).optional(),
  some: z.lazy(() => permissionsWhereInputSchema).optional(),
  none: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export default PermissionsListRelationFilterSchema;
