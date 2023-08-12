import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const roles_permissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.roles_permissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default roles_permissionsOrderByRelationAggregateInputSchema;
