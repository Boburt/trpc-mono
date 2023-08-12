import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const users_permissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.users_permissionsMinOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default users_permissionsMinOrderByAggregateInputSchema;
