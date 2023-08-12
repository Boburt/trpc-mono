import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { permissionsCountOrderByAggregateInputSchema } from './permissionsCountOrderByAggregateInputSchema';
import { permissionsMaxOrderByAggregateInputSchema } from './permissionsMaxOrderByAggregateInputSchema';
import { permissionsMinOrderByAggregateInputSchema } from './permissionsMinOrderByAggregateInputSchema';

export const permissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.permissionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => permissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => permissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => permissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export default permissionsOrderByWithAggregationInputSchema;
