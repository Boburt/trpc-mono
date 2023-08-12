import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { usersCountOrderByAggregateInputSchema } from './usersCountOrderByAggregateInputSchema';
import { usersAvgOrderByAggregateInputSchema } from './usersAvgOrderByAggregateInputSchema';
import { usersMaxOrderByAggregateInputSchema } from './usersMaxOrderByAggregateInputSchema';
import { usersMinOrderByAggregateInputSchema } from './usersMinOrderByAggregateInputSchema';
import { usersSumOrderByAggregateInputSchema } from './usersSumOrderByAggregateInputSchema';

export const usersOrderByWithAggregationInputSchema: z.ZodType<Prisma.usersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  card_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birth_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_model: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fcm_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doc_files: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  app_version: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tg_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => usersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => usersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => usersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => usersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => usersSumOrderByAggregateInputSchema).optional()
}).strict();

export default usersOrderByWithAggregationInputSchema;
