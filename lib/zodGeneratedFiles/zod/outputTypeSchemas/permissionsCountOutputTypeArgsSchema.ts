import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsCountOutputTypeSelectSchema } from './permissionsCountOutputTypeSelectSchema';

export const permissionsCountOutputTypeArgsSchema: z.ZodType<Prisma.permissionsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => permissionsCountOutputTypeSelectSchema).nullish(),
}).strict();

export default permissionsCountOutputTypeSelectSchema;
