import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const usersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.usersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.lazy(() => SortOrderSchema).optional(),
  card_number: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  car_model: z.lazy(() => SortOrderSchema).optional(),
  car_number: z.lazy(() => SortOrderSchema).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  fcm_token: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.lazy(() => SortOrderSchema).optional(),
  app_version: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.lazy(() => SortOrderSchema).optional(),
  tg_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default usersMaxOrderByAggregateInputSchema;
