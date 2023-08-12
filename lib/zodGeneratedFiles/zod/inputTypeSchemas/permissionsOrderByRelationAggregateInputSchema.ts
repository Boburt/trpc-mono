import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default permissionsOrderByRelationAggregateInputSchema;
