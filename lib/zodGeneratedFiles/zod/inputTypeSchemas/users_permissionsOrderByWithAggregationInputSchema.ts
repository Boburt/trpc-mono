import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { users_permissionsCountOrderByAggregateInputSchema } from './users_permissionsCountOrderByAggregateInputSchema';
import { users_permissionsMaxOrderByAggregateInputSchema } from './users_permissionsMaxOrderByAggregateInputSchema';
import { users_permissionsMinOrderByAggregateInputSchema } from './users_permissionsMinOrderByAggregateInputSchema';

export const users_permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.users_permissionsOrderByWithAggregationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => users_permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => users_permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => users_permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export default users_permissionsOrderByWithAggregationInputSchema;
