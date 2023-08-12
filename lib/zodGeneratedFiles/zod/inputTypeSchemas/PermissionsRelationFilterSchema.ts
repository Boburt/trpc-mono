import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';

export const PermissionsRelationFilterSchema: z.ZodType<Prisma.PermissionsRelationFilter> = z.object({
  is: z.lazy(() => permissionsWhereInputSchema).optional(),
  isNot: z.lazy(() => permissionsWhereInputSchema).optional()
}).strict();

export default PermissionsRelationFilterSchema;
