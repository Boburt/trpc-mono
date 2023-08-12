import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { QueryModeSchema } from './QueryModeSchema';
import { NestedUuidFilterSchema } from './NestedUuidFilterSchema';

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export default UuidFilterSchema;
