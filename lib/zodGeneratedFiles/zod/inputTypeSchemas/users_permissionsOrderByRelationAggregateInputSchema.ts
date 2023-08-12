import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const users_permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.users_permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default users_permissionsOrderByRelationAggregateInputSchema;
