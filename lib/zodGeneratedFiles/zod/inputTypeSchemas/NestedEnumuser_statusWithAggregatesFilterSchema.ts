import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { user_statusSchema } from './user_statusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumuser_statusFilterSchema } from './NestedEnumuser_statusFilterSchema';

export const NestedEnumuser_statusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumuser_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => user_statusSchema).optional(),
  in: z.lazy(() => user_statusSchema).array().optional(),
  notIn: z.lazy(() => user_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => user_statusSchema),z.lazy(() => NestedEnumuser_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumuser_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumuser_statusFilterSchema).optional()
}).strict();

export default NestedEnumuser_statusWithAggregatesFilterSchema;
