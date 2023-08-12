import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const users_rolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.users_rolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default users_rolesOrderByRelationAggregateInputSchema;
