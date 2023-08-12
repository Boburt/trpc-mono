import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersSelectSchema } from '../inputTypeSchemas/usersSelectSchema';
import { usersIncludeSchema } from '../inputTypeSchemas/usersIncludeSchema';

export const usersArgsSchema: z.ZodType<Prisma.usersDefaultArgs> = z.object({
  select: z.lazy(() => usersSelectSchema).optional(),
  include: z.lazy(() => usersIncludeSchema).optional(),
}).strict();

export default usersArgsSchema;
