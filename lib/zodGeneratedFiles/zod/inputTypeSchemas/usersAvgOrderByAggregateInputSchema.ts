import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const usersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.usersAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default usersAvgOrderByAggregateInputSchema;
