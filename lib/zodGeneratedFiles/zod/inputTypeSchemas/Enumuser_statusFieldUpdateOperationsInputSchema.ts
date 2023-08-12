import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { user_statusSchema } from './user_statusSchema';

export const Enumuser_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumuser_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => user_statusSchema).optional()
}).strict();

export default Enumuser_statusFieldUpdateOperationsInputSchema;
