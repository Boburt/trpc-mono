import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesSelectSchema } from '../inputTypeSchemas/rolesSelectSchema';
import { rolesIncludeSchema } from '../inputTypeSchemas/rolesIncludeSchema';

export const rolesArgsSchema: z.ZodType<Prisma.rolesDefaultArgs> = z.object({
  select: z.lazy(() => rolesSelectSchema).optional(),
  include: z.lazy(() => rolesIncludeSchema).optional(),
}).strict();

export default rolesArgsSchema;
