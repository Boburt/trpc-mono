import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const roles_permissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.roles_permissionsMinOrderByAggregateInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default roles_permissionsMinOrderByAggregateInputSchema;
