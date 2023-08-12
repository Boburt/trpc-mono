import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { user_statusSchema } from './user_statusSchema';

export const NestedEnumuser_statusFilterSchema: z.ZodType<Prisma.NestedEnumuser_statusFilter> = z.object({
  equals: z.lazy(() => user_statusSchema).optional(),
  in: z.lazy(() => user_statusSchema).array().optional(),
  notIn: z.lazy(() => user_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => NestedEnumuser_statusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumuser_statusFilterSchema;
