import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { roles_permissionsCountOrderByAggregateInputSchema } from './roles_permissionsCountOrderByAggregateInputSchema';
import { roles_permissionsMaxOrderByAggregateInputSchema } from './roles_permissionsMaxOrderByAggregateInputSchema';
import { roles_permissionsMinOrderByAggregateInputSchema } from './roles_permissionsMinOrderByAggregateInputSchema';

export const roles_permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.roles_permissionsOrderByWithAggregationInput> = z.object({
  role_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => roles_permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => roles_permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => roles_permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export default roles_permissionsOrderByWithAggregationInputSchema;
