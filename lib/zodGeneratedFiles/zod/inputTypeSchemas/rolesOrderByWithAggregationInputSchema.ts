import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { rolesCountOrderByAggregateInputSchema } from './rolesCountOrderByAggregateInputSchema';
import { rolesMaxOrderByAggregateInputSchema } from './rolesMaxOrderByAggregateInputSchema';
import { rolesMinOrderByAggregateInputSchema } from './rolesMinOrderByAggregateInputSchema';

export const rolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.rolesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => rolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => rolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => rolesMinOrderByAggregateInputSchema).optional()
}).strict();

export default rolesOrderByWithAggregationInputSchema;
