import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { QueryModeSchema } from './QueryModeSchema';
import { NestedUuidNullableFilterSchema } from './NestedUuidNullableFilterSchema';

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export default UuidNullableFilterSchema;
