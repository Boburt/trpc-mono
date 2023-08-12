import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersCountOutputTypeSelectSchema } from './usersCountOutputTypeSelectSchema';

export const usersCountOutputTypeArgsSchema: z.ZodType<Prisma.usersCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => usersCountOutputTypeSelectSchema).nullish(),
}).strict();

export default usersCountOutputTypeSelectSchema;
