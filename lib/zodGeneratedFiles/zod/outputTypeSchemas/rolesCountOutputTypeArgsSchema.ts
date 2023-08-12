import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesCountOutputTypeSelectSchema } from './rolesCountOutputTypeSelectSchema';

export const rolesCountOutputTypeArgsSchema: z.ZodType<Prisma.rolesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => rolesCountOutputTypeSelectSchema).nullish(),
}).strict();

export default rolesCountOutputTypeSelectSchema;
