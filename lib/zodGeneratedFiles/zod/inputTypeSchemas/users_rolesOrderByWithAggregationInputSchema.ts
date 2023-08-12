import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { users_rolesCountOrderByAggregateInputSchema } from './users_rolesCountOrderByAggregateInputSchema';
import { users_rolesMaxOrderByAggregateInputSchema } from './users_rolesMaxOrderByAggregateInputSchema';
import { users_rolesMinOrderByAggregateInputSchema } from './users_rolesMinOrderByAggregateInputSchema';

export const users_rolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.users_rolesOrderByWithAggregationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => users_rolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => users_rolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => users_rolesMinOrderByAggregateInputSchema).optional()
}).strict();

export default users_rolesOrderByWithAggregationInputSchema;
