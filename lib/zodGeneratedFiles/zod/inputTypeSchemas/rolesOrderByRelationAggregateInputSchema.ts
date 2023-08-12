import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const rolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.rolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default rolesOrderByRelationAggregateInputSchema;
